import { lazy } from 'react';
import { config } from '../config';

// Layouts
// import { HeaderOnly } from "~/layouts";

// Pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Profile = lazy(() => import('../pages/Profile'));
const Courses = lazy(() => import('../pages/Courses'));
const CourseDraft = lazy(() => import('../pages/CourseDraft'));
const CourseChapterDraft = lazy(() => import('../pages/CourseChapterDraft'));
const CourseDetail = lazy(() => import('../pages/CourseDetail'));
const CourseVideoDetail = lazy(() => import('../pages/CourseVideoDetail'));
const Members = lazy(() => import('../pages/Members'));
const MemberDetail = lazy(() => import('../pages/MemberDetail'));
const RegisterMember = lazy(() => import('../pages/RegisterMember'));
const About = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
  { path: config.routes.courses, component: Courses },
  { path: config.routes.course, component: CourseDetail },
  { path: config.routes.members, component: Members },
  { path: config.routes.member, component: MemberDetail },
  { path: config.routes.registerMember, component: RegisterMember },
  { path: config.routes.about_us, component: About },
  { path: '*', component: NotFound },
];

const privateRoutes = [
  { path: config.routes.profile, component: Profile },
  { path: config.routes.courseVideo, component: CourseVideoDetail },
  { path: config.routes.courseDraft, component: CourseDraft },
  { path: config.routes.courseCreate, component: CourseDraft },
  { path: config.routes.courseChapterCreate, component: CourseChapterDraft },
  { path: config.routes.courseChapterDraft, component: CourseChapterDraft },
];

export { publicRoutes, privateRoutes };
