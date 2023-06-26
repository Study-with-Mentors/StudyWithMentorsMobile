import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import globalStyles from '../../styles/style';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../screens/screen-stack';

const styles = StyleSheet.create({
    toolbar: {
        ...globalStyles.horizontal,
        height: 56,
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#391085',
        color: 'white',
    },

    searchContainer: {
        height: 56,
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
    },

    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    searchBar: {
        ...globalStyles.textInput,
        width: undefined,
        borderWidth: undefined,
        flex: 1,
        padding: 0,
        marginBottom: 0,
    },
});

const ToolbarCustom = ({
    title,
    isBackButton,
}: {
    title: string;
    isBackButton?: boolean;
}) => {
    const {searchKey, setSearchKey, isSearch, setIsSearch} =
        useContext(AppContext);
    const navigation = useNavigation();

    if (!isSearch) {
        return (
            <View style={styles.toolbar}>
                <View style={[globalStyles.horizontal, {gap: 10}]}>
                    {isBackButton && (
                        <Icon
                            name="arrow-back"
                            type="ionicons"
                            color="white"
                            onPress={() => navigation.goBack()}
                        />
                    )}
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Icon
                    name="search"
                    type="ionicons"
                    color="white"
                    onPress={() => setIsSearch(true)}
                />
            </View>
        );
    }

    return (
        <View style={[styles.searchContainer, globalStyles.horizontal]}>
            <Icon
                name="arrow-back"
                type="ionicons"
                onPress={() => setIsSearch(false)}
            />
            <TextInput
                style={styles.searchBar}
                placeholder={'Search course'}
                returnKeyType="search"
                value={searchKey}
                onChangeText={setSearchKey}
                onSubmitEditing={() =>
                    navigation.navigate('Search', {searchKey})
                }
            />
            <Icon
                name="close"
                type="ionicons"
                onPress={() => setSearchKey('')}
            />
        </View>
    );
};

export default ToolbarCustom;
