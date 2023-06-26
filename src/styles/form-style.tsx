import {StyleSheet} from 'react-native';

const formStyle = StyleSheet.create({
    formContainer: {
        width: '75%',
        flex: 1,
        rowGap: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        width: '100%',
    },

    textInput: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        paddingHorizontal: 15,
        marginBottom: 5,
        borderRadius: 5,
    },

    error: {
        color: 'red',
    },
});

export default formStyle;
