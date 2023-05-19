import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from '../screens/auth/login';
import {Splash} from '../screens/splash';
import {Home} from '../screens/home';
import Attendance from '../screens/attendance';

const Stack = createNativeStackNavigator();

export const Routers = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Attendance" component={Attendance} />
    </Stack.Navigator>
  );
};
