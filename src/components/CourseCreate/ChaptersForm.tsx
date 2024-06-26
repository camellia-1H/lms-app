import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import Loader from '../Loader';
import { ChaptersList } from './ChapterList';
import {
  useCreateCourseChapterMutation,
  useDeleteCourseChapterMutation,
  useReorderPositionChapterOfCourseMutation,
} from '../../redux/coursesApi';
import { useNavigate } from 'react-router-dom';
import { CourseChapter } from '../../models/CourseChapter';
import { COURSE_STATUS, ROLE_USER } from '../../constants/common';
import { RootState, useSelector } from '../../redux/store';

interface ChaptersFormProps {
  initialData: CourseChapter[];
  courseID: string;
  courseData: any;
}

export const ChaptersForm = ({
  initialData,
  courseID,
  courseData,
}: ChaptersFormProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const [createCourseChapter, { isSuccess, isError, error, isLoading }] =
    useCreateCourseChapterMutation();

  const [reorderPositionChapterOfCourse] =
    useReorderPositionChapterOfCourseMutation();

  const [deleteCourseChapter, { isLoading: isDeleteChapterLoading }] =
    useDeleteCourseChapterMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/courses/create/chapter', {
        state: {
          courseID: courseID,
        },
      });
    }
    if (isError) {
      console.log((error as any).data);
    }
  }, [isLoading]);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const handleCreateChapterCourse = async () => {
    try {
      await createCourseChapter({
        courseID: courseID,
        position: initialData.length ? initialData.length : 0,
        userID: courseData.userID,
      }).unwrap();
      toast.success('Chapter created');
      toggleCreating();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const onReorder = async (
    updateData: { chapterID: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true);

      await reorderPositionChapterOfCourse({
        courseID: courseID,
        bulkUpdateData: updateData,
      });
      toast.success('Chapters reordered');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (chapterID: string) => {
    // chuyển đến nhưng page kia khi vừa vào phải fetch lấy current chapterid từ store
    navigate(`/courses/${courseID}/chapter/${chapterID}/draft`);
  };

  const onDeleteChapter = async (chapterID: string) => {
    try {
      await deleteCourseChapter({
        courseID: courseID,
        chapterID: chapterID,
        userID: courseData.userID,
      }).unwrap();
      toast.success('Chapter deleted');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {(isUpdating || isLoading || isDeleteChapterLoading) && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <button onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4 mr-2" />
              Add a Chapter
            </>
          )}
        </button>
      </div>
      {isCreating && (
        <button
          disabled={
            isLoading ||
            ((user.role as string).startsWith(ROLE_USER.RGV) &&
              courseData.courseStatus === COURSE_STATUS.PUBLIC)
          }
          onClick={handleCreateChapterCourse}
          type="submit"
          className={[
            'mt-3 px-3 py-2 rounded-lg text-white font-bold ',
            isLoading ||
            ((user.role as string).startsWith(ROLE_USER.RGV) &&
              courseData.courseStatus === COURSE_STATUS.PUBLIC)
              ? 'bg-gray-500'
              : 'hover:bg-black bg-blue-500 ',
          ].join('')}
        >
          Create
        </button>
      )}
      {!isCreating && (
        <div
          className={[
            'text-sm mt-2',
            !initialData.length && 'text-slate-500 italic',
          ].join()}
        >
          {!initialData.length && 'No chapters'}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            onDeleteChapter={onDeleteChapter}
            listChapters={initialData}
            courseData={courseData}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};
