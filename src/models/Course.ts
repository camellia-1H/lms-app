import { CourseChapter } from './CourseChapter';

export interface Course {
  courseID: string;
  userID: string;
  title: string;
  description: string;
  descriptionDetail: string;
  imageUrl: string;
  price: number;
  isPublished: boolean;

  level: string;
  totalChapters: number;
  // 0 : create, 1 : pending request publish , 2: course published
  courseStatus: number;
  totalStudents: number;
  totalReviews: number;
  totalTime: number;
  totalRate: number;
  authorName: string;

  category: string[];
  chapters: CourseChapter[];
  createdAt: string;
  updatedAt: string;
}
