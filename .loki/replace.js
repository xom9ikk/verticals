const replace = require('replace-in-file');

replace.sync({
  files: './storybook-static/*.js',
  from: /\/assets/g,
  to: 'assets',
});
