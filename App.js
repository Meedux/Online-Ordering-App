import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, logout } from './app/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Context from './components/Context';

import Navibar from './components/Navibar';


export default function App() {
  return (
    <>
      <Context>
        <SafeAreaProvider>
          <Navibar />
        </SafeAreaProvider>
      </Context>
    </>
  );
}
