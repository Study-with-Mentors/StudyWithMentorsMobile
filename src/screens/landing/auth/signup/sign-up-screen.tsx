import {Formik} from 'formik';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../../../styles/style';
import React, {useState} from 'react';
import ButtonCustom from '../../../../components/button-custom/button-custom';
import {NavigationProp} from '@react-navigation/native';
import {UserAPI} from '../../../../api/user-api';

interface RegisterState {
    email: string;
    password: string;
    retypePassword: string;
    firstName: string;
    lastName: string;
    gender: string;
}

const validate = (values: RegisterState) => {
    const errors: Partial<RegisterState> = {};
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be more than 8 characters';
    }

    if (!values.retypePassword) {
        errors.retypePassword = 'Retype password is required';
    } else if (values.retypePassword.length < 8) {
        errors.retypePassword =
            'Retype password must be more than 8 characters';
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

    if (!values.gender) {
        errors.gender = 'Please select gender';
    }

    return errors;
};

const SignUpScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const signUp = (values: RegisterState) => {
        setLoading(true);
        UserAPI.signUp(values)
            .then(() =>
                setMessage('Signup successfully. Please verify your email'),
            )
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    };

    return (
        <View style={globalStyles.centerView}>
            <Formik
                validate={validate}
                initialValues={{
                    email: '',
                    password: '',
                    retypePassword: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                }}
                onSubmit={signUp}>
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
                        {/*TODO: logo color*/}
                        <Image
                            source={require('../../../../components/toolbar/logo.png')}
                        />
                        <Text style={globalStyles.heading1}>Sign Up</Text>
                        <View style={globalStyles.inputContainer}>
                            <TextInput
                                style={globalStyles.textInput}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder="Email"
                                value={values.email}
                            />
                            {errors.email && touched.email ? (
                                <Text style={globalStyles.error}>
                                    {errors.email}
                                </Text>
                            ) : null}
                        </View>
                        <View style={globalStyles.inputContainer}>
                            <TextInput
                                style={globalStyles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry={true}
                                placeholder="Password"
                                value={values.password}
                            />
                            {errors.password && touched.password ? (
                                <Text style={globalStyles.error}>
                                    {errors.password}
                                </Text>
                            ) : null}
                        </View>
                        <View style={globalStyles.inputContainer}>
                            <TextInput
                                style={globalStyles.textInput}
                                onChangeText={handleChange('retypePassword')}
                                onBlur={handleBlur('retypePassword')}
                                secureTextEntry={true}
                                placeholder="Retype password"
                                value={values.retypePassword}
                            />
                            {errors.retypePassword && touched.retypePassword ? (
                                <Text style={globalStyles.error}>
                                    {errors.retypePassword}
                                </Text>
                            ) : null}
                        </View>
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
                                <TextInput
                                    style={globalStyles.textInput}
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                    placeholder={'First name'}
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
                                <TextInput
                                    style={globalStyles.textInput}
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    value={values.lastName}
                                    placeholder={'Last name'}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <Text style={globalStyles.error}>
                                        {errors.lastName}
                                    </Text>
                                ) : null}
                            </View>
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
                                onPress={() =>
                                    setFieldValue('gender', 'MALE')
                                }>
                                <Image
                                    style={{width: 15, height: 15}}
                                    source={
                                        values.gender === 'MALE'
                                            ? require('../../../../components/toolbar/checked.png')
                                            : require('../../../../components/toolbar/unchecked.png')
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
                                            ? require('../../../../components/toolbar/checked.png')
                                            : require('../../../../components/toolbar/unchecked.png')
                                    }
                                />
                                <Text>Female</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={globalStyles.error}>{message}</Text>
                        <ButtonCustom
                            onPress={handleSubmit}
                            title={loading ? 'Loading' : 'Sign Up'}
                            disabled={loading}
                        />
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={globalStyles.marginTop}>
                            Already have an account?{' '}
                            <Text style={globalStyles.underlineText}>
                                Login
                            </Text>
                        </Text>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default SignUpScreen;
