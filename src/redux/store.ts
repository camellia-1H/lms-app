import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import courseReducer from './courseReducer';
import { utilsApi } from './utilsApi';
import { coursesApi } from './coursesApi';
import { userApi } from './userApi';
import userReducer from './userReducer';
import { orderApi } from './orderApi';

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [utilsApi.reducerPath]: utilsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(utilsApi.middleware)
      .concat(coursesApi.middleware)
      .concat(userApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
