import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CourseCompact from '../../../components/course-compact/course-compact';
import {Course} from '../../../types/course';
import {CourseAPI, SearchCourseParams} from '../../../api/course-api';
import globalStyles from '../../../styles/style';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';
import {AppContext} from '../../screen-stack';
import {Icon} from 'react-native-elements';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';

const SearchScreen = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const {searchKey} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setLoading(true);
            let searchCourseParams: SearchCourseParams = {};
            searchCourseParams.name = searchKey;
            CourseAPI.getAll(searchCourseParams).then(response => {
                setCourses(response.result);
                setLoading(false);
            });
        }, 300);
        return () => clearTimeout(timeOutId);
    }, [searchKey]);

    return (
        <View style={{flex: 1}}>
            <ToolbarCustom title={'Search'} />
            {/*TODO: it is missing some text at the end of scoll view*/}
            {loading ? (
                <LoadingIndicator loadingText={'Loading courses'} />
            ) : (
                <View>
                    <View
                        style={[
                            globalStyles.horizontal,
                            {
                                paddingHorizontal: 15,
                                paddingVertical: 7,
                                justifyContent: 'space-between',
                            },
                        ]}>
                        <Text style={globalStyles.heading1}>
                            Result ({courses.length})
                        </Text>
                        <Icon name="filter" type="ionicons" />
                    </View>
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
                                            style={[globalStyles.horizontal]}
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
                </View>
            )}
        </View>
    );
};

export default SearchScreen;
