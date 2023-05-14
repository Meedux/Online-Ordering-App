import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { login } from '../app/firebase';
import { AppContext } from '../components/Context';

const Login = ({ navigation }) => {
    const { setEmail } = useContext(AppContext);
    const [email, setInputEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        login(email, password, navigation, setEmail);
    };

  return (
    <>
        <View style={styles.container}>
            <Input
                placeholder="Email Address"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={(value) => setInputEmail(value)}
            />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
                value={password}
                onChangeText={(value) => setPassword(value)}
            />
            <Button
                title="Login"
                onPress={handleLogin}
                style={{paddingHorizontal: 10, borderRadius: 15}}
            />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
    },
  });

export default Login