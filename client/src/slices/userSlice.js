

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from "../../utils/http";

// Thunk to fetch data from Node.js backend
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await http.get('/api/user');
  return response.data[0];
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
export default userSlice.reducer;