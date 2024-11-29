import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import FetchApi, {token} from '../../API/FetchApi';

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateInforUser: (state, action) => {
      state.user = {...state.data, ...action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
    });
    builder.addCase(updateUser.pending, state => {
      state.userLoading = true;
    });
  },
});

export const getUser = createAsyncThunk('user/getUser', async () => {
  // lay token
  try {
    const res = await FetchApi('user/getUser', 'GET', null, token);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Get user failed');
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async data => {
  try {
    const res = await FetchApi('user/updateUser', 'PUT', data, token);
    const dataUpdated = await res.json();
    return dataUpdated;
  } catch (error) {
    throw new Error('Update user failed');
  }
});
const {setUser, updateInforUser} = userReducer.actions;
export default userReducer.reducer;
