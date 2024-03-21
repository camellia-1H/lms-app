export const routes = {
  home: "/",
  profile: "/:userid",
  profileLink: (userid: string) => `/@${userid}`,
  upload: "/upload",
  search: "/search",
  login: "/login",
  register: "/register",
  post: "/:userid/post/:postid",
  postLink: (userid: string, postid: string) => `/@${userid}/post/${postid}`,
  ///
  members: "/members",
  member: "/members/:member_id", // role giao vien
  memberLink: (member_id: string) => `/members/${member_id}`,
  registerMember: "/register-member",
  courses: "/courses",
  courseCreate: "/courses/create",
  course: "/courses/:course_id",
  courseLink: (course_id: string) => `/courses/${course_id}`,
  courseVideo: "/courses/:course_id/:course_video_id",
  courseVideoLink: (course_id: string, course_video_id: string) =>
    `/courses/${course_id}/${course_video_id}`,
};
