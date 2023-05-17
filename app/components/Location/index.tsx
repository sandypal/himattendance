import {Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getDistance} from 'geolib';

interface LocationProp {
  latitude: number;
  longitude: number;
}

const LocationInfo = ({latitude, longitude}: LocationProp) => {
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    fetchLocationName();
  }, [latitude, longitude]);

  function fetchLocationName() {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    )
      .then(response => response.json())
      .then(data => {
        setLocationName(data.display_name);
      })
      .catch(error => {
        console.error(error);
        setLocationName('Error fetching location');
      });
  }

  const location1 = {
    latitude: latitude,
    longitude: longitude,
  };
  const location2 = {latitude: 30.7058118, longitude: 76.6929724};

  const distance = getDistance(location1, location2);

  // console.log(locationName);
  console.log(distance / 1000);

  return (
    <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 15}}>
      {/* {locationName} */}
      {distance / 1000 < 0.5 ? (
        <Text>You are near to office mark attendance</Text>
      ) : (
        <Text>You are far away from office for marking attendance.</Text>
      )}
    </Text>
  );
};

export default LocationInfo;
