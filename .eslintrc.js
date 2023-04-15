module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
  },
}
