import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const buttonStyles = StyleSheet.create({
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
});

const ButtonCustom = ({
    onPress,
    title,
}: {
    onPress: () => void;
    title: string;
}) => {
    return (
        <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
            <Text style={buttonStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ButtonCustom;
