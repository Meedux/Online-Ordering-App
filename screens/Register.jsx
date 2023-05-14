import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { register, auth } from '../app/firebase';
import { sendEmailVerification } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker'
import { AppContext } from '../components/Context';

const Register = ({ navigation }) => {
    const { setEmail } = useContext(AppContext);
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');

    // date of birth
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [email, setInputEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleRegister(){
        const user = {
            name: `${firstName} ${lastName}`,
            lname: lastName,
            email: email,
            dob: date.toDateString(),
            password: password,
            password_confirmation: password,
        }
        register(user, navigation, setEmail)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setOpen(false)
        setDate(currentDate);
    };
  return (
    <>
        <ScrollView>
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

            <Button title="Set Date of Birth" onPress={() => setOpen(true)} />

            {open && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            
            )}

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
                title="Register"
                onPress={handleRegister}
            />
        </View>
        </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      marginTop: 40,
    },
});

export default Register