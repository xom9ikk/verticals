/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const chalk = require('chalk');
const typescriptTransform = require('i18next-scanner-typescript');

const languages = [
  'en', // English (default)
  'de', // German
  'es', // Spanish
  'fr', // French
  'it', // Italian
  'ja', // Japanese
  'pl', // Polish
  'ru', // Russian
  'uk', // Ukrainian
  'tr', // Turkish
  'zh-tw', // Traditional Chinese
];

module.exports = {
  input: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/i18n/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    removeUnusedKeys: true,
    func: {
      list: ['i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: (ns, value) => value,
      acorn: {
        ecmaVersion: 10,
        sourceType: 'module',
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: languages,
    ns: [
      'translation',
    ],
    defaultLng: languages[0],
    defaultNs: 'translation',
    defaultValue: (lng, ns, key) => {
      return key;
      // if (lng === languages[0]) {
      //   return key;
      // }
      // return '__STRING_NOT_TRANSLATED__';
    },
    resource: {
      loadPath: 'static/locales/{{lng}}/{{ns}}.json',
      savePath: 'static/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
    transform: typescriptTransform({
      extensions: ['.ts', '.tsx'],
    }),
  },
  transform: function customTransform(file, enc, done) {
    const { parser } = this;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(content, (key, options) => {
      parser.set(key, {
        ...options,
        nsSeparator: false,
        keySeparator: false,
      });
      count += 1;
    });

    if (count > 0) {
      console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
    }

    done();
  },
};
