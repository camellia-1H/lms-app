import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { createCourse, createCourseChapter } from './courseReducer';
import { Course } from '../models/Course';
import { CourseChapter } from '../models/CourseChapter';

export const coursesApi = createApi({
  reducerPath: 'coursesApi', // ten field trong redux state
  baseQuery: customFetchBase,
  tagTypes: ['updateCourse'],
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    getListCourses: build.query<Course[], string>({
      query: (userID) => ({
        url: `/courses?userID=${userID}`,
        method: 'GET',
      }),
    }),

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

    getCourseDetail: build.query<Course, any>({
      query: ({ courseID, userID }) => ({
        url: `/courses/${courseID}?userID=${userID}`,
        method: 'GET',
      }),
    }),

    updateCourse: build.mutation({
      query: ({ userID, courseID, ...data }) => ({
        url: `/courses/${courseID}?userID=${userID}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['updateCourse'],
    }),

    getListCourseChapters: build.query({
      query: (courseID: string) => ({
        url: `/courses/${courseID}/get-list-chapters`,
        method: 'GET',
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

    createCourseChapterVideo: build.mutation({
      query: ({ courseID, chapterID, ...data }) => ({
        url: `/courses/${courseID}/chapter/${chapterID}/video`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetListCoursesQuery,
  useCreateCourseMutation,
  useGetCourseDetailQuery,
  useUpdateCourseMutation,
  useGetListCourseChaptersQuery,
  useCreateCourseChapterMutation,
  useGetCourseChapterDetailQuery,
  useUpdateCourseChapterMutation,
  useCreateCourseChapterVideoMutation,
} = coursesApi;
