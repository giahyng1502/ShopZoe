import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Column, Container, Row, Spacer} from '../Component/Box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextTitle, TextView} from '../Component/TextView';
import Colors from '../Style/Colors';
import SlideBanner from '../Component/SlideBanner';
import FetchApi from '../API/FetchApi';
import {Rating} from 'react-native-ratings';

const HomeScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const [listProduct, setListProduct] = useState([]);
  const Url = 'product/getAll';
  const banners = [
    'https://via.placeholder.com/350x150',
    'https://via.placeholder.com/350x150',
    'https://via.placeholder.com/350x150',
  ];
  const getData = async () => {
    const response = await FetchApi(Url);
    // console.log(response);

    const data = await response.json();
    if (response.status === 200) {
      setListProduct(data);
    } else {
      console.log('Error get data', response.status);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const renderItem = ({item}) => {
    return (
      <Pressable
        style={style.itemProduct}
        onPress={() => {
          // go to detail product
          navigation.navigate('DetailScreen', {product: item});
        }}>
        <Column>
          <Image
            source={{uri: item.image[0]}}
            style={style.imageProduct}
            resizeMode="contain"
          />
          <Column>
            <TextTitle size={18}>{item.name}</TextTitle>
            <TextTitle size={16} color={Colors.blueColor}>
              {item.price} VND
            </TextTitle>
            <Spacer height={5} />
            <View style={{width: '100%'}}>
              <Rating
                imageSize={20}
                readonly
                ratingColor="black" // Màu của sao đã được chọn (sao đầy)
                ratingBackgroundColor="lightgray" // Màu của sao chưa được chọn (sao xám)
                startingValue={item.rating}
                style={{alignItems: 'flex-start'}}
              />
            </View>
          </Column>
        </Column>
      </Pressable>
    );
  };

  return (
    <Container style={style.justifyContent}>
      {/*header*/}
      <Row between={true}>
        <TouchableOpacity style={style.avatar}>
          <Ionicons name="notifications-outline" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={style.avatar}>
          {image ? (
            <Image source={{uri: image}} style={style.notification} />
          ) : (
            <Ionicons name="person-outline" size={32} color="black" />
          )}
        </TouchableOpacity>
      </Row>
      <Spacer height={15} />
      <Column>
        <TextView>Hello,</TextView>
        <TextTitle color={Colors.blueColor}>Hoang Van Hung</TextTitle>
      </Column>
      <Spacer height={15} />
      <SlideBanner images={banners} autoplay={true} />
      <Spacer height={15} />

      <TextTitle>Trang Phục</TextTitle>
      <FlatList
        data={listProduct}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
      />
    </Container>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  notification: {
    width: 20,
    height: 20,
  },
  itemProduct: {
    width: '47%',
    backgroundColor: '#ffffff',
    elevation: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 10,
    padding: 10,
  },
  imageProduct: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },

  avatar: {
    width: 48,
    height: 48,
    zIndex: 1,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
});
