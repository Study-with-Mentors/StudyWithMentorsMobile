import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/style';

const ButtonCustom = ({
    onPress,
    title,
}: {
    onPress: () => void;
    title: string;
}) => {
    return (
        <TouchableOpacity style={globalStyles.button} onPress={onPress}>
            <Text style={globalStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ButtonCustom;
