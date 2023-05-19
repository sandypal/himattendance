import React, {useEffect, useState} from 'react';
import GetLocation from 'react-native-get-location';
import {
  //   StyleSheet,
  //   Text,
  //   TouchableOpacity,
  //   View,
  //   ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {
  Box,
  Alert,
  FormControl,
  Input,
  Center,
  Button,
  Text,
  HStack,
  Image,
  ScrollView,
  Avatar,
  Spinner,
  Menu,
  Pressable,
  Square,
  View,
} from 'native-base';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LocationInfo from '../../components/Location';
import Layout from '../../layout';

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

  const onLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <Layout>
      <Center pt={5} pb={20} flex={1} w="100%" mx="auto">
        <Box w="100%">
          <HStack justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="md" fontWeight="light">
                Welcome back
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                John Carter
              </Text>
              <Text>{dayjs().format('DD-MMMM-YYYY')}</Text>
            </Box>
            <Menu
              px={4}
              bottom={-10}
              right={5}
              trigger={triggerProps => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}>
                    <Avatar
                      size="lg"
                      bg="green.500"
                      source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                      }}
                    />
                  </Pressable>
                );
              }}>
              <Menu.Item>Profile</Menu.Item>
              <Menu.Item>Setting</Menu.Item>
              <Button
                size="md"
                backgroundColor="#F2796B"
                rounded="lg"
                onPress={onLogout}>
                Logout
              </Button>
            </Menu>
          </HStack>
        </Box>
        <Box w="100%" my={5}>
          <LocationInfo
            latitude={location?.latitude}
            longitude={location?.longitude}
          />
          <HStack justifyContent="space-between" my={5}>
            <Square p={2} size="170px" bg="white" shadow={1} rounded="md">
              <Text fontSize="xl" fontWeight="bold">
                Working Days
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                23
              </Text>
            </Square>
            <Square p={2} size="170px" bg="white" shadow={1} rounded="md">
              <Text fontSize="xl" fontWeight="bold">
                Attendance
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                12
              </Text>
            </Square>
          </HStack>
          <HStack justifyContent="space-between">
            <Square p={2} size="170px" bg="white" shadow={1} rounded="md">
              <Text fontSize="xl" fontWeight="bold">
                Leaves Taken
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                1
              </Text>
            </Square>
            <Square p={2} size="170px" bg="white" shadow={1} rounded="md">
              <Text fontSize="xl" fontWeight="bold">
                Leaves Remained
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                2
              </Text>
            </Square>
          </HStack>
          <HStack justifyContent="space-between" mt={5}>
            <Square p={2} size="170px" bg="white" shadow={1} rounded="md">
              <Text fontSize="xl" fontWeight="bold">
                Leaves Taken
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                1
              </Text>
            </Square>
            <Square p={2} size="170px" bg="white" shadow={1} rounded="md">
              <Text fontSize="xl" fontWeight="bold">
                Leaves Remained
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                2
              </Text>
            </Square>
          </HStack>
        </Box>
      </Center>
    </Layout>
  );
};
