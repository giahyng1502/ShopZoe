import {Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Box, Container, Row, Spacer} from '../Component/Box';
import {TextTitle} from '../Component/TextView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const {user} = useSelector(state => state.userState);
  return (
    <Container>
      <Row>
        <TextTitle size={26} style={styles.textAlign}>
          Hồ Sơ
        </TextTitle>
      </Row>
      <Spacer height={20} />
      <Image
        source={
          user.avatar ? {uri: user.avatar} : require('../assets/image/user.png')
        }
        style={styles.avatar}
      />
      <TextTitle style={{textAlign: 'center'}}>{user.name}</TextTitle>
      <Spacer height={20} />
      <Box
        onClick={() => {
          navigation.navigate('ProfileDetail');
        }}>
        <Row between>
          <TextTitle size={20}>Chỉnh sửa thông tin</TextTitle>
          <Ionicons name="chevron-forward" size={30} color="#707070" />
        </Row>
      </Box>
      <Box>
        <Row between>
          <TextTitle size={20}>Lịch sử giao dịch </TextTitle>
          <Ionicons name="chevron-forward" size={30} color="#707070" />
        </Row>
      </Box>
      <Box>
        <Row between>
          <TextTitle size={20}>Thông tin thanh toán</TextTitle>
          <Ionicons name="chevron-forward" size={30} color="#707070" />
        </Row>
      </Box>
      <Box>
        <Row between>
          <TextTitle size={20}>Điều khoản và điều kiện</TextTitle>
          <Ionicons name="chevron-forward" size={30} color="#707070" />
        </Row>
      </Box>
      <Box>
        <Row between>
          <TextTitle size={20}>Chính sách quyền riêng tư</TextTitle>
          <Ionicons name="chevron-forward" size={30} color="#707070" />
        </Row>
      </Box>
      <Box>
        <Row between>
          <TextTitle size={20}>Đăng xuất</TextTitle>
          <Ionicons name="chevron-forward" size={30} color="#707070" />
        </Row>
      </Box>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  textAlign: {
    textAlign: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
});
