import {StyleSheet} from 'react-native';
import buttonStyle from './button-style';
import formStyle from './form-style';
import courseStyle from './course-style';

const globalStyles = StyleSheet.create({
    centerView: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    topView: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    fullScreen: {
        width: '100%',
        height: '100%',
        padding: 0,
    },

    heading1: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },

    heading2: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    shadowBottom: {
        elevation: 5,
    },

    alignLeft: {
        alignItems: 'flex-start',
    },

    horizontal: {
        flexDirection: 'row',
    },

    vertical: {
        flexDirection: 'column',
    },

    textCenter: {
        textAlign: 'center',
    },

    marginTop: {
        marginTop: 15,
    },

    bold: {
        fontWeight: 'bold',
    },

    underlineText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    ...courseStyle,
    ...formStyle,
    ...buttonStyle,
});

export default globalStyles;
