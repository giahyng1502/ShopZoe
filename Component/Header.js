import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Row} from './Box';
import {TextTitle} from './TextView';

const HeaderScreen = ({title, onback, gotoCart}) => {
  return (
    <Row between={true} style={{padding: 15, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={onback}>
        <Image
          style={{width: 12, height: 24, tintColor: 'black'}}
          source={require('../assets/image/ic_back.png')}
        />
      </TouchableOpacity>
      <TextTitle>{title}</TextTitle>
      <View style={styles.cart}>
        <Image
          style={{width: 30, height: 30, tintColor: 'black'}}
          source={require('../assets/image/shopping-cart.png')}
        />
      </View>
    </Row>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({
  cart: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 8,
    shadowRadius: 9,
    elevation: 8,
  },
});
