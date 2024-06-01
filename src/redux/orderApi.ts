import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const orderApi = createApi({
  reducerPath: 'orderApi', // ten field trong redux state
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    createPaymentLink: build.mutation({
      query: (data) => ({
        url: `/order/create`,
        method: 'POST',
        body: data,
      }),
    }),
    // getListBank: build.mutation({
    //   query: (data) => ({
    //     url: `/order/request-teacher`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    getOrder: build.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: 'GET',
      }),
    }),
    cancelOrder: build.mutation({
      query: ({ cancellationReason, orderId }) => ({
        url: `/order/${orderId}`,
        method: 'POST',
        body: { cancellationReason },
      }),
    }),
  }),
});

export const {
  useCreatePaymentLinkMutation,
  useGetOrderQuery,
  useCancelOrderMutation,
} = orderApi;
