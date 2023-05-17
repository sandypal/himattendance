import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Loader} from '../../components/Loader';

export const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('AccessToken');
    if (!dataToken) {
      navigation.replace('Login');
    } else {
      navigation.replace('Home');
    }
  };

  return <Loader />;
};
