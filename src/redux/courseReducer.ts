import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCourseID: '',
  currentCourseChapterID: '',
};

const courseReducer = createSlice({
  name: 'courseReducer',
  initialState,
  reducers: {
    createCourse: (state, action) => {
      state.currentCourseID = action.payload;
    },
    createCourseChapter: (state, action) => {
      state.currentCourseChapterID = action.payload;
    },
  },
});

export const { createCourse, createCourseChapter } = courseReducer.actions;
export default courseReducer.reducer;
