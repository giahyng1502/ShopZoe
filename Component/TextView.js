import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../Style/Colors';

/**
 * TextView component - hiển thị văn bản với kích thước mặc định hoặc tùy chỉnh
 *
 * @param {object} props - Các thuộc tính truyền vào component
 * @param {string} props.color - Màu sắc của văn bản (mặc định là Colors.textColor)
 * @param {number} props.size - Kích thước font chữ của văn bản (mặc định là 18)
 * @param {object} props.style - Các kiểu tùy chỉnh khác cho văn bản
 * @param {React.ReactNode} props.children - Nội dung văn bản được hiển thị bên trong TextView
 */
export const TextView = props => {
  return (
    <Text
      style={[
        styles.textView,
        {color: props.color || Colors.textColor, fontSize: props.size || 18},
        props.style, // cho phép người dùng thêm kiểu tùy chỉnh
      ]}>
      {props.children}
    </Text>
  );
};

/**
 * TextTitle component - hiển thị văn bản tiêu đề với kích thước lớn hơn và kiểu in đậm
 *
 * @param {object} props - Các thuộc tính truyền vào component
 * @param {string} props.color - Màu sắc của tiêu đề (mặc định là Colors.textColor)
 * @param {number} props.size - Kích thước font chữ của tiêu đề (mặc định là 30)
 * @param {object} props.style - Các kiểu tùy chỉnh khác cho tiêu đề
 * @param {React.ReactNode} props.children - Nội dung tiêu đề được hiển thị bên trong TextTitle
 */
export const TextTitle = props => {
  return (
    <Text
      style={[
        styles.textTitle,
        {color: props.color || Colors.textColor, fontSize: props.size || 30},
        props.style, // cho phép người dùng thêm kiểu tùy chỉnh
      ]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textView: {
    color: Colors.textColor,
    fontSize: 18,
  },
  textTitle: {
    color: Colors.textColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
