import axios from 'axios';
import {getDistance} from 'geolib';
import React, {useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
import {Button, Text, Spinner, Alert, HStack} from 'native-base';

interface LocationProp {
  latitude: number;
  longitude: number;
}

const LocationInfo = ({latitude, longitude}: LocationProp) => {
  const toast = useToast();
  const location1 = {latitude: latitude, longitude: longitude};
  const location2 = {latitude: 30.7058118, longitude: 76.6929724};

  const [todayAttendance, setTodayAttendance] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserIp = async () =>
    await axios
      .get('https://api.ipify.org?format=json')
      .then(response => {
        return response.data.ip;
      })
      .catch(error => {
        console.error(error);
        return false;
      });

  const onMarkAttendance = async () => {
    let id = toast.show('Wait we are marking attendance.', {
      type: 'warning',
      placement: 'top',
      duration: 4000,
      animationType: 'slide-in',
    });

    setLoading(true);
    const ip = await fetchUserIp();

    if (ip === '223.178.212.19') {
      setTodayAttendance(true);
      setLoading(false);
      toast.update(id, 'Attendance for today is marked.', {
        type: 'success',
      });
    } else {
      toast.update(id, 'You are not connected to company wifi.', {
        type: 'danger',
      });
      setLoading(false);
    }
  };

  return getDistance(location1, location2) / 1000 < 0.5 && !todayAttendance ? (
    <HStack alignItems="center" my={5}>
      <Alert mr={3} status="error">
        you have not marked attendance yet.
      </Alert>
      {!loading ? (
        <Button
          size="md"
          backgroundColor="#F2796B"
          rounded="lg"
          onPress={onMarkAttendance}>
          Mark
        </Button>
      ) : (
        <Spinner size="lg" color="#F2796B" />
      )}
    </HStack>
  ) : todayAttendance ? (
    <Alert status="success">
      <HStack flexShrink={1} space={2} alignItems="center">
        <Alert.Icon />
        <Text fontSize="md" fontWeight="medium" color="coolGray.800">
          You have marked your attendance.
        </Text>
      </HStack>
    </Alert>
  ) : (
    <HStack alignItems="center">
      <Alert status="info" mr={2}>
        <HStack flexShrink={1} space={2} alignItems="center">
          <Alert.Icon />
          <Text fontSize="md" fontWeight="medium" color="coolGray.800">
            Please wait, we are fetching details
          </Text>
          <Spinner size="sm" color="#F2796B" />
        </HStack>
      </Alert>
    </HStack>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     alignSelf: 'center',
//     padding: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: '#0984e3',
//     borderRadius: 5,
//   },

//   textButton: {
//     color: '#0984e3',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

export default LocationInfo;
