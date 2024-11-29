import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Row} from './Box';
import {TextTitle} from './TextView';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderScreen = ({
  title,
  onback,
  gotoCart,
  avatar,
  image,
  cart,
  padding,
}) => {
  return (
    <Row
      between={true}
      style={padding ? {} : {padding: 15, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={onback}>
        {(avatar &&
          (image ? (
            <Image source={{uri: image}} style={styles.notification} />
          ) : (
            <Ionicons name="person-outline" size={32} color="black" />
          ))) || <Ionicons name="arrow-back-outline" size={32} color="black" />}
      </TouchableOpacity>
      {title && <TextTitle size={24}>{title}</TextTitle>}
      {!cart ? (
        <TouchableOpacity style={styles.cart} onPress={gotoCart}>
          <Ionicons name="cart-outline" size={32} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 32}} />
      )}
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
  notification: {
    marginLeft: 5,
    width: 55,
    elevation: 8,
    resizeMode: 'cover',
    height: 55,
    borderRadius: 100,
  },
});
