import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Column, Container, Row, Spacer} from '../Component/Box';
import HeaderScreen from '../Component/Header';
import SlideBanner from '../Component/SlideBanner';
import {TextTitle, TextView} from '../Component/TextView';
import Colors from '../Style/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheetDialog from '../Dialogs/BottomSheetDialog';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FetchApi, {token} from '../API/FetchApi';
import {useDispatch, useSelector} from 'react-redux';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {addToCart} from '../redux/reducer/cartReducer';

const ProductDetail = ({navigation, route}) => {
  const {product} = route.params;
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [sizeSelected, setSizeSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const {items} = useSelector(state => state.cart);
  function hanlerSizeSelected(size) {
    setSizeSelected(size);
  }

  function hanlerColorSelected(size) {
    setColorSelected(size);
  }

  async function hanlerAddCart() {
    if (!sizeSelected || !colorSelected) {
      return;
    }
    const response = await FetchApi(
      'cart/addToCart',
      'POST',
      {
        productId: product._id,
        size: sizeSelected,
        color: colorSelected,
        quantity: quantity,
      },
      token,
    );
    if (response.status === 200) {
      setSheetVisible(false);
      const data = await response.json();
      dispatch(addToCart(data));
      console.log(data);
      alert('Thêm vào gio hàng thành công');
    } else {
      alert('Thêm vào gio hàng thất bại');
    }
  }

  function plusQuantity() {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    } else {
      alert('Sản phẩm đã đầy');
    }
  }
  function minusQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      return;
    }
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <HeaderScreen
          title={'Chi tiết sản phẩm'}
          onback={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          contentContainerStyle={{paddingBottom: 100}}
          keyboardShouldPersistTaps="handled">
          <Container>
            <SlideBanner images={product.image} height={300} />
            <TextTitle>{product.name}</TextTitle>
            <TextTitle size={22} color={Colors.blueColor}>
              Giá: {product.price} VNĐ
            </TextTitle>
            <Column>
              <TextTitle size={18}>Đánh giá sản phẩm </TextTitle>
              <Spacer height={5} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <StarRatingDisplay
                  rating={product.rating}
                  style={{justifyContent: 'flex-start'}}
                  starSize={50} // Tùy chỉnh kích thước sao
                  starStyle={{marginHorizontal: -4}} // Màu sắc sao
                  emptyStarColor="gray" // Màu sắc sao không đánh dấu
                  fullStarColor="gold" // Màu sắc sao đánh dấu
                />
                <Spacer width={10} />
                <TextTitle size={18} color={Colors.black}>
                  ({product.rating} / 5)
                </TextTitle>
              </View>
            </Column>
            <Spacer height={10} />
            <TextTitle size={18}>Mô tả sản phẩm</TextTitle>
            <TextTitle size={16}>Chất liệu</TextTitle>
            <TextView size={16}>{product.description[0]}</TextView>
            <TextTitle size={16}>Thiết kế</TextTitle>
            <TextView size={16}>{product.description[1]}</TextView>
            <TextTitle size={16}>Kiểu dáng</TextTitle>
            <TextView size={16}>{product.description[2]}</TextView>
          </Container>
        </ScrollView>
        <View style={styles.cartButtonContainer}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={event => {
              event.persist();
              setSheetVisible(true);
            }}>
            <Ionicons name="cart-outline" size={24} color="#fff" />
            <Spacer width={10} />
            <Text style={styles.cartButtonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
        <BottomSheetDialog
          isVisible={isSheetVisible}
          onClose={() => setSheetVisible(false)} // Đóng Bottom Sheet khi đã đóng
        >
          <Container>
            <Row>
              <Image
                source={{uri: product.image[0]}}
                style={{width: '50%', height: 150, borderRadius: 16}}
                resizeMode="cover"
              />
              <View style={{width: '50%', paddingHorizontal: 20}}>
                <TextTitle size={18} color={Colors.blueColor}>
                  {product.price} VND
                </TextTitle>
              </View>
            </Row>
            <Spacer height={20} />
            <TextTitle size={20}>Màu sắc</TextTitle>
            <Row between style={styles.row}>
              {product.colors.length &&
                product.colors.map(colors => (
                  <Pressable
                    onPress={() => hanlerColorSelected(colors)}
                    key={Math.random()}
                    style={
                      (colorSelected === colors && styles.itemsActive) ||
                      styles.items
                    }>
                    <TextView
                      color={
                        (colorSelected === colors && Colors.blueColor) ||
                        Colors.black
                      }>
                      {colors}
                    </TextView>
                  </Pressable>
                ))}
            </Row>
            <TextTitle size={20}>Size</TextTitle>
            <Row between style={styles.row}>
              {product.sizes.length &&
                product.sizes.map(size => (
                  <Pressable
                    onPress={() => hanlerSizeSelected(size)}
                    key={Math.random()}
                    style={
                      (sizeSelected === size && styles.itemsActive) ||
                      styles.items
                    }>
                    <TextView
                      color={
                        (sizeSelected === size && Colors.blueColor) ||
                        Colors.black
                      }>
                      {size}
                    </TextView>
                  </Pressable>
                ))}
            </Row>
            <Spacer height={10} />
            <Row between>
              <TextView style={{flex: 1}}>Số lượng</TextView>
              <Row
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 8,
                  backgroundColor: Colors.grayColor,
                }}>
                <Pressable
                  onPress={() => {
                    plusQuantity();
                  }}
                  style={[
                    styles.icon,
                    {
                      borderBottomLeftRadius: 8,
                      borderTopLeftRadius: 8,
                      borderEndWidth: 1,
                    },
                  ]}>
                  <Ionicons name="add" size={24} color="gray" />
                </Pressable>
                <TextView style={styles.quantity}>{quantity}</TextView>
                <Pressable
                  onPress={() => {
                    minusQuantity();
                  }}
                  style={[
                    styles.icon,
                    {
                      borderStartWidth: 1,
                      borderBottomRightRadius: 8,
                      borderTopRightRadius: 8,
                    },
                  ]}>
                  <Ionicons name="remove" size={24} color="gray" />
                </Pressable>
              </Row>
            </Row>
            <Spacer height={20} />
            <TouchableOpacity
              style={styles.cartButton2}
              onPress={event => {
                // event.persist();
                // setSheetVisible(true);
                hanlerAddCart();
              }}>
              <Ionicons name="cart-outline" size={24} color="#fff" />
              <Spacer width={10} />
              <Text style={styles.cartButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </Container>
        </BottomSheetDialog>
      </View>
    </GestureHandlerRootView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
    borderColor: 'gray',
    backgroundColor: Colors.grayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    width: '30%',
    backgroundColor: Colors.grayColor,
    marginHorizontal: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
  },
  itemsActive: {
    width: '30%',
    backgroundColor: Colors.white,
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.blueColor,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
  },
  cartButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 15,
    alignItems: 'center',
  },
  textBtn: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexWrap: 'wrap',
  },
  cartButton: {
    backgroundColor: Colors.blueColor,
    padding: 15,
    borderRadius: 5,
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton2: {
    backgroundColor: Colors.blueColor,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    width: 40,
    textAlign: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
