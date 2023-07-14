import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ToolbarCustom from '../../../components/toolbar/toolbar-custom';
import {Lesson} from '../../../types/lesson';
import {GetLessonByDateParams, LessionAPI} from '../../../api/lesson-api';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import {Agenda, AgendaEntry, AgendaSchedule} from 'react-native-calendars';

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
});

const CalendarScreen = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [items, setItems] = useState<AgendaSchedule>();
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    useEffect(() => {
        setLoading(true);
        LessionAPI.getLessonByDate({
            upperTime: '2023-12-31 23:00:00',
            lowerTime: '2022-01-01 00:00:00',
        } as GetLessonByDateParams)
            .then(response => {
                setLessons(response);
            })
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let agenda: AgendaSchedule = {} as AgendaSchedule;
        lessons.map(lesson => {
            let date = lesson.startTime.split('T')[0];
            const startTime = lesson.startTime.split('T')[1].substring(0, 5);
            const endTime = lesson.endTime.split('T')[1].substring(0, 5);
            let val: AgendaEntry = {
                day: date,
                name: `${startTime} - ${endTime}\nCourse: ${lesson.courseName}\n${lesson.sessionName}`,
                height: 80,
            } as AgendaEntry;
            if (agenda[date] == null) {
                agenda[date] = [val];
            } else {
                agenda[date].push(val);
            }
        });
        setItems(agenda);
    }, [lessons]);

    return (
        <View style={{flex: 1}}>
            <ToolbarCustom title={'Calendar'} />
            {loading ? (
                <LoadingIndicator loadingText={'Loading calendar'} />
            ) : (
                <Agenda
                    items={items}
                    // Callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={month => {
                        // console.log(month);
                        // console.log('trigger items loading');
                    }}
                    // Callback that gets called on day press
                    onDayPress={day => {
                        // setSelectedDate(day.dateString);
                    }}
                    // Callback that gets called when day changes while scrolling agenda list
                    onDayChange={day => {
                        console.log(day);
                        console.log('day changed');
                    }}
                    renderEmptyDate={() => {
                        return (
                            <View style={styles.emptyDate}>
                                <Text>This is empty date!</Text>
                            </View>
                        );
                    }}
                    renderEmptyData={() => {
                        return (
                            <View style={{padding: 20}}>
                                <Text>No upcomming lesson in this week</Text>
                            </View>
                        );
                    }}
                    renderItem={(
                        reservation: AgendaEntry,
                        isFirst: boolean,
                    ) => {
                        const fontSize = isFirst ? 16 : 14;
                        const color = isFirst ? 'black' : '#43515c';

                        return (
                            <TouchableOpacity
                                // testID={testIDs.agenda.ITEM}
                                style={[
                                    styles.item,
                                    // {height: reservation.height},
                                ]}>
                                <Text style={{fontSize, color}}>
                                    {reservation.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    selected={selectedDate.toDateString()}
                    pastScrollRange={12}
                    futureScrollRange={12}
                    showClosingKnob={true}
                    style={{}}
                />
            )}
        </View>
    );
};

export default CalendarScreen;
