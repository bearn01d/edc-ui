import {AppConfig} from "./app-config";
import {APP_INITIALIZER, Provider} from "@angular/core";
import {AppConfigService} from "./app-config.service";
import {AppConfigFetcher} from "./app-config.fetcher";
import {AppConfigBuilder} from "./app-config.builder";
import {environment} from "../../../environments/environment";

/**
 * On startup, load app-config.json and build {@link AppConfig}.
 */
export const loadAppConfigOnStartup = (): Provider => ({
  provide: APP_INITIALIZER,
  multi: true,
  deps: [AppConfigFetcher, AppConfigBuilder, AppConfigService],
  useFactory: (fetcher: AppConfigFetcher, builder: AppConfigBuilder, service: AppConfigService) => () =>
    fetcher.fetchConfigJson()
      .then(json => builder.buildAppConfig(json))
      .then((config: AppConfig) => {
        service.config = config
        if (!environment.production) {
          console.log('Using AppConfig:', config)
        }
      }),
});