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
