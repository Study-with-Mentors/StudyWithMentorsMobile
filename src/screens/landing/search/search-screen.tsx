import {View, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useEffect, useState} from 'react';

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const [display, setDisplay] = useState('');

    const searchCourse = (s: string): void => {
        setSearch(s);
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => setDisplay(search), 300);
        return () => clearTimeout(timeOutId);
    }, [search]);

    return (
        <View>
            <SearchBar
                placeholder="Enter course name..."
                onChangeText={searchCourse}
                value={search}
            />
            <Text>{display}</Text>
        </View>
    );
};

export default SearchScreen;
