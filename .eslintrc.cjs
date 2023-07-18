module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    rules: {
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "no-underscore-dangle": 0,
        "prettier/prettier": ["error"],
    },
    parserOptions: {
        sourceType: "module",
    },
    extends: ["prettier"],
    plugins: ["prettier"],
};
