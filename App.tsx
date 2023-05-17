import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';

import {Routers} from './app/routers';

const App = () => {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
