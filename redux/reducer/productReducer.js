import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fetchApi from '../../API/FetchApi';

const productReducer = createSlice({
  name: 'product',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.message;
      });
  },
});

export const getAllProducts = createAsyncThunk('product/getAll', async () => {
  const res = await fetchApi('product/getAll');
  const data = await res.json();
  return data;
});

export default productReducer.reducer;
