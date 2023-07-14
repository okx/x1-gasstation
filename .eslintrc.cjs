// module.exports = {
//     env: {
//         es2021: true,
//         node: true,
//     },
//     extends: [
//         'airbnb-base',
//     ],
//     //parser: '@typescript-eslint/parser',
//     parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//     },
//     plugins: [
//         '@typescript-eslint',
//     ],
//     rules: {
//     },
// };

module.exports = {
    env: {
      es2021: true,
      node: true,
    },
    rules: {
      "space-before-function-paren": ["error", "never"],
      "no-underscore-dangle": 0,
    },
    parserOptions: {
      "sourceType": "module",
  }
  };
