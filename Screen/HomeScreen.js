import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Column, Container, Spacer} from '../Component/Box';
import {TextTitle, TextView} from '../Component/TextView';
import Colors from '../Style/Colors';
import SlideBanner from '../Component/SlideBanner';
import Header from '../Component/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../redux/reducer/productReducer';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {getUser} from '../redux/reducer/userReducer';

const HomeScreen = ({navigation}) => {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const {data, isLoading, error} = useSelector(state => state.product);
  const {user} = useSelector(state => state.userState);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const banners = [
    'https://via.placeholder.com/350x150',
    'https://via.placeholder.com/350x150',
    'https://via.placeholder.com/350x150',
  ];
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getUser());
    if (user) {
      setImage(user.avatar);
      setName(user.name);
    }
  }, [dispatch]);
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
              <StarRatingDisplay
                rating={item.rating}
                starSize={30} // Tùy chỉnh kích thước sao
                starStyle={{marginHorizontal: -4}} // Màu sắc sao
                emptyStarColor="gray" // Màu sắc sao không đánh dấu
                fullStarColor="gold" // Màu sắc sao đánh dấu
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
      <Header
        avatar={true}
        image={image}
        padding={true}
        gotoCart={() => navigation.navigate('CartScreen')}
      />
      <Spacer height={15} />
      <Column>
        <TextView>Hello,</TextView>
        <TextTitle color={Colors.blueColor}>{name}</TextTitle>
      </Column>
      <Spacer height={15} />
      <SlideBanner images={banners} autoplay={true} />
      <Spacer height={15} />

      <TextTitle>Trang Phục</TextTitle>
      <FlatList
        data={data}
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
