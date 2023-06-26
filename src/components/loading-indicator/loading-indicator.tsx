import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';

type Props = {
    loadingText: string;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {},
    indicatorText: {
        fontSize: 18,
        marginTop: 12,
    },
});

const LoadingIndicator = ({loadingText}: Props) => {
    return (
        <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" style={styles.indicator} />
            <Text style={styles.indicatorText}>{loadingText}</Text>
        </View>
    );
};

export default LoadingIndicator;
