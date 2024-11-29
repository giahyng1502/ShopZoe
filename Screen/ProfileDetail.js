import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CircleComponent, Column, Container, Spacer} from '../Component/Box';
import Header from '../Component/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Style/Colors';
import EditText from '../Component/EditText';
import CustomButton from '../Component/CustomButton';
import {TextTitle, TextView} from '../Component/TextView';
import * as ImagePicker from 'react-native-image-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetDialog from '../Dialogs/BottomSheetDialog';
import {useDispatch, useSelector} from 'react-redux';
import {uploadImage} from '../API/FetchApi';
import {updateUser} from '../redux/reducer/userReducer';
import AppLoading from '../Component/AppLoading';

const ProfileDetail = ({navigation}) => {
  const [image, setImage] = useState({url: null, camera: false});
  const [visiable, setVisiable] = useState(false);
  const {user, userLoading} = useSelector(state => state.userState);
  const [name, setName] = useState(user.name);
  const [address, setAdress] = useState(user.address);
  const dispatch = useDispatch();
  const updateProfile = async () => {
    if (image.camera) {
      const url = await uploadImage(image.url);
      dispatch(
        updateUser({
          name,
          address,
          avatar: url,
        }),
      );
    } else {
      dispatch(
        updateUser({
          name,
          address,
        }),
      );
    }
  };
  const chupAnh = useCallback(() => {
    // định nghĩa các option để chụp ảnh
    let option = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    // bật camera
    ImagePicker.launchCamera(option, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.assets && res.assets.length > 0) {
        setImage({url: res.assets[0].uri, camera: true});
        setVisiable(false);
      }
    });
  }, []);
  const chonAnh = useCallback(() => {
    const option = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    ImagePicker.launchImageLibrary(option, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.assets && res.assets.length > 0) {
        setImage({url: res.assets[0].uri, camera: true});

        setVisiable(false);
      }
    });
  }, []);
  useEffect(() => {
    if (user.avatar) {
      setImage({url: user.avatar, camera: false});
    }
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {userLoading && <AppLoading />}
      <BottomSheetDialog
        isVisible={visiable}
        onClose={() => setVisiable(false)}>
        <Column>
          <TextTitle style={{fontSize: 16, marginBottom: 10}} />
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => {
              // đóng sheet
            }}>
            <TextView size={22}>Xem ảnh đại diện</TextView>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => {
              chonAnh();
            }}>
            <TextView size={22}>Chọn ảnh ảnh đại diện</TextView>
          </TouchableOpacity>

          <TouchableOpacity
            style={{paddingVertical: 10}}
            onPress={() => {
              chupAnh();
            }}>
            <TextView size={22}>Chụp ảnh đại diện</TextView>
          </TouchableOpacity>
        </Column>
      </BottomSheetDialog>
      <ScrollView>
        <Container>
          <Header
            title={'Chỉnh sửa hồ sơ'}
            padding
            cart
            onback={() => navigation.goBack()}
          />
          <Spacer height={20} />
          <View style={styles.avatarBox}>
            <Image
              source={
                image ? {uri: image.url} : require('../assets/image/user.png')
              }
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                position: 'absolute',
              }}
            />
            <CircleComponent
              style={styles.camera}
              color={Colors.grayColor2}
              size={42}
              onClick={() => {
                setVisiable(true);
              }}>
              <Ionicons name={'camera'} size={32} />
            </CircleComponent>
          </View>
          <Spacer height={20} />
          <EditText
            placeholder="Nhập tài khoản của bạn"
            label="Họ tên"
            value={name}
            onChangeText={setName}
          />
          <EditText
            placeholder="Nhập tài khoản của bạn"
            label="Địa chỉ"
            value={address}
            onChangeText={setAdress}
          />
          <Spacer height={20} />
          <CustomButton
            onPress={() => {
              updateProfile();
            }}>
            <TextTitle color={Colors.white} size={22}>
              Cập nhập
            </TextTitle>
          </CustomButton>
        </Container>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  avatarBox: {
    width: 210,
    height: 210,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'position',
    alignSelf: 'center',
    borderRadius: '50%',
    backgroundColor: Colors.white,
  },
  camera: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
