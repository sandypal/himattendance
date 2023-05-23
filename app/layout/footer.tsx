import {Box, Center, HStack, Image, Pressable, Text} from 'native-base';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {attendanceIcon, homeIcon, profileIcon} from '../assets/images';

const Footer = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);
  const currentRouteName = navigationState.routes[navigationState.index].name;

  return (
    <Box position="absolute" bottom="0" left="0" right="0">
      <HStack bg="#F2796B" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          py="3"
          opacity={currentRouteName === 'Home' ? 1 : 0.6}
          flex={1}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Center>
            <Image h="6" w="6" source={homeIcon} alt="Home" />
            <Text color="white" fontSize="16" fontWeight="semibold">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          py="3"
          flex={1}
          opacity={currentRouteName === 'Attendance' ? 1 : 0.6}
          onPress={() => {
            navigation.navigate('Attendance');
          }}>
          <Center>
            <Image h="6" w="6" source={attendanceIcon} alt="Home" />
            <Text color="white" fontSize="16" fontWeight="semibold">
              Attendance
            </Text>
          </Center>
        </Pressable>
        <Pressable
          py="3"
          flex={1}
          opacity={currentRouteName === 'Profile' ? 1 : 0.6}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Center>
            <Image h="6" w="6" source={profileIcon} alt="Home" />
            <Text color="white" fontSize="16" fontWeight="semibold">
              Profile
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default Footer;
