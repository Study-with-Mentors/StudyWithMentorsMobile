import {Formik} from 'formik';
import {Text, TextInput, View} from 'react-native';
import styles from '../../../../style';
import React from 'react';
import ButtonCustom from '../../../../components/button-custom/button-custom';
import {NavigationProp} from '@react-navigation/native';

interface LoginState {
    email: string;
    password: string;
}

const validate = (values: LoginState) => {
    const errors: LoginState = {email: '', password: ''};
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

    return errors;
};
const LoginScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
    return (
        <View style={styles.centerView}>
            <Formik
                validate={validate}
                initialValues={{email: '', password: ''}}
                onSubmit={values => console.log(values)}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View style={styles.formContainer}>
                        <Text style={styles.heading1}>Login</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, {width: '100%'}]}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder="Email"
                                value={values.email}
                            />
                            {errors.email && touched.email ? (
                                <Text style={styles.error}>{errors.email}</Text>
                            ) : null}
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, {width: '100%'}]}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry={true}
                                placeholder="Password"
                                value={values.password}
                            />
                            {errors.password && touched.password ? (
                                <Text style={styles.error}>
                                    {errors.password}
                                </Text>
                            ) : null}
                        </View>
                        <ButtonCustom onPress={handleSubmit} title="Login" />
                        <Text
                            onPress={() => navigation.navigate('SignUp')}
                            style={{marginTop: 15}}>
                            Have not create an account?{' '}
                            <Text
                                style={{
                                    color: 'blue',
                                    textDecorationLine: 'underline',
                                }}>
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default LoginScreen;
