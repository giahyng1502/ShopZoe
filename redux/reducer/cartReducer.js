import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import FetchApi, {token} from '../../API/FetchApi';

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    remove: (state, action) => {
      // Lọc các mục không trùng với id được truyền
      const newItems = state.items.items.filter(
        item => item._id !== action.payload,
      );

      // Tính toán lại totalPrice
      const newTotalPrice = newItems.reduce((total, item) => {
        return total + item.quantity * item.item.price;
      }, 0);

      // Cập nhật state
      state.items.items = newItems;
      state.items.totalPrice = newTotalPrice;
    },
    addToCart: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCart.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getAllCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.message;
      });
  },
});

export const getAllCart = createAsyncThunk('cart/getAll', async () => {
  const response = await FetchApi('cart/getAll', 'GET', null, token);
  const data = await response.json();
  return data;
});
export const {addToCart, remove, updateQuantity} = cartReducer.actions;
export default cartReducer.reducer;
