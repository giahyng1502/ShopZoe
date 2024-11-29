import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../reducer/productReducer';
import cartReducer from '../reducer/cartReducer';
import userReducer from '../reducer/userReducer';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    userState: userReducer,
  },
});

export default store;
