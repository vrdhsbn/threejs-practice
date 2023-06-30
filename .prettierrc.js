module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  arrowParens: 'always',
  printWidth: 80,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: ['*.html'],
      options: {
        printWidth: 360,
      },
    },
    {
      files: ['*.css', '*.scss'],
      options: {
        singleQuote: false,
      },
    },
  ],
}
