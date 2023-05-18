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
} from 'native-base';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

import LocationInfo from '../../components/Location';

export const Home = ({navigation}: any) => {
  const [PGranted, setPGranted] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  // const [attendanceData, setAttendanceData] = useState({
  //   tableHead: ['Date', 'Attendance', 'Leave'],
  //   tableData: [
  //     ['01-05-2023', 'Present', ''],
  //     ['02-05-2023', 'Present', ''],
  //     ['03-05-2023', 'Absent', 'Approved'],
  //     ['04-05-2023', 'Absent', 'Not Approved'],
  //     ['05-05-2023', 'Present', ''],
  //     ['06-05-2023', 'Present', ''],
  //     ['07-05-2023', 'Present', ''],
  //     ['08-05-2023', 'Present', ''],
  //     ['09-05-2023', 'Present', ''],
  //     ['10-05-2023', 'Present', ''],
  //     ['11-05-2023', 'Present', ''],
  //     ['12-05-2023', 'Present', ''],
  //     ['13-05-2023', 'Present', ''],
  //     ['14-05-2023', 'Present', ''],
  //     ['15-05-2023', 'Present', ''],
  //     ['16-05-2023', 'Present', ''],
  //     ['17-05-2023', 'Present', ''],
  //     ['18-05-2023', 'Present', ''],
  //   ],
  // });

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
    // <ScrollView style={styles.container}>
    //   <View style={styles.header}>
    //     <Text style={styles.headerLogoText}>Home</Text>
    //     <TouchableOpacity style={styles.button} onPress={handleLogout}>
    //       <Text style={styles.textButton}>Logout</Text>
    //     </TouchableOpacity>
    //   </View>
    //   {PGranted ? (
    //     <View>
    //       <LocationInfo
    //         latitude={location?.latitude}
    //         longitude={location?.longitude}
    //       />
    //       <Text
    //         style={{
    //           textAlign: 'center',
    //           fontSize: 18,
    //           fontWeight: '600',
    //         }}>
    //         May Attendance Details
    //       </Text>
    //       <Table
    //         borderStyle={{borderWidth: 1}}
    //         style={{marginTop: 10, marginBottom: 50}}>
    //         <Row
    //           data={attendanceData.tableHead}
    //           flexArr={[1, 1, 1]}
    //           style={styles.head}
    //           textStyle={styles.text}
    //         />
    //         <TableWrapper style={styles.wrapper}>
    //           <Rows
    //             data={attendanceData.tableData}
    //             flexArr={[1, 1, 1]}
    //             style={styles.row}
    //             textStyle={styles.text}
    //           />
    //         </TableWrapper>
    //       </Table>
    //     </View>
    //   ) : null}
    // </ScrollView>
    <ScrollView
      backgroundColor="#F5F7F9"
      px={5}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <Center py={5} flex={1} w="100%" mx="auto">
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
              right={10}
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
          <Alert status="error" mb={4}>
            you have not marked attendance yet.
          </Alert>
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
        </Box>
      </Center>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },

//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },

//   headerLogoText: {
//     fontSize: 24,
//     fontWeight: '600',
//   },

//   button: {
//     marginTop: 5,
//     padding: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#0984e3',
//     borderRadius: 5,
//     width: '30%',
//   },

//   textButton: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 18,
//   },

//   head: {height: 40, backgroundColor: '#f1f8ff'},

//   wrapper: {flexDirection: 'row'},

//   title: {flex: 1, backgroundColor: '#f6f8fa'},

//   row: {height: 28},

//   text: {paddingLeft: 10, color: '#000'},
// });
