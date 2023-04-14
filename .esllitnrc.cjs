module.exports = {
  root: true,
  globals: {
    definePageMeta: true,
  },
  extends: [
    'eslint:recommended',
  ],
  env: {
    node: true,
  },
  rules: {
    quotes: ['warn', 'single'],
    'no-undef': 'off',
  },
};
