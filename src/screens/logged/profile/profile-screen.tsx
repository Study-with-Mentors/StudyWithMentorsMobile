import {Formik} from 'formik';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../../styles/style';
import {Gender, User} from '../../../types/user';
import ButtonCustom from '../../../components/button-custom/button-custom';
import React, {useContext, useEffect, useState} from 'react';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import LoadingIndicator from '../../../components/loading-indicator/loading-indicator';
import {UserAPI} from '../../../api/user-api';
import {AppContext} from "../../screen-stack";

const validate = (values: User) => {
    const errors: Partial<User> = {
        firstName: '',
        lastName: '',
        email: '',
    };
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
    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(false);
    const {setAuthToken} = useContext(AppContext);

    useEffect(() => {
        setLoading(true);
        UserAPI.getByUserToken()
            .then(response => {
                setUser(response);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <LoadingIndicator loadingText={'Loading profile'} />;
    }

    // TODO: add icon for text
    return (
        <View style={globalStyles.centerView}>
            <Formik
                validate={validate}
                initialValues={user}
                onSubmit={values => console.log(values)}>
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
                            source={{uri: user.profileImage?.url}}
                            style={{width: 100, height: 100, borderRadius: 100}}
                            defaultSource={require('../../../components/default-profile.png')}
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
                            {/*TODO: change text style */}
                            <TouchableOpacity
                                onPress={() => {
                                    DateTimePickerAndroid.open({
                                        mode: 'date',
                                        onChange: (e, date) =>
                                            setFieldValue('birthdate', date),
                                        value: new Date(),
                                    });
                                }}>
                                <TextInput
                                    editable={false}
                                    selectTextOnFocus={false}
                                    pointerEvents="none"
                                    style={globalStyles.textInput}
                                    value={undefined}
                                />
                            </TouchableOpacity>
                            {errors.birthdate && touched.birthdate ? (
                                <Text style={globalStyles.error}>
                                    {/*{errors.birthdate?.toDateString()}*/}
                                </Text>
                            ) : null}
                        </View>
                        {/*TODO: radio button for gender*/}
                        <Text>{user.gender}</Text>
                        <ButtonCustom onPress={handleSubmit} title="Update" />
                        <ButtonCustom
                            onPress={() => console.log('Change password')}
                            title="Change password"
                        />
                        <ButtonCustom
                            onPress={() => setAuthToken('')}
                            title="Log out"
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default ProfileScreen;
