import React, {useEffect, useState} from 'react';
import GetLocation from 'react-native-get-location';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LocationInfo from '../../components/Location';

export const Home = ({navigation}: any) => {
  const [PGranted, setPGranted] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    checkLocationPermission();
  }, []);

  async function checkLocationPermission() {
    let granted = await getLocationPermission();

    setPGranted(granted);

    if (granted) {
      getCurrentLocation();
    }
  }

  async function getCurrentLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLocation({
          latitude: location?.latitude,
          longitude: location?.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }

  async function getLocationPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).catch(err => {
      console.log(err);
    });

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  

  return (
    <View style={styles.container}>
      <LocationInfo
        latitude={location?.latitude}
        longitude={location?.longitude}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.textButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  button: {
    marginTop: 5,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0984e3',
    borderRadius: 5,
    width: '100%',
  },

  textButton: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
