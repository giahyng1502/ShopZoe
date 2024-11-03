import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Container, Row, Spacer} from '../Component/Box';
import {TextTitle, TextView} from '../Component/TextView';
import EditText from '../Component/EditText';
import PasswordInput from '../Component/CustomInputPass';
import CustomButton from '../Component/CustomButton';
import {Checkbox, Snackbar} from 'react-native-paper';
import Style from '../Style/Style';
import Colors from '../Style/Colors';
import FetchApi from '../API/FetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from '../Component/AppLoading';
import {useFocusEffect} from '@react-navigation/native';
// import Snackbar from 'react-native-snackbar';
const LoginScreen = ({navigation, route}) => {
  const [error, setError] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [account, setAccount] = useState('');
  const [password, setpassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [visible, setVisible] = useState(false);
  const [textSnapper, setTextSnapper] = useState('');
  const [loading, setLoading] = useState(false);
  const notification = () => {
    const {notification} = route.params || {};
    // console.log(notification);
    if (notification) {
      setTextSnapper(notification);
      setVisible(true);
    }
  };
  useFocusEffect(
    useCallback(() => {
      notification();
    }),
  ),
    [notification];
  const getAccount = async () => {
    const phoneNumber = await AsyncStorage('phoneNumber');
    const passwordSave = await AsyncStorage('password');
    // console.log(passwordSave);
    if (phoneNumber.length === 0 && passwordSave.length === 0) {
      setAccount('');
      setpassword('');
      // console.log(password);
    } else {
      account = await AsyncStorage('phoneNumber');
      password = await AsyncStorage('password');
      // console.log(password);
    }
  };
  useEffect(() => {
    getAccount();
  }, []);

  const handleLogin = async () => {
    if (error || errorPass) {
      return;
    }
    if (account.length === 0 || password.length === 0) {
      setTextSnapper('Không được để trống tài khoản hoặc mật khẩu');
      setVisible(true);
      return;
    }
    try {
      setLoading(true);
      const user = {
        phoneNumber: account,
        password: password,
      };
      const res = await FetchApi('user/login', 'POST', user);
      if (res.status === 200) {
        if (checkbox) {
          await AsyncStorage.setItem('phoneNumber', account);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('phoneNumber');
          await AsyncStorage.removeItem('password');
        }
        setTextSnapper('Đăng nhập thành công');
        setVisible(true);
      } else {
        setTextSnapper('Thông tin tài khoản hoặc mật khẩu không chính xác');
        setVisible(true);
      }
    } catch (error) {
      setTextSnapper('Có lỗi xảy ra ở hệ thống, vui lòng đăng nhập lại sau');
      console.log('Có lỗi xảy ra ở login', error);
    }
    setLoading(false);
  };

  const handleAccount = input => {
    // Chuyển đổi đầu vào thành chuỗi để kiểm tra

    // Kiểm tra xem đầu vào có phải là một chuỗi số không
    const regex = /^[0-9]+$/; // Biểu thức chính quy để kiểm tra số

    if (input.length === 0) {
      setError('Không được để trống số điện thoại');
      return;
    }
    // Kiểm tra xem tất cả các ký tự có phải là số hay không
    if (!regex.test(input)) {
      setError('Số điện thoại phải là số');
      return;
    }

    // Nếu không có lỗi, reset lỗi
    setError('');
  };
  const handlePassword = input => {
    // Kiểm tra độ dài mật khẩu
    if (input.length === 0) {
      setErrorPass('Không được bỏ trống mật khẩu');
      return;
    }

    // Kiểm tra xem mật khẩu có chứa khoảng trắng
    if (/\s/.test(input)) {
      setErrorPass('Mật khẩu không được chứa khoảng trắng');
      return;
    }
    // Nếu không có lỗi, reset lỗi
    setErrorPass('');
  };
  return (
    <>
      <Container>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}
          style={Style.snackbar}
          action={{
            label: 'X',
            onPress: () => {
              setVisible(false);
            },
            textColor: Colors.white,
          }}>
          <TextView size={14} color={Colors.white}>
            {textSnapper}
          </TextView>
        </Snackbar>
        <TextTitle>Chào Mừng Bạn</TextTitle>
        <TextView>Đăng nhập tài khoản</TextView>
        <Spacer height={20} />
        <EditText
          placeholder="Nhập tài khoản của bạn"
          label="Tài khoản"
          value={account}
          onChangeText={it => {
            setAccount(it);
            handleAccount(it);
          }}
          error={!!error}
        />
        <PasswordInput
          label="Mật khẩu"
          secureTextEntry={true}
          placeholder="Vui lòng nhập mật khẩu"
          value={password}
          onChangeText={it => {
            setpassword(it);
            handlePassword(it);
          }}
          error={!!errorPass}
        />
        <Spacer height={15} />
        <CustomButton onPress={handleLogin}>
          <Text style={{fontSize: 20, fontWeight: '700', color: Colors.white}}>
            Đăng nhập
          </Text>
        </CustomButton>
        <Spacer height={15} />
        <Row between={true}>
          <Row>
            <Checkbox
              status={checkbox ? 'checked' : 'unchecked'} // Trạng thái của checkbox
              onPress={() => {
                setCheckbox(!checkbox); // Cập nhật trạng thái khi checkbox được nhấn
              }}
              color={Colors.blueColor}
              uncheckedColor={Colors.blueColor}
            />
            <TextView>Nhớ tài khoản</TextView>
          </Row>
          <TouchableOpacity>
            <TextView color={Colors.blueColor}>Quên mật khẩu?</TextView>
          </TouchableOpacity>
        </Row>
        <Spacer height={15} />
        {error && (
          <TextView color={Colors.error} size={12}>
            * {error}
          </TextView>
        )}
        {errorPass && (
          <TextView color={Colors.error} size={12}>
            * {errorPass}
          </TextView>
        )}
        <Spacer height={15} />
        <Row style={Style.row}>
          <View style={Style.separator}></View>
          <Text style={{marginHorizontal: 10}}>Hoặc</Text>
          <View style={Style.separator}></View>
        </Row>
        <Row style={Style.padding}>
          <TouchableOpacity>
            <Image
              source={require('../assets/image/google.png')}
              style={[Style.iconButton, {width: 62}]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/image/facebook.png')}
              style={Style.iconButton}
            />
          </TouchableOpacity>
        </Row>
        <Row>
          <TextView>Bạn chưa có tài khoản : </TextView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <TextView style={[{color: Colors.blueColor}]}>
              Tạo tài khoản
            </TextView>
          </TouchableOpacity>
        </Row>
      </Container>
      {loading && <AppLoading />}
    </>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({});
