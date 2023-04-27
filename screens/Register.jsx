import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { register } from '../app/firebase';

const Register = ({ navigation }) => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleRegister(){
        const fullName = `${firstName} ${lastName}`
        register(fullName, email, password)
    }
  return (
    <>
        <View style={styles.container}>
            <Input
                placeholder="First Name"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
            />
            <Input
                placeholder="Last Name"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                value={lastName}
                onChangeText={(value) => setLastName(value)}
            />
            <Input
                placeholder="Email Address"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={(value) => setEmail(value)}
            />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'material', name: 'lock' }}
                secureTextEntry
                value={password}
                onChangeText={(value) => setPassword(value)}
            />
            <Button
                title="Register"
                onPress={handleRegister}
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

export default Register