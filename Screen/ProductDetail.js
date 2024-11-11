import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Spacer} from '../Component/Box';
import HeaderScreen from '../Component/Header';
import SlideBanner from '../Component/SlideBanner';
import {TextTitle} from '../Component/TextView';
import Colors from '../Style/Colors';

const ProductDetail = ({navigation, route}) => {
  const {product} = route.params;
  console.log(product);
  return (
    <Container>
      <HeaderScreen
        title={'Chi tiết sản phẩm'}
        onback={() => {
          navigation.goBack();
        }}
      />
      <Spacer height={20} />
      <SlideBanner images={product.image} height={300} />
      <TextTitle>{product.name}</TextTitle>
      <TextTitle size={22} color={Colors.blueColor}>
        Giá: {product.price} VNĐ
      </TextTitle>
    </Container>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
