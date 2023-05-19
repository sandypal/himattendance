import {useState} from 'react';
import {Box, Center, HStack, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);

  return (
    <Box position="absolute" bottom="0" left="0" right="0">
      <HStack bg="#F2796B" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => {
            setSelected(0);
            navigation.navigate('Home');
          }}>
          <Center>
            <Text color="white" fontSize="16" fontWeight="semibold">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => {
            setSelected(1);
            navigation.navigate('Attendance');
          }}>
          <Center>
            <Text color="white" fontSize="16" fontWeight="semibold">
              Attendance
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 2 ? 1 : 0.6}
          py="3"
          flex={1}
          onPress={() => setSelected(2)}>
          <Center>
            <Text color="white" fontSize="16" fontWeight="semibold">
              Account
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 3 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(3)}>
          <Center>
            <Text color="white" fontSize="16" fontWeight="semibold">
              Logout
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default Footer;
