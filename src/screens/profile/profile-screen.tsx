import {View} from 'react-native';
import React, {useState} from 'react';
import styles from '../../style';
import LoginForm from '../../components/login-form/login-form';
import SignUpForm from '../../components/sign-up-form/sign-up-form';

const Profile = () => {
    const [isLogin, setIsLogin] = useState(true);
    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };
    // TODO: copy form layout from frontend
    return (
        <View style={styles.centerView}>
            {isLogin ? (
                <LoginForm redirect={toggleLogin} />
            ) : (
                <SignUpForm redirect={toggleLogin} />
            )}
        </View>
    );
};

export default Profile;
