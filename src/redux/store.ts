import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import courseReducer from './courseReducer';
import { utilsApi } from './utilsApi';
import { coursesApi } from './coursesApi';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [utilsApi.reducerPath]: utilsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(utilsApi.middleware)
      .concat(coursesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
