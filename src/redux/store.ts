import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import courseReducer from './courseReducer';
import { utilsApi } from './utilsApi';
import { coursesApi } from './coursesApi';
import { userApi } from './userApi';
import userReducer from './userReducer';
import { orderApi } from './orderApi';
import { adminApi } from './adminApi';

const reducers = combineReducers({
  user: userReducer,
  course: courseReducer,
  [coursesApi.reducerPath]: coursesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [utilsApi.reducerPath]: utilsApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
});

const expireReducer = (reducerKey: string, expirationKey: string) => ({
  in: (state: any) => {
    // console.log(state);
    console.log(reducerKey);
    return {
      ...state,
      [expirationKey]: new Date(state.token[expirationKey]).getTime(), // Chuyển đổi thời gian hết hạn thành milliseconds
    };
  },
  out: (state: any) => {
    // console.log(state);
    const now = new Date().getTime() / 1000;
    if (now > state.token[expirationKey]) {
      // Nếu thời gian hiện tại vượt qua thời gian hết hạn, trả về initialState
      return {
        user: {},
        token: {
          accessToken: '',
          accessTokenExpiresAt: 0,
        },
      };
    }
    return state;
  },
});

const createTokenExpirationTransform = (expirationKey: string) => {
  return createTransform(
    // Transform state từ Redux Store vào Redux Persist
    (inboundState, key) => {
      // Chỉ áp dụng transform cho reducer 'user'
      if (key === 'user') {
        return expireReducer(key, expirationKey).in(inboundState);
      }
      return inboundState;
    },
    // Transform state từ Redux Persist vào Redux Store
    (outboundState, key) => {
      // Chỉ áp dụng transform cho reducer 'user'
      if (key === 'user') {
        return expireReducer(key, expirationKey).out(outboundState);
      }
      return outboundState;
    }
  );
};

const tokenExpirationTransform: any = createTokenExpirationTransform(
  'accessTokenExpiresAt'
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  whitelist: ['user'],
  transforms: [tokenExpirationTransform],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<any>(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(utilsApi.middleware)
      .concat(coursesApi.middleware)
      .concat(userApi.middleware)
      .concat(orderApi.middleware)
      .concat(adminApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
