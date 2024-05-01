import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useUpdateCourseChapterMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';

interface ChapterAccessFormProps {
  initialData: {
    isPublished: boolean;
  };
  chapterID: string;
  courseID: string;
}

export const ChapterAccessForm = ({
  initialData,
  courseID,
  chapterID,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChapterPublished, setChapterPublished] = useState<boolean>(
    initialData?.isPublished
  );

  const toggleEdit = () => setIsEditing((current) => !current);

  const [updateCourseChapter, { isLoading }] = useUpdateCourseChapterMutation();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      await updateCourseChapter({
        chapterID,
        courseID,
        isPublished: isChapterPublished,
        updatedAt: generateTime(),
      }).unwrap();
      toast.success('Course chapter updated');
      toggleEdit();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Access
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit Chapter Access
            </>
          )}
        </button>
      </div>
      {!isEditing && (
        <p
          className={[
            'text-sm mt-2 ',
            !initialData.isPublished && 'text-slate-500 italic ',
          ].join('')}
        >
          {isChapterPublished ? (
            <>This chapter is publish for preview.</>
          ) : (
            <>This chapter is not publish.</>
          )}
        </p>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
            <input
              type="checkbox"
              id="checkboxPublish"
              checked={isChapterPublished}
              className="w-4 h-10 focus:outline-blue-300 rounded-md p-2 text-black"
              onChange={(e) => setChapterPublished(e.target.checked)}
            />
            <label htmlFor="checkboxPublish" className="leading-none">
              Check this box if you want to make this chapter free for preview
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              disabled={isLoading}
              type="submit"
              className={[
                isLoading
                  ? 'bg-gray-500/70 '
                  : 'cursor-pointer hover:bg-black bg-blue-500 ',
                'px-3 py-2 rounded-lg text-white font-bold',
              ].join('')}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
