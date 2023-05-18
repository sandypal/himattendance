import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getDistance} from 'geolib';
import {useToast} from 'react-native-toast-notifications';
import dayjs from 'dayjs';
import axios from 'axios';

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
  const [ip, setIp] = useState(0);

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
    setLoading(true);
    const ip = await fetchUserIp();

    if (ip === '223.178.212.19') {
      setTimeout(() => {
        toast.show('Attendance for today is marked.', {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
        setTodayAttendance(true);
        setLoading(false);
      }, 3000);
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

  return (
    <View>
      {getDistance(location1, location2) / 1000 < 0.5 && !todayAttendance ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginRight: 20,
            }}>
            Mark attendance
          </Text>
          {!loading ? (
            <TouchableOpacity style={styles.button} onPress={onMarkAttendance}>
              <Text style={styles.textButton}>Present</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      ) : todayAttendance ? (
        <Text style={{fontWeight: 'bold', fontSize: 20, marginVertical: 15}}>
          {`${dayjs().format('DD-MMMM-YYYY')} : Present`}
        </Text>
      ) : (
        <Text style={{fontWeight: 'bold', fontSize: 20, marginVertical: 15}}>
          You are far away from office for marking attendance.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0984e3',
    borderRadius: 5,
  },

  textButton: {
    color: '#0984e3',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default LocationInfo;
