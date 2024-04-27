import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
// import { logOut, refreshToken } from './userReducer';
// import { RootState } from './store';

const baseUrl = 'https://a50crcnry3.execute-api.us-east-1.amazonaws.com/Dev';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, { getState }) => {
    // const accessToken = (getState() as RootState).user.user.accessToken;
    // if (accessToken) {
    headers.set('authorization', `Bearer 1`);
    // }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);

  if (
    (result.error?.status as any) === 401 ||
    (result.error?.status as any) === 403
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // const refreshResult: any = await baseQuery(
        //   { credentials: 'include', url: 'auth/refresh', method: 'POST' },
        //   api,
        //   extraOptions
        // );
        // console.log(refreshResult.data);
        // if (refreshResult.data) {
        //   // Retry the initial query, pin new accessToken to redux and query
        //   api.dispatch(refreshToken(refreshResult.data.accessToken)),
        //     (result = await baseQuery(args, api, extraOptions));
        // } else {
        //   api.dispatch(logOut());
        //   window.location.href = '/login';
        // }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
