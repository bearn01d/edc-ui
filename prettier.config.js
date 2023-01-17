module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  arrowParens: 'always',
  trailingComma: 'all',
  bracketSameLine: true,
  printWidth: 80,
  bracketSpacing: false,
  proseWrap: 'always',

  attributeGroups: [
    '$ANGULAR_STRUCTURAL_DIRECTIVE',
    '^(id|name)$',
    '^class$',
    '$DEFAULT',
    '^aria-',
    '$ANGULAR_INPUT',
    '$ANGULAR_TWO_WAY_BINDING',
    '$ANGULAR_OUTPUT',
  ],

  // @trivago/prettier-plugin-sort-imports
  importOrder: [
    '^@angular/(.*)$',
    '^rxjs(/(.*))?$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
  importOrderParserPlugins: [
    'typescript',
    'classProperties',
    'decorators-legacy',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
