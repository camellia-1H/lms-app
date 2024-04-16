import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { createCourse, createCourseChapter } from './courseReducer';
import { Course } from '../models/Course';
import { CourseChapter } from '../models/CourseChapter';

export const coursesApi = createApi({
  reducerPath: 'coursesApi', // ten field trong redux state
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    createCourse: build.mutation({
      query: (data) => ({
        url: '/courses/create',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(createCourse(data));
        } catch (error) {}
      },
    }),
    getCourseDetail: build.query<Course, string>({
      query: (courseID: string) => ({
        url: `/courses/${courseID}`,
        method: 'GET',
      }),
    }),

    updateCourse: build.mutation({
      query: ({ courseID, ...data }) => ({
        url: `/courses/${courseID}`,
        method: 'POST',
        body: data,
      }),
    }),

    createCourseChapter: build.mutation({
      query: (data) => ({
        url: '/courses/create/chapter',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(createCourseChapter(data));
        } catch (error) {}
      },
    }),
    getCourseChapterDetail: build.query<CourseChapter, any>({
      query: ({ courseID, chapterID }) => ({
        url: `/courses/${courseID}/chapter/${chapterID}`,
        method: 'GET',
      }),
    }),
    updateCourseChapter: build.mutation({
      query: ({ courseID, chapterID, ...data }) => ({
        url: `/courses/${courseID}/chapter/${chapterID}`,
        method: 'POST',
        body: data,
      }),
    }),
    createCourseChapterVideo: build.mutation<string, any>({
      query: ({ courseID, chapterID, ...data }) => ({
        url: `/courses/${courseID}/chapter/${chapterID}/video`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCourseDetailQuery,
  useUpdateCourseMutation,
  useCreateCourseChapterMutation,
  useGetCourseChapterDetailQuery,
  useUpdateCourseChapterMutation,
  useCreateCourseChapterVideoMutation,
} = coursesApi;
