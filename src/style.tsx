import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    centerView: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    formContainer: {
        width: '75%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        margin: 5,
        width: '100%',
    },

    textInput: {
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

    heading1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;
