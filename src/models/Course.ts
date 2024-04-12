import { CourseChapter } from './CourseChapter';

export interface Course {
  courseID: string;
  userID: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  isPublished: boolean;

  category: string[];
  chapters: CourseChapter[];
  createdAt: string;
  updatedAt: string;
}
