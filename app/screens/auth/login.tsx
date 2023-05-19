import React, {useState} from 'react';
import {
  Box,
  FormControl,
  Input,
  Center,
  Button,
  Text,
  HStack,
  Image,
  ScrollView,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {validateEmail} from '../../utils';
import {loginBg, user} from '../../assets/images';

export const Login = ({navigation}: any) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({email: '', password: ''});

  const onLogin = () => {
    const newErrors = {email: '', password: ''};

    if (!form?.email && !form?.email) {
      newErrors.email = 'Email is required';
      newErrors.password = 'Password is required';
    }

    if (!form?.email) {
      newErrors.email = 'Email is required';
      if (form?.password) {
        newErrors.password = '';
      }
    } else if (!validateEmail(form?.email)) {
      newErrors.email = 'Email is not valid';
      if (form?.password) {
        newErrors.password = '';
      }
    }

    if (!form?.password) {
      newErrors.password = 'Password is required';
    }

    if (form?.email && form?.password && validateEmail(form?.email)) {
      newErrors.email = '';
      newErrors.password = '';

      setLoading(true);
      const token = 'MySecretToken';
      AsyncStorage.setItem('AccessToken', token);

      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Home');
      }, 3000);
    }

    setErrors(newErrors);
  };

  return (
    <ScrollView
      backgroundColor="#F6F6F6"
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <Center py={5} flex={1} w="100%" maxWidth="320px" mx="auto">
        <Box w="100%">
          <HStack alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              Login
            </Text>
            <Image ml={1} source={user} alt="Login" />
          </HStack>
          <Text fontSize="md" fontWeight="light">
            Welcome back
          </Text>
        </Box>
        <Box marginY={5}>
          <Image ml={1} source={loginBg} alt="Login" />
        </Box>
        <Box w="100%">
          <FormControl mb="5" isInvalid={errors?.email ? true : false}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Email"
              backgroundColor="#fff"
              borderWidth={0}
              onChangeText={value => setForm({...form, email: value})}
            />
            <FormControl.ErrorMessage>{errors?.email}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.password ? true : false}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              borderWidth={0}
              backgroundColor="#fff"
              placeholder="Password"
              onChangeText={value => setForm({...form, password: value})}
            />
            <FormControl.ErrorMessage>
              {errors?.password}
            </FormControl.ErrorMessage>
          </FormControl>
          {!loading ? (
            <Button
              size="md"
              mt={6}
              backgroundColor="#F2796B"
              rounded="xl"
              onPress={onLogin}>
              Login
            </Button>
          ) : (
            <Spinner mt={6} size="lg" color="#F2796B" />
          )}
        </Box>
      </Center>
    </ScrollView>
  );
};
