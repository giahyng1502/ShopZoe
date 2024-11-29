import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Column, Container, Row, Spacer} from '../Component/Box';
import Header from '../Component/Header';
import {TextTitle, TextView} from '../Component/TextView';
import Colors from '../Style/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import BottomSheet from '../Component/ButtomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCart, remove} from '../redux/reducer/cartReducer';
import FetchApi, {token} from '../API/FetchApi';
import AppLoading from '../Component/AppLoading';

const CartScreen = ({navigation}) => {
  // const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const dispatch = useDispatch();
  const {items, isLoading, error} = useSelector(state => state.cart);
  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);
  const removeFromCart = async (id, productId) => {
    const response = await FetchApi(
      'cart/updateCart/' + id,
      'PUT',
      {
        quantity: 0,
        productId: productId,
      },
      token,
    );
    if (response.status === 200) {
      dispatch(remove(id));
    }
  };
  const renderRightActions = item => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFromCart(item._id, item.item._id)}>
        <TextView style={styles.deleteButtonText}>Xóa</TextView>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item}) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item)}>
        <Row style={styles.item}>
          <Image
            source={{uri: item.item.image[0]}}
            resizeMode={'cover'}
            style={{width: '40%', height: 150, borderRadius: 16}}
          />
          <Spacer width={15} />
          <Column>
            <TextTitle size={22}>{item.item.name}</TextTitle>
            <Spacer height={5} />
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setVisible(true);
                setSelectedProduct(item);
              }}>
              <TextView>
                {item.color}, {item.size}
                <Spacer width={5} />
                <Ionicons name="chevron-down" size={16} color={'gray'} />
              </TextView>
            </TouchableOpacity>
            <Spacer height={5} />
            <TextView size={18}>{item.item.price} VND</TextView>
            <TextView size={18}>Số lượng: {item.quantity}</TextView>
          </Column>
        </Row>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {isLoading && <AppLoading />}
      {error && <TextTitle size={18}>{error}</TextTitle>}
      <View style={{flex: 1}}>
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
            data={items.items}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
          />
          <Row style={styles.boxPaypal} between>
            <Column>
              <TextView size={20}>Tổng tiền</TextView>
              <TextTitle size={20} color={Colors.blueColor}>
                {items.totalPrice} VND
              </TextTitle>
            </Column>
            <TouchableOpacity style={styles.box} activeOpacity={0.5}>
              <TextView size={18} color={Colors.white} style={styles.letter}>
                Thanh toán ({items.totalPrice > 0 ? items.items.length : 0})
              </TextView>
            </TouchableOpacity>
          </Row>
        </Container>
      </View>
      <BottomSheet
        isVisible={visible}
        product={selectedProduct}
        onClose={() => setVisible(false)}
      />
    </GestureHandlerRootView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  item: {
    justifyContent: 'flex-start',
    marginBottom: 10,
    backgroundColor: Colors.white,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 16,
    shadowRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  letter: {
    letterSpacing: 1.5,
  },
  boxPaypal: {
    elevation: 8,
    width: '100%',
    height: 100,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    shadowColor: '#000',
  },
  box: {
    backgroundColor: Colors.blueColor,
    borderRadius: 5,
    padding: 15,
  },
  deleteButton: {
    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 20,
  },
  optionButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    backgroundColor: Colors.grayColor,
    borderRadius: 5,
  },
});
