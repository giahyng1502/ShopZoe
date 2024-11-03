import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../Style/Colors';

const IconBottom = ({name, color, focus}) => {
  const iconSource = {
    home: require('../assets/image/home.png'),
    search: require('../assets/image/search.png'),
    notifications: require('../assets/image/bell.png'),
    profile: require('../assets/image/user.png'),
  }[name];

  return (
    <View style={styles.iconContainer}>
      <Image
        source={iconSource}
        style={[styles.icon, {width: 32, height: 32, tintColor: color}]}
        resizeMode="contain"
      />
      {focus && <View style={styles.dot} />}{' '}
      {/* Hiển thị chấm tròn khi tab được chọn */}
    </View>
  );
};

export default IconBottom;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  dot: {
    width: 8, // Kích thước chấm tròn
    height: 8,
    borderRadius: 8, // Để tạo hình tròn
    backgroundColor: Colors.blueColor, // Màu của chấm tròn
    position: 'absolute', // Đặt vị trí chấm tròn
    bottom: -18, // Khoảng cách từ biểu tượng đến chấm tròn
  },
});
