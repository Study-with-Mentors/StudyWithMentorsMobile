import {Formik} from 'formik';
import {Image, Text, TextInput, View} from 'react-native';
import globalStyles from '../../../../styles/style';
import React, {useContext} from 'react';
import ButtonCustom from '../../../../components/button-custom/button-custom';
import {NavigationProp} from '@react-navigation/native';
import {UserAPI} from '../../../../api/user-api';
import {useState} from 'react/index';
import {saveAccessToken} from "../../../../utils/http";
import {AppContext} from "../../../screen-stack";

interface LoginState {
    email: string;
    password: string;
}

const validate = (values: LoginState) => {
    const errors: Partial<LoginState> = {};
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }

    return errors;
};
const LoginScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {setAuth} = useContext(AppContext);
    const login = (values: LoginState): void => {
        setLoading(true);
        UserAPI.login({email: values.email, password: values.password})
            .then(response => {
                saveAccessToken(response);
                setAuth(response);
                navigation.navigate('Logged', {screen: 'Home'});
            })
            .catch(_error => setMessage('Wrong email or password'))
            .finally(() => setLoading(false));
    };

    // TODO: loading icon
    return (
        <View style={globalStyles.centerView}>
            <Formik
                validate={validate}
                initialValues={{email: '', password: ''}}
                onSubmit={login}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View style={globalStyles.formContainer}>
                        {/*TODO: logo color*/}
                        <Image
                            source={require('../../../../components/toolbar/logo.png')}
                        />
                        <Text style={globalStyles.heading1}>Login</Text>
                        <View style={globalStyles.inputContainer}>
                            <TextInput
                                style={[globalStyles.textInput]}
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
                                style={[globalStyles.textInput]}
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
                        <Text style={globalStyles.error}>{message}</Text>
                        <ButtonCustom
                            onPress={handleSubmit}
                            title="Login"
                            disabled={loading}
                        />
                        <Text
                            onPress={() => navigation.navigate('SignUp')}
                            style={globalStyles.marginTop}>
                            Have not create an account?{' '}
                            <Text style={globalStyles.underlineText}>
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
