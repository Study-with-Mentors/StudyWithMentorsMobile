import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CourseCompact from '../../../components/course-compact/course-compact';
import {Course} from '../../../types/course';
import {CourseAPI, SearchCourseParams} from '../../../api/course-api';
import globalStyles from '../../../styles/style';

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);

    const searchCourse = (s: string): void => {
        setSearch(s);
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setLoading(true);
            let searchCourseParams: SearchCourseParams = {};
            searchCourseParams.name = search;
            CourseAPI.getAll(searchCourseParams).then(response => {
                setCourses(response.result);
                setLoading(false);
            });
        }, 300);
        return () => clearTimeout(timeOutId);
    }, [search]);

    return (
        <View>
            <SearchBar
                placeholder="Enter course name..."
                onChangeText={searchCourse}
                value={search}
            />
            {/*TODO: it is missing some text at the end of scoll view*/}
            {loading ? (
                <Text>Loading</Text>
            ) : (
                <ScrollView
                    contentContainerStyle={{alignItems: 'center'}}
                    style={{height: '100%'}}>
                    <View>
                        {courses
                            .reduce(
                                (
                                    accumulator,
                                    currentValue,
                                    currentIndex,
                                    array,
                                ) => {
                                    if (currentIndex % 2 === 0) {
                                        accumulator.push(
                                            array.slice(
                                                currentIndex,
                                                currentIndex + 2,
                                            ) as never,
                                        );
                                    }
                                    return accumulator;
                                },
                                [],
                            )
                            .map((c, key) => {
                                return (
                                    <View
                                        style={[
                                            globalStyles.horizontal,
                                            // globalStyles.alignLeft,
                                            // { justifyContent: "flex-end", alignItems: "flex-end" }
                                        ]}
                                        key={key}>
                                        <CourseCompact course={c[0]} />
                                        {c[1] && (
                                            <CourseCompact course={c[1]} />
                                        )}
                                    </View>
                                );
                            })}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default SearchScreen;
