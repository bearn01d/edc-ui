import {Injectable} from '@angular/core';
import {ContractAgreementCard} from '@sovity.de/edc-client';
import {AssetPropertyMapper} from '../../services/asset-property-mapper';
import {EdcApiService} from '../../services/edc-api.service';
import {assetSearchTargets, search} from '../../utils/search-utils';
import {ContractAgreementCardMapped} from '../contract-agreement-cards/contract-agreement-card-mapped';

@Injectable({providedIn: 'root'})
export class ContractAgreementCardMappedService {
  constructor(
    private edcApiService: EdcApiService,
    private assetPropertyMapper: AssetPropertyMapper,
  ) {}

  /**
   * Replace the asset with the parsed asset and add the other required fields of the UI model
   *
   * {@link ContractAgreementCardMapped}
   * @param contractAgreement {@link ContractAgreementCard}
   * @returns {@link ContractAgreementCardMapped}
   */
  buildContractAgreementCardMapped(
    contractAgreement: ContractAgreementCard,
  ): ContractAgreementCardMapped {
    let asset = this.assetPropertyMapper.buildAssetFromProperties(
      contractAgreement.asset.properties,
    );

    return {
      ...contractAgreement,
      asset,
      isInProgress: contractAgreement.transferProcesses.some(
        (it) => it.state.simplifiedState === 'RUNNING',
      ),
      searchTargets: [
        contractAgreement.contractAgreementId,
        contractAgreement.counterPartyId,
        contractAgreement.counterPartyAddress,
        ...assetSearchTargets(asset),
      ],
    };
  }

  filter(
    cards: ContractAgreementCardMapped[],
    searchText: string,
  ): ContractAgreementCardMapped[] {
    return search(cards, searchText, (card) => card.searchTargets);
  }
}