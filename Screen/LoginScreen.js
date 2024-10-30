import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Container, Row, Spacer} from '../Component/Box';
import {TextTitle, TextView} from '../Component/TextView';
import EditText from '../Component/EditText';
import PasswordInput from '../Component/CustomInputPass';
import CustomButton from '../Component/CustomButton';
import {Checkbox} from 'react-native-paper';
import Style from '../Style/Style';
import Colors from '../Style/Colors';
const LoginScreen = ({navigation}) => {
  const [error, setError] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [account, setAccount] = useState('');
  const [password, setpassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const handleAccount = input => {
    if (input.length < 3) {
      setError('Tài khoản phải có ít nhất 3 ký tự');
    } else {
      setError('');
    }
  };
  const handlePassword = input => {
    if (input.length < 3) {
      setErrorPass('Mật khẩu phải có ít nhất 3 ký tự');
    } else {
      setErrorPass('');
    }
  };
  return (
    <Container>
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
      <CustomButton>
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
          <TextView style={[{color: Colors.blueColor}]}>Tạo tài khoản</TextView>
        </TouchableOpacity>
      </Row>
    </Container>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({});
