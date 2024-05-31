import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { setUser } from './userReducer';

export const userApi = createApi({
  reducerPath: 'userApi', // ten field trong redux state
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    login: build.mutation({
      query: () => ({
        url: `/user/login`,
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          dispatch(setUser(data.user));
        } catch (error) {}
      },
    }),

    register: build.mutation({
      query: (data) => ({
        url: `/user/register`,
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmail: build.mutation({
      query: (data) => ({
        url: `/user/verify-email`,
        method: 'POST',
        body: data,
      }),
    }),

    resendConfirmCode: build.mutation({
      query: (data) => ({
        url: `/user/resend-confirm-code`,
        method: 'POST',
        body: data,
      }),
    }),

    getUserInfo: build.mutation({
      query: (data) => ({
        url: `/user/get-user-info`,
        method: 'POST',
        body: data,
      }),
    }),

    manageRequestTeacher: build.mutation({
      query: (data) => ({
        url: `/user/request-teacher`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendConfirmCodeMutation,
  useGetUserInfoMutation,
  useManageRequestTeacherMutation,
} = userApi;
