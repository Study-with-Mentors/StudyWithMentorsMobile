import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

const Line = () => {
    return <View style={styles.line} />;
};

export default Line;
