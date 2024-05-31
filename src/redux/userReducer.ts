import { createSlice } from '@reduxjs/toolkit';
import { User } from '../models/User';

const initialState = {
  user: {} as User,
  token: {
    accessToken: '',
    accessTokenExpiresAt: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.token = action.payload;
    },
    // refreshToken: (state, action) => {
    //   state.user.accessToken = action.payload;
    // },
  },
});

export const { logOut, setUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
