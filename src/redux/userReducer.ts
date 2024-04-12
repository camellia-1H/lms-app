import { createSlice } from '@reduxjs/toolkit';

import { User } from '../models/User';

const initialState = {
  user: { userID: 'userID1' } as User,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => initialState,
    userLogin: (state, action) => {
      state.user = action.payload;
    },
    refreshToken: (state, action) => {
      state.user.accessToken = action.payload;
    },
  },
});

export const { logOut, userLogin, refreshToken } = userSlice.actions;
export default userSlice.reducer;
