const path = require('path');

module.exports = {
  parser:  '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
    'plugin:import/recommended',
  ],
  parserOptions: {
    'project': './tsconfig.json'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve('build', 'webpack.dev.config.js')
      }
    }
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '@namespaced/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        }
      },
    ],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft'] }],
    'max-len': ['error', { 'code': 120 }],
    'import/extensions': 'off',
    'semi': ['error', 'always'],
    'no-console': 'warn',
    'no-eval': 'error',
    'import/first': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-danger': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/button-has-type': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'react/jsx-no-target-blank': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'import/no-cycle': 'off',
  }
};
