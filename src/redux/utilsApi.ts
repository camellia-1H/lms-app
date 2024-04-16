import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const utilsApi = createApi({
  reducerPath: 'utilsApi', // ten field trong redux state
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    uploadS3Video: build.mutation({
      query: (data) => ({
        url: '/s3/upload-video',
        method: 'POST',
        body: data,
      }),
    }),
    uploadS3Image: build.mutation({
      query: (data) => ({
        url: '/s3/upload-image',
        method: 'POST',
        body: data,
      }),
    }),
    generateAuthenticatedMuxURL: build.mutation({
      query: () => ({
        url: '/mux/generate',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useUploadS3VideoMutation,
  useUploadS3ImageMutation,
  useGenerateAuthenticatedMuxURLMutation,
} = utilsApi;
