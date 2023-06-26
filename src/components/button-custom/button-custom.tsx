import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/style';

const ButtonCustom = ({
    onPress,
    title,
    disabled,
}: {
    onPress: () => void;
    title: string;
    disabled?: boolean;
}) => {
    return (
        <TouchableOpacity
            style={globalStyles.button}
            onPress={onPress}
            disabled={disabled}>
            <Text style={globalStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ButtonCustom;
