import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
const AppLoading = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require('../assets/image/loading.json')}
        autoPlay
        loop
        resizeMode="contain"
        style={{width: 120, height: 120}}
        speed={1.4}
      />
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
