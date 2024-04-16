import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { generateTime } from '../../utils/string-utils';
import { useUpdateCourseChapterMutation } from '../../redux/coursesApi';

interface ChapterDescriptionFormProps {
  initialData: {
    chapterDescription: string;
  };
  chapterID: string;
  courseID: string;
}

const formSchema = z.object({
  chapterDescription: z.string().min(1, {
    message: 'chapterDescription is required',
  }),
});

export const ChapterDescriptionForm = ({
  initialData,
  chapterID,
  courseID,
}: ChapterDescriptionFormProps) => {
  const [chapterDescription, setDescription] = useState<string>(
    initialData?.chapterDescription
  );

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const navigate = useNavigate();
  const [updateCourseChapter] = useUpdateCourseChapterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setDescription(values.chapterDescription);
      updateCourseChapter({
        chapterID,
        courseID,
        chapterDescription: values.chapterDescription,
        updatedAt: generateTime(),
      });
      //   toast.success('Course updated');
      toggleEdit();
    } catch {
      //   toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapterDescription
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit chapterDescription
            </>
          )}
        </button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{chapterDescription}</p>}
      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <input
            type="text"
            disabled={isSubmitting}
            placeholder="e.g. 'Something about your chapter'"
            className="w-full h-10 outline-none outline-gray-950/60 focus:outline-blue-300 rounded-md p-2 text-black"
            {...form.register('chapterDescription')}
          />

          <div className="flex items-center gap-x-2">
            <button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="px-3 py-2 rounded-lg text-white font-bold hover:bg-black bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
