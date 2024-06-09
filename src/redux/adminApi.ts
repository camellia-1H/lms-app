import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { setUser } from './userReducer';
import { RootState } from './store';

export const adminApi = createApi({
  reducerPath: 'adminApi', // ten field trong redux state
  baseQuery: customFetchBase,
  endpoints: (build) => ({
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

    manageRequestTeacherAdmin: build.mutation({
      query: (data) => ({
        url: `/admin/manage-update-role-teacher`,
        method: 'POST',
        body: data,
      }),
    }),

    getListCourse: build.query({
      query: () => ({
        url: `admin/get-list-courses`,
        method: 'GET',
      }),
    }),
    getListUser: build.query({
      query: () => ({
        url: `/admin/get-list-user`,
        method: 'GET',
      }),
    }),
    getListTeacher: build.query({
      query: () => ({
        url: `/admin/get-list-teacher`,
        method: 'GET',
      }),
    }),
    getListPaymentPackage: build.query({
      query: () => ({
        url: `/admin/get-list-payment-package`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUserInfoMutation,
  useManageRequestTeacherAdminMutation,
  //GET
  useGetListCourseQuery,
  useGetListTeacherQuery,
  useGetListUserQuery,
  useGetListPaymentPackageQuery,
} = adminApi;
