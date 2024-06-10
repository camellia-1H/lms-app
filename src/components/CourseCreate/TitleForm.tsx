import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useUpdateCourseMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COURSE_STATUS, ROLE_USER } from '../../constants/common';

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseID: string;
  courseData: any;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

export const TitleForm = ({
  initialData,
  courseID,
  courseData,
}: TitleFormProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [title, setTitle] = useState<string>(initialData.title);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const [updateCourse] = useUpdateCourseMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      setTitle(values.title);
      await updateCourse({
        userID: user.userID, // author
        courseID,
        title: values.title,
        updatedAt: generateTime(),
      }).unwrap();
      toast.success('Course updated');
      toggleEdit();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit Title
            </>
          )}
        </button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{title}</p>}
      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {errors?.title?.message && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
          <input
            type="text"
            disabled={isSubmitting}
            placeholder="e.g. 'Advanced web development'"
            className="w-full h-10 outline-none outline-gray-950/60 focus:outline-blue-300 rounded-md p-2 text-black
            "
            {...form.register('title')}
          />

          <div className="flex items-center gap-x-2">
            <button
              disabled={
                isSubmitting ||
                ((user.role as string).startsWith(ROLE_USER.RGV) &&
                  courseData.courseStatus === COURSE_STATUS.PUBLIC)
              }
              type="submit"
              className={[
                isSubmitting ||
                ((user.role as string).startsWith(ROLE_USER.RGV) &&
                  courseData.courseStatus === COURSE_STATUS.PUBLIC)
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
