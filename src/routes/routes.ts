import { lazy } from 'react';
import { config } from '../config';

// Layouts
// import { HeaderOnly } from "~/layouts";

// Pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const VerifyEmail = lazy(() => import('../pages/VerifyEmail'));
const ForgotPass = lazy(() => import('../pages/ForgotPass'));
const ForgotChangePassword = lazy(
  () => import('../pages/ForgotChangePassword')
);
const ChangePassword = lazy(() => import('../pages/ChangePassword'));
const Profile = lazy(() => import('../pages/Profile'));
const ProfileFrontPage = lazy(() => import('../pages/ProfileFront'));
const Courses = lazy(() => import('../pages/Courses'));
const CourseDraft = lazy(() => import('../pages/CourseDraft'));
const CourseChapterDraft = lazy(() => import('../pages/CourseChapterDraft'));
const CourseDetail = lazy(() => import('../pages/CourseDetail'));
const CourseChapterDetail = lazy(() => import('../pages/CourseChapterDetail'));
const Members = lazy(() => import('../pages/Members'));
const MemberDetail = lazy(() => import('../pages/MemberDetail'));
const RegisterMember = lazy(() => import('../pages/RegisterMember'));
const About = lazy(() => import('../pages/About'));
const Order = lazy(() => import('../pages/Order'));
const Payment = lazy(() => import('../pages/Payment'));
const OrderResult = lazy(() => import('../pages/OrderResult'));
const NotFound = lazy(() => import('../pages/NotFound'));
const StudentDashboard = lazy(() => import('../pages/StudentDashboard'));
const StudentProfileDashPage = lazy(
  () => import('../pages/dashboard/student/StudentProfile')
);
const StudentCoursesDashPage = lazy(
  () => import('../pages/dashboard/student/StudentCourse')
);
const StudentStatsDashPage = lazy(
  () => import('../pages/dashboard/student/StudentStats')
);
///
const TeacherDashboard = lazy(() => import('../pages/TeacherDashboard'));
const TeacherProfileDashPage = lazy(
  () => import('../pages/dashboard/teacher/TeacherProfile')
);
const TeacherCoursesDashPage = lazy(
  () => import('../pages/dashboard/teacher/TeacherCourse')
);
const TeacherReviewsDashPage = lazy(
  () => import('../pages/dashboard/teacher/TeacherReviews')
);
const TeacherStatsDashPage = lazy(
  () => import('../pages/dashboard/teacher/TeacherStats')
);
// admin
const AdminUserDashPage = lazy(
  () => import('../pages/dashboard/admin/AdminUser')
);

const AdminStudentProfile = lazy(
  () => import('../pages/dashboard/admin/AdminStudentProfile')
);
const AdminTeacherProfile = lazy(
  () => import('../pages/dashboard/admin/AdminTeacherProfile')
);
const AdminStatsDashPage = lazy(
  () => import('../pages/dashboard/admin/AdminStats')
);
// const StudentCourse = lazy(() => import('../pages/StudentCourse'));

// Public routes
const publicRoutes = [
  // { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
  { path: config.routes.verify, component: VerifyEmail },
  { path: config.routes.forgot, component: ForgotPass },
  { path: config.routes.forgotChangPass, component: ForgotChangePassword },
  { path: config.routes.courses, component: Courses },
  { path: config.routes.course, component: CourseDetail },
  { path: config.routes.members, component: Members },
  { path: config.routes.member, component: MemberDetail },
  { path: config.routes.registerMember, component: RegisterMember },
  { path: config.routes.about_us, component: About },
  { path: '*', component: NotFound, mainOnly: true },
  { path: config.routes.payment, component: Payment },
  { path: config.routes.order, component: Order },
  { path: config.routes.home, component: Home },
  { path: config.routes.profile, component: ProfileFrontPage },
];

const privateRoutes = [
  // { path: config.routes.profile, component: Profile },
  { path: config.routes.changePassword, component: ChangePassword },
  {
    path: config.routes.courseVideo,
    component: CourseChapterDetail,
    mainOnly: true,
  },
  { path: config.routes.courseDraft, component: CourseDraft },
  { path: config.routes.courseCreate, component: CourseDraft },
  { path: config.routes.courseChapterCreate, component: CourseChapterDraft },
  { path: config.routes.courseChapterDraft, component: CourseChapterDraft },
  // { path: config.routes.student_dashboard, component: Sidebar, mainOnly: true},
  {
    path: config.routes.dashStudent,
    component: StudentDashboard,
    mainSidebarOnly: true,
  },
  // {
  //   path: config.routes.student_course,
  //   component: StudentCourse,
  //   mainSidebarOnly: true,
  // },

  {
    path: config.routes.profileDashStudent,
    component: StudentProfileDashPage,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.coursesDashStudent,
    component: StudentCoursesDashPage,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.statsDashStudent,
    component: StudentStatsDashPage,
    mainSidebarOnly: true,
  },
  // {
  //   path: config.routes.coursesDashStudent,
  //   component: StudentCoursesDashPage,
  //   mainSidebarOnly: true,
  // },
  {
    path: config.routes.dashTeacher,
    component: TeacherDashboard,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.profileDashTeacher,
    component: TeacherProfileDashPage,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.coursesDashTeacher,
    component: TeacherCoursesDashPage,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.reviewsDashTeacher,
    component: TeacherReviewsDashPage,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.statsDashTeacher,
    component: TeacherStatsDashPage,
    mainSidebarOnly: true,
  },
  // admin
  {
    path: config.routes.userDashAdmin,
    component: AdminUserDashPage,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.adminStudentProfile,
    component: AdminStudentProfile,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.adminTeacherProfile,
    component: AdminTeacherProfile,
    mainSidebarOnly: true,
  },
  {
    path: config.routes.statsDashAdmin,
    component: AdminStatsDashPage,
    mainSidebarOnly: true,
  },

  /// payment
  { path: config.routes.result, component: OrderResult, mainOnly: true },
];

export { publicRoutes, privateRoutes };
