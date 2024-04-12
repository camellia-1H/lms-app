import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Course } from '../../models/Course';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ChaptersList } from './ChapterList';
import { useCreateCourseChapterMutation } from '../../redux/coursesApi';
import { useNavigate } from 'react-router-dom';

interface ChaptersFormProps {
  initialData: Course;
  courseID: string;
}

export const ChaptersForm = ({ initialData, courseID }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const [createCourseChapter, { isSuccess, isError, error, isLoading }] =
    useCreateCourseChapterMutation();

  useEffect(() => {
    toast.loading('Create chapter... Please wait');
    if (isSuccess) {
      navigate('/courses/create/chapter');
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
      createCourseChapter({ courseID });
      toast.success('Chapter created');
      toggleCreating();
      // router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const onReorder = async (
    updateData: { chapterID: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseID}/chapters/reorder`, {
        list: updateData,
      });
      toast.success('Chapters reordered');
      // router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (chapterID: string) => {
    // chuyển đến nhưng page kia khi vừa vào phải fetch lấy current chapterid từ store
    navigate('/courses/create/chapter');
    // router.push(`/teacher/courses/${courseID}/chapters/${chapterID}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <button onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4 mr-2" />
              Add an Chapter
            </>
          )}
        </button>
      </div>
      {isCreating && (
        <button
          disabled={isLoading}
          onClick={handleCreateChapterCourse}
          type="submit"
          className="mt-3 px-3 py-2 rounded-lg text-white font-bold hover:bg-black bg-blue-500"
        >
          Create
        </button>
      )}
      {!isCreating && (
        <div
          className={[
            'text-sm mt-2',
            !initialData.chapters.length && 'text-slate-500 italic',
          ].join()}
        >
          {!initialData.chapters.length && 'No chapters'}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
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
