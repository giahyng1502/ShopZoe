import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Column, Container, Row, Spacer} from '../Component/Box';
import Header from '../Component/Header';
import FetchApi from '../API/FetchApi';
import {TextTitle, TextView} from '../Component/TextView';
import Colors from '../Style/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await FetchApi(
      'cart/getAll',
      'GET',
      null,
      'barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzM0MGY5Y2JhMDVhYWZjMTZiOTVjMDgiLCJwaG9uZU51bWJlciI6Imh1bmdjeUBnbWFpbC5jb20iLCJuYW1lIjoiaHVuZyIsInJvbGUiOmZhbHNlLCJpYXQiOjE3MzE0NzY5MDEsImV4cCI6MTczNDA2ODkwMX0.84R1jHw-OS_V6-Ty6uDy6T-FdkR8YsXoQ634DyOstvY',
    );
    if (response.status === 200) {
      const data = await response.json();
      setData(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <Row style={styles.item}>
        <Image
          source={{uri: item.item.image[0]}}
          resizeMode={'contain'}
          style={{width: '40%', height: 150}}
        />
        <Column>
          <TextTitle size={22}>{item.item.name}</TextTitle>
          <Spacer height={5} />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: 'gray',
              paddingHorizontal: 8,
              backgroundColor: Colors.grayColor,
              borderRadius: 5,
            }}>
            <TextView>
              {item.color}, {item.size}
              <Spacer width={5} />
              <Ionicons name="chevron-down" size={16} color={'gray'} />
            </TextView>
          </TouchableOpacity>
          <Spacer height={5} />
          <TextView size={18}>{item.item.price} đ</TextView>
          <TextView size={18}>Số lượng: {item.quantity}</TextView>
        </Column>
      </Row>
    );
  };
  return (
    <Container>
      <Header
        title="Giỏ hàng"
        padding
        cart
        onback={() => {
          navigation.goBack();
        }}
      />
      <Spacer height={10} />
      <FlatList
        data={data.items}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </Container>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  item: {
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});
