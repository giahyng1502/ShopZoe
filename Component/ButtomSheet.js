import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Container, Row, Spacer} from './Box';
import {TextTitle, TextView} from './TextView';
import Colors from '../Style/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FetchApi, {token} from '../API/FetchApi';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/reducer/cartReducer';

const BottomSheet = ({isVisible, onClose, children, product}) => {
  const modalRef = useRef(null);
  const [sizeSelected, setSizeSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  function setData() {
    setSizeSelected(product.size);
    setColorSelected(product.color);
    setQuantity(product.quantity);
  }

  function hanlerSizeSelected(size) {
    setSizeSelected(size);
  }

  function hanlerColorSelected(size) {
    setColorSelected(size);
  }

  async function hanlerUpdateCart(id) {
    if (!sizeSelected || !colorSelected) {
      return;
    }
    const response = await FetchApi(
      'cart/updateCart/' + id,
      'PUT',
      {
        productId: product.item._id,
        size: sizeSelected,
        color: colorSelected,
        quantity: quantity,
      },
      token,
    );
    if (response.status === 200) {
      const data = await response.json();
      dispatch(addToCart(data));
      closeBottomSheet();
      alert('Thêm vào gio hàng thành công');
    } else if (response.status === 409) {
      alert('Sản phẩm đã đạt giới hạn mua sắm');
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

  // Mở Bottom Sheet khi có yêu cầu
  const openBottomSheet = () => {
    modalRef.current?.open();
  };

  // Đóng Bottom Sheet và gọi callback onClose nếu có
  const closeBottomSheet = () => {
    modalRef.current?.close();
  };

  // Hiển thị Bottom Sheet nếu isVisible thay đổi
  useEffect(() => {
    if (isVisible) {
      setData();
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [isVisible]); // Chạy lại mỗi khi isVisible thay đổi

  // Gọi onClose khi Bottom Sheet đóng hoàn tất
  const handleClosed = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modalize
      ref={modalRef}
      snapPoint={400} // Độ cao Bottom Sheet khi mở
      adjustToContentHeight={true}
      handlePosition="inside" // Vị trí thanh điều khiển (Handle)
      onClosed={handleClosed} // Gọi callback khi đóng Bottom Sheet
    >
      <View style={styles.contentContainer}>
        {product && isVisible && (
          <Container style={{backgroundColor: Colors.white}}>
            <Row>
              <Image
                source={{uri: product.item.image[0]}}
                style={{width: '50%', height: 150, borderRadius: 16}}
                resizeMode="cover"
              />
              <View style={{width: '50%', paddingHorizontal: 20}}>
                <TextTitle size={18} color={Colors.blueColor}>
                  {product.item.price} VND
                </TextTitle>
              </View>
            </Row>
            <Spacer height={20} />
            <TextTitle size={20}>Màu sắc</TextTitle>
            <Row between style={styles.row}>
              {product.item.colors.length &&
                product.item.colors.map(colors => (
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
              {product.item.sizes.length &&
                product.item.sizes.map(size => (
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
                hanlerUpdateCart(product._id);
              }}>
              <Spacer width={10} />
              <Text style={styles.cartButtonText}>Xác Nhận</Text>
            </TouchableOpacity>
          </Container>
        )}
      </View>
    </Modalize>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
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
