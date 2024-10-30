import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * Component CustomButton
 *
 * @param {function} onPress - Sự kiện click vào button.
 * @param {React.ReactNode} children - Nội dung hiển thị trong button.
 * @param {object} style - Style tùy chỉnh thêm cho button.
 * @returns {JSX.Element} - Trả về một button với hiệu ứng gradient.
 */

const CustomButton = props => (
  <TouchableOpacity onPress={props.onPress} style={[styles.box, props.style]}>
    <LinearGradient
      colors={['#007537', '#4CAF50']}
      start={{x: 0.0058, y: 0}}
      end={{x: 0.9565, y: 1}}
      style={styles.box}>
      {props.children}
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButton;
