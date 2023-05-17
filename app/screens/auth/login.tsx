import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';

import {validateEmail} from '../../utils';

export const Login = ({navigation}: any) => {
  const toast = useToast();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    if (!form?.email && !form?.password) {
      toast.show('Fields are required.', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else if (!form?.email) {
      toast.show('Email is required.', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else if (!validateEmail(form?.email)) {
      toast.show('Email is not valid.', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else if (!form?.password) {
      toast.show('Password is required.', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else {
      console.log(form);

      setLoading(true);
      const token = 'MySecretToken';
      AsyncStorage.setItem('AccessToken', token);

      setTimeout(() => {
        setLoading(false);
        navigation.replace('Home');
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login to your account</Text>
      <TextInput
        value={form?.email}
        onChangeText={value => setForm({...form, email: value})}
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        value={form?.password}
        onChangeText={value => setForm({...form, password: value})}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      {!loading ? (
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <View style={{marginTop: 10}}>
          <ActivityIndicator size="large" />
        </View>
      )}
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

  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    color: '#1e1c1c',
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 20,
  },

  text: {
    fontWeight: '500',
    color: '#212121',
    paddingLeft: 10,
    fontSize: 27,
    marginBottom: 25,
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

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
