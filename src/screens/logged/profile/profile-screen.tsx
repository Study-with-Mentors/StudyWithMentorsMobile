import {Formik} from 'formik';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../../styles/style';
import {Gender, User} from '../../../types/user';
import ButtonCustom from '../../../components/button-custom/button-custom';
import React, {useContext, useEffect, useState} from 'react';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import {UserAPI} from '../../../api/user-api';
import {AppContext} from '../../screen-stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const validate = (values: User) => {
    const errors: Partial<User> = {};
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.firstName) {
        errors.firstName = 'First name is required';
    } else if (!/[A-Za-z]+/i.test(values.firstName)) {
        errors.firstName = 'First name must not contain special character';
    }

    if (!values.lastName) {
        errors.lastName = 'Last name is required';
    } else if (!/[A-Za-z]+/i.test(values.lastName)) {
        errors.lastName = 'Last name must not contain special character';
    }

    return errors;
};

const ProfileScreen = () => {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const {setAuthToken} = useContext(AppContext);

    useEffect(() => {
        setLoading(true);
        UserAPI.getByUserToken()
            .then(response => {
                setUser(response);
                setBirthdate(new Date(response.birthdate));
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const updateProfile = values => {
        UserAPI.updateUser(values)
            .then(response => {
                setUser(response);
                setBirthdate(new Date(response.birthdate));
            })
            .catch(error => console.log(error.response));
    };

    if (loading) {
        return <LoadingIndicator loadingText={'Loading profile'} />;
    }

    // TODO: add icon for text
    return (
        <View style={globalStyles.centerView}>
            <Formik
                validate={validate}
                initialValues={user}
                onSubmit={updateProfile}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                }) => (
                    <View style={globalStyles.formContainer}>
                        {/*TODO: take picture from camera*/}
                        <Image
                            source={
                                user.profileImage?.url
                                    ? {uri: user.profileImage?.url}
                                    : require('../../../components/default-profile.png')
                            }
                            style={{width: 100, height: 100, borderRadius: 100}}
                        />
                        <View
                            style={[
                                globalStyles.horizontal,
                                {
                                    width: '100%',
                                    columnGap: 5,
                                },
                            ]}>
                            <View
                                style={[
                                    globalStyles.inputContainer,
                                    {flex: 1},
                                ]}>
                                <Text>First name</Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <Text style={globalStyles.error}>
                                        {errors.firstName}
                                    </Text>
                                ) : null}
                            </View>

                            <View
                                style={[
                                    globalStyles.inputContainer,
                                    {flex: 1},
                                ]}>
                                <Text>Last name</Text>
                                <TextInput
                                    style={globalStyles.textInput}
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    value={values.lastName}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <Text style={globalStyles.error}>
                                        {errors.lastName}
                                    </Text>
                                ) : null}
                            </View>
                        </View>

                        <View style={globalStyles.inputContainer}>
                            <Text>Email</Text>
                            <TextInput
                                style={globalStyles.textInput}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {errors.email && touched.email ? (
                                <Text style={globalStyles.error}>
                                    {errors.email}
                                </Text>
                            ) : null}
                        </View>
                        <View style={globalStyles.inputContainer}>
                            <Text>Birthdate</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    DateTimePickerAndroid.open({
                                        mode: 'date',
                                        onChange: (e, date) => {
                                            if (date !== undefined) {
                                                setFieldValue(
                                                    'birthdate',
                                                    date,
                                                );
                                                setBirthdate(date);
                                            }
                                        },
                                        value: birthdate,
                                    });
                                }}>
                                <TextInput
                                    editable={false}
                                    selectTextOnFocus={false}
                                    pointerEvents="none"
                                    style={globalStyles.textInput}
                                    value={birthdate.toISOString().slice(0, 10)}
                                />
                            </TouchableOpacity>
                            {errors.birthdate && touched.birthdate ? (
                                <Text style={globalStyles.error}>
                                    {/*{errors.birthdate.toDateString()}*/}
                                </Text>
                            ) : null}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: 30,
                                marginBottom: 30,
                            }}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 5,
                                }}
                                onPress={() => setFieldValue('gender', 'MALE')}>
                                <Image
                                    style={{width: 15, height: 15}}
                                    source={
                                        values.gender === 'MALE'
                                            ? require('../../../components/toolbar/checked.png')
                                            : require('../../../components/toolbar/unchecked.png')
                                    }
                                />
                                <Text>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 5,
                                }}
                                onPress={() =>
                                    setFieldValue('gender', 'FEMALE')
                                }>
                                <Image
                                    style={{width: 15, height: 15}}
                                    source={
                                        values.gender === 'FEMALE'
                                            ? require('../../../components/toolbar/checked.png')
                                            : require('../../../components/toolbar/unchecked.png')
                                    }
                                />
                                <Text>Female</Text>
                            </TouchableOpacity>
                        </View>
                        <ButtonCustom onPress={handleSubmit} title="Update" />
                        <ButtonCustom
                            onPress={() => console.log('Change password')}
                            title="Change password"
                        />
                        <ButtonCustom
                            onPress={() => {
                                GoogleSignin.signOut().then();
                                setAuthToken('');
                            }}
                            title="Log out"
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default ProfileScreen;
