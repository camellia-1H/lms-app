import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useUpdateCourseMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import toast from 'react-hot-toast';

interface DescriptionFormProps {
  initialData: {
    description: string;
  };
  courseID: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'description is required',
  }),
});
const userID = 'userID1';

export const DescriptionForm = ({
  initialData,
  courseID,
}: DescriptionFormProps) => {
  const [description, setDescription] = useState<string>(
    initialData?.description
  );

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const [updateCourse, { isLoading, isSuccess }] = useUpdateCourseMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setDescription(values.description);
      await updateCourse({
        userID,
        courseID,
        description: values.description,
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
        Course Description
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{description}</p>}
      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <input
            type="text"
            disabled={isSubmitting}
            placeholder="e.g. 'Something about your course'"
            className="w-full h-10 outline-none outline-gray-950/60 focus:outline-blue-300 rounded-md p-2 text-black"
            {...form.register('description')}
          />

          <div className="flex items-center gap-x-2">
            <button
              disabled={!isValid || isSubmitting || isLoading}
              type="submit"
              className={[
                !isValid || isSubmitting
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
