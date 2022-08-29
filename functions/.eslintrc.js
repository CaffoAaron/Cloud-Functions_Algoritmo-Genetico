module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "max-len": "off",
    "camelcase": "off",
    "new-cap": "off",
    "no-unused-vars": "off",
  },
  parserOptions: {
    ecmaVersion: 2019,
  },
};
