import {Formik} from 'formik';
import {Image, Text, TextInput, View} from 'react-native';
import globalStyles from '../../../../styles/style';
import React, {useContext, useEffect} from 'react';
import ButtonCustom from '../../../../components/button-custom/button-custom';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {UserAPI} from '../../../../api/user-api';
import {useState} from 'react/index';
import {saveAccessToken} from '../../../../utils/http';
import {AppContext} from '../../../screen-stack';
import LoadingIndicator from '../../../../components/loading-indicator/loading-indicator';
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {HttpStatusCode} from 'axios';

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

const LoginScreen = ({
    navigation,
    route,
}: {
    navigation: NavigationProp<any>;
    route: RouteProp<any>;
}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {setAuthToken} = useContext(AppContext);

    useEffect(() => {
        setMessage(route.params?.message);
    }, [route.params?.message, setMessage]);
    const loginGoogle = () => {
        setLoading(true);
        GoogleSignin.signIn()
            .then(user => {
                UserAPI.loginGoogle(user.idToken)
                    .then(response => setAuthToken(response))
                    .catch(error => console.log(error.response));
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    };

    const login = (values: LoginState): void => {
        setLoading(true);
        UserAPI.login({email: values.email, password: values.password})
            .then(response => {
                setAuthToken(response);
            })
            .catch(error => {
                if (error.response.status === HttpStatusCode.Forbidden) {
                    setMessage('Please verify your email first');
                } else {
                    setMessage('Wrong email or password');
                }
            })
            .finally(() => setLoading(false));
    };

    if (loading) {
        return <LoadingIndicator loadingText={'Logging in'} />;
    }

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
                        <Image
                            style={{width: 150, height: 50}}
                            source={require('../../../../components/toolbar/logo_black.png')}
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
                        {!loading && (
                            <Text style={globalStyles.error}>{message}</Text>
                        )}
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
                        <GoogleSigninButton onPress={loginGoogle} />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default LoginScreen;
