import React, { useEffect } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { auth } from '../app/firebase';

const Verify = ({ navigation }) => {

  useEffect(() => {
    if (auth.currentUser.emailVerified) {
      navigation.navigate('Home');
    }
  }, [auth.currentUser.emailVerified]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello! Due to you being newly registered, you are required to verify your email.</Text>
      <Text style={styles.subtitle}>Kindly press the button below to allow our system to send a verification link.</Text>
      <Button
        title="Verify"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={async () => await sendEmailVerification(auth.currentUser)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3cb371',
    borderRadius: 25,
    width: 250,
    height: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Verify;
