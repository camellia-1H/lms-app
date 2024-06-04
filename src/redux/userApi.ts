import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { setUser } from './userReducer';
import { RootState } from './store';

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
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        const user = (getState() as unknown as RootState).user.user;
        console.log('user', user);

        const { data } = await queryFulfilled;
        console.log(data);
        if (
          user.role === data.userInfo.role &&
          user.userID === data.userInfo.userID
        ) {
          dispatch(setUser(data.userInfo));
        }
      },
    }),

    manageRequestTeacher: build.mutation({
      query: (data) => ({
        url: `/user/request-teacher`,
        method: 'POST',
        body: data,
      }),
    }),
    // student
    getListCoursesProgress: build.query({
      query: (userID) => ({
        url: `/user/${userID}/get-list-progress`,
        method: 'GET',
      }),
    }),
    // teacher
    getListReviews: build.query({
      query: (userID) => ({
        url: `/user/${userID}/get-list-reviews`,
        method: 'GET',
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
  //GET
  useGetListCoursesProgressQuery,
  useGetListReviewsQuery,
} = userApi;
