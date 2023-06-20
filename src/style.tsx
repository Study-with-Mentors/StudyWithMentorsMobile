import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    centerView: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    topView: {
        width: '100%',
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },

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

    heading1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },

    button: {
        backgroundColor: 'red',
        height: 35,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    horizontal: {
        flexDirection: 'row',
    },

    vertical: {
        flexDirection: 'column',
    },
});

export default styles;
