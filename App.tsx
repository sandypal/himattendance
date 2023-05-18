import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';
import {NativeBaseProvider} from 'native-base';

import {Routers} from './app/routers';

const App = () => {
  return (
    <NativeBaseProvider>
      <ToastProvider>
        <NavigationContainer>
          <Routers />
        </NavigationContainer>
      </ToastProvider>
    </NativeBaseProvider>
  );
};

export default App;
