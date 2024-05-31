export const routes = {
  home: '/',
  profile: '/:userid',
  profileLink: (userid: string) => `/@${userid}`,
  upload: '/upload',
  search: '/search',
  login: '/login',
  register: '/register',
  post: '/:userid/post/:postid',
  postLink: (userid: string, postid: string) => `/@${userid}/post/${postid}`,
  ///
  members: '/members',
  member: '/members/:member_id', // role giao vien
  memberLink: (member_id: string) => `/members/${member_id}`,
  registerMember: '/register-member',
  courses: '/courses',
  courseCreate: '/courses/create',
  courseChapterCreate: '/courses/create/chapter',

  course: '/courses/:courseID',
  courseLink: (courseID: string) => `/courses/${courseID}/`,
  courseDraft: `/courses/:courseID/draft`,
  courseDraftLink: (courseID: string) => `/courses/${courseID}/draft`,
  courseVideo: '/courses/:courseID/chapter/:chapterID',
  courseVideoLink: (courseID: string, chapterID: string) =>
    `/courses/${courseID}/chapter/${chapterID}`,
  courseChapterDraft: `/courses/:courseID/chapter/:chapterID/draft`,
  courseChapterDraftLink: (courseID: string, chapterID: string) =>
    `/courses/${courseID}/chapter/${chapterID}/draft`,

  ///
  about_us: '/about_us',
  /// Sidebar Student
  student_dashboard2: '/dashboard/student',
  student_course: '/dashboard/student/course',
  teacher_dashboard: '/dashboard/teacher',
};
