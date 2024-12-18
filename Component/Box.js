import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../Style/Colors';

/**
 * Row component - hiển thị các phần tử theo hàng ngang
 *
 * @param {object} props - Các thuộc tính truyền vào component
 * @param {React.ReactNode} props.children - Các phần tử con được hiển thị bên trong Row
 * @param {boolean} props.between - Nếu true, áp dụng `justifyContent: 'space-between'` vào Row
 * @param {object} props.style - Kiểu dáng tùy chỉnh thêm vào Row
 */
export const Row = props => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: props.between ? 'space-between' : 'center',
          alignItems: 'center',
        },
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

/**
 * Column component - hiển thị các phần tử theo cột dọc
 *
 * @param {object} props - Các thuộc tính truyền vào component
 * @param {React.ReactNode} props.children - Các phần tử con được hiển thị bên trong Column
 * @param {object} props.style - Kiểu dáng tùy chỉnh thêm vào Column
 */
export const Column = props => {
  return <View style={[styles.column, props.style]}>{props.children}</View>;
};

/**
 * Container component - tạo vùng chứa với một số kiểu dáng cơ bản
 *
 * @param {object} props - Các thuộc tính truyền vào component
 * @param {React.ReactNode} props.children - Các phần tử con được hiển thị bên trong Container
 * @param {object} props.style - Kiểu dáng tùy chỉnh thêm vào Container
 */
export const Container = props => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

/**
 * Spacer component - tạo khoảng trống tùy chỉnh
 *
 * @param {object} props - Các thuộc tính truyền vào component
 * @param {number} props.height - Chiều cao của khoảng trống (mặc định là 0)
 * @param {number} props.width - Chiều rộng của khoảng trống (mặc định là 0)
 */
export const Spacer = props => {
  return <View style={{height: props.height || 0, width: props.width || 0}} />;
};
export const CircleComponent = ({children, size, color, style, onClick}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.7}
      style={[
        {
          width: size,
          height: size,
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};
export const Box = ({children, style, row, onClick}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.8}
      style={[styles.box, style, {flexDirection: row ? 'row' : 'column'}]}>
      {children}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.backgroundColor,
  },
  column: {
    flexDirection: 'column',
  },
  box: {
    padding: 15,
    paddingEnd: 20,
    backgroundColor: Colors.white,
    elevation: 8,
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
});
