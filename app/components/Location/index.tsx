import axios from 'axios';
import {getDistance} from 'geolib';
import React, {useState, useEffect} from 'react';
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
  const [ip, setIp] = useState('');

  useEffect(() => {
    fetchUserIp();
  }, []);

  const fetchUserIp = async () =>
    await axios
      .get('https://api.ipify.org?format=json')
      .then(response => {
        setIp(response.data.ip);
      })
      .catch(error => {
        console.error(error);
        setIp('error');
      });

  const onMarkAttendance = async () => {
    setLoading(true);

    if (ip === '223.178.212.166') {
      setTodayAttendance(true);
      setLoading(false);
      toast.show('Attendance for today is marked.', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else if (ip === 'error' || ip === undefined) {
      toast.show('Server is busy. Please retry in a while.', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
      setLoading(false);
    } else {
      toast.show('You are not connected to company wifi.', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
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
