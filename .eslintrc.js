module.exports = {
    root: true,
    extends: '@react-native-community',
    rules: {
        'no-unused-vars': [
            'warn',
            {vars: 'all', args: 'after-used', ignoreRestSiblings: false},
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                tabWidth: 4,
            },
        ],
    },
};
