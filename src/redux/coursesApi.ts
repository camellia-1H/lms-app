import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { createCourse, createCourseChapter } from './courseReducer';
import { Course } from '../models/Course';
import { CourseChapter } from '../models/CourseChapter';

export const coursesApi = createApi({
  reducerPath: 'coursesApi', // ten field trong redux state
  baseQuery: customFetchBase,
  tagTypes: ['updateCourse', 'updateCourseChapter', 'createRating'],
  endpoints: (build) => ({
    //query<kiểu trả về, tham số truyền vào>
    getListCourses: build.mutation({
      query: (data) => ({
        url: `/courses/get-list-course-user`,
        method: 'POST',
        body: data,
      }),
      // keepUnusedDataFor: 0,
      // providesTags: ['updateCourse'],
    }),

    scanAllCourses: build.mutation<
      any,
      {
        lastEvaluatedKey: any;
        limit?: number;
      }
    >({
      query: ({ lastEvaluatedKey, limit }) => ({
        url: `/courses`,
        method: 'POST',
        body: { lastEvaluatedKey, limit },
      }),
      invalidatesTags: ['updateCourse'],
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

    getCourseDetailAuthor: build.query<Course, any>({
      query: ({ courseID, userID }) => ({
        url: `/courses/${courseID}/get-detail?userID=${userID}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      providesTags: ['updateCourse'],
    }),

    getCourseDetailPublic: build.query({
      query: ({ courseID, userID }) => ({
        url: `/courses/${courseID}/get-detail-public?userID=${userID}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),

    updateCourse: build.mutation({
      query: ({ userID, courseID, ...data }) => ({
        url: `/courses/${courseID}?userID=${userID}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['updateCourse'],
    }),

    deleteCourse: build.mutation({
      query: ({ userID, courseID }) => ({
        url: `/courses/${courseID}?userID=${userID}`,
        method: 'DELETE',
      }),
    }),

    searchCourse: build.mutation({
      query: (searchValue) => ({
        url: `/courses/search?q=${searchValue}`,
        method: 'POST',
      }),
    }),

    searchCourseFilter: build.mutation({
      query: (searchValue) => ({
        url: `/courses/search-filter`,
        method: 'POST',
        body: searchValue,
      }),
    }),

    getListCourseChapters: build.query({
      query: ({ courseID, userID }: { courseID: string; userID?: string }) => ({
        url: userID
          ? `/courses/${courseID}/get-list-chapters?userID=${userID}`
          : `/courses/${courseID}/get-list-chapters`,
        method: 'GET',
      }),
      providesTags: ['updateCourseChapter'],
      keepUnusedDataFor: 0,
    }),

    reorderPositionChapterOfCourse: build.mutation({
      query: ({ courseID, ...data }) => ({
        url: `/courses/${courseID}/reorder-chapter`,
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
      // thêm dòng này thì mỗi khi update nó sẽ call lại api này
      // có thể xử lý thêm cho cái complete 1/5...
      providesTags: ['updateCourseChapter'],
      keepUnusedDataFor: 0,
    }),

    updateCourseChapter: build.mutation({
      query: ({ courseID, chapterID, ...data }) => ({
        url: `/courses/${courseID}/chapter/${chapterID}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['updateCourseChapter'],
    }),

    createCourseChapterVideo: build.mutation({
      query: ({ courseID, chapterID, ...data }) => ({
        url: `/courses/${courseID}/chapter/${chapterID}/video`,
        method: 'POST',
        body: data,
      }),
    }),

    deleteCourseChapter: build.mutation({
      query: ({ courseID, chapterID, userID }) => ({
        url: `/courses/${courseID}/chapter/${chapterID}`,
        method: 'DELETE',
        body: {
          userID: userID,
        },
      }),
      invalidatesTags: ['updateCourseChapter'],
    }),

    getListCategoryMaster: build.query({
      query: () => ({
        url: `/courses/get-list-category`,
        method: 'GET',
        keepUnusedDataFor: 3600,
      }),
    }),
    getListPriceMaster: build.query({
      query: () => ({
        url: `/courses/get-list-price`,
        method: 'GET',
        keepUnusedDataFor: 3600,
      }),
    }),
    getListLevelMaster: build.query({
      query: () => ({
        url: `/courses/get-list-level`,
        method: 'GET',
        keepUnusedDataFor: 3600,
      }),
    }),
    buyCourse: build.mutation({
      query: (data) => ({
        url: `/courses/buy-course`,
        method: 'POST',
        body: data,
      }),
    }),
    //    body : {userID: string;
    // courseID: string;
    // chapter: string[]}
    updateCourseProgress: build.mutation({
      query: (data) => ({
        url: `/courses/update-progress`,
        method: 'POST',
        body: data,
      }),
    }),

    ///REVIEW

    getReviewUserOfCourse: build.query({
      query: ({ userID, courseID }) => ({
        url: `/courses/get-review?courseID=${courseID}&userID=${userID}`,
        method: 'GET',
        keepUnusedDataFor: 0,
      }),
      providesTags: ['createRating'],
    }),

    getListReviewOfCourse: build.mutation({
      query: (data) => ({
        url: `/courses/get-list-review`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['createRating'],
    }),

    createRatingCourse: build.mutation({
      query: (data) => ({
        url: `/courses/create-rating`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['createRating'],
    }),

    getListCourseRecent: build.query({
      query: () => ({
        url: `/courses/get-courses-recent`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetListCoursesMutation,
  useScanAllCoursesMutation,
  useCreateCourseMutation,
  useGetCourseDetailAuthorQuery,
  useGetCourseDetailPublicQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useSearchCourseMutation,
  useSearchCourseFilterMutation,
  useGetListCourseChaptersQuery,
  useReorderPositionChapterOfCourseMutation,
  useCreateCourseChapterMutation,
  useGetCourseChapterDetailQuery,
  useUpdateCourseChapterMutation,
  useCreateCourseChapterVideoMutation,
  useDeleteCourseChapterMutation,
  useGetListCategoryMasterQuery,
  useGetListPriceMasterQuery,
  useGetListLevelMasterQuery,
  useBuyCourseMutation,
  useUpdateCourseProgressMutation,
  // rating, review
  useGetReviewUserOfCourseQuery,
  useGetListReviewOfCourseMutation,
  useCreateRatingCourseMutation,
  // list course recent
  useGetListCourseRecentQuery,
} = coursesApi;
