import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

export const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animation/loader.json')}
        style={styles.animation}
        autoPlay
      />
      <Text style={styles.text}>We are loading data please wait...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    maxWidth: 300,
    maxHeight: 300,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
  },
});
