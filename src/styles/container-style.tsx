import {Dimensions, StyleSheet} from 'react-native';

const containerStyle = StyleSheet.create({
    compactContainer: {
        overflow: 'hidden',
        width: Dimensions.get('window').width * 0.45,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
    },
});

export default containerStyle;
