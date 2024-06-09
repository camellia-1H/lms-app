import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import Parser from 'html-react-parser';

import { useUpdateCourseMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import { QuillEditor } from '../Editor/QuillEditor';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface DescriptionDetailFormProps {
  initialData: {
    descriptionDetail: string;
  };
  courseID: string;
}

const formSchema = z.object({
  descriptionDetail: z.string().min(0, {
    message: 'descriptionDetail is required',
  }),
});

export const DescriptionDetailForm = ({
  initialData,
  courseID,
}: DescriptionDetailFormProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [descriptionDetail, setDescriptionDetail] = useState<string>(
    initialData?.descriptionDetail
  );

  const [isEditing, setIsEditing] = useState(false);

  // const [editorValue, setEditorValue] = useState<string>('');

  const toggleEdit = () => setIsEditing((current) => !current);

  const [updateCourse, { isLoading, isSuccess }] = useUpdateCourseMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async () => {
    try {
      await updateCourse({
        userID: user.userID,
        courseID,
        descriptionDetail: descriptionDetail,
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
        Course Description Detail
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit Description Detail
            </>
          )}
        </button>
      </div>
      {!isEditing && (
        <div className="text-sm mt-2 list-inside descriptionDetail">
          {Parser(descriptionDetail)}
        </div>
      )}

      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <QuillEditor
            value={descriptionDetail}
            setDescriptionDetail={setDescriptionDetail}
          />
          {errors?.descriptionDetail?.message && (
            <p className="text-sm text-red-600">
              {errors.descriptionDetail.message}
            </p>
          )}

          <div className="flex items-center gap-x-2">
            <button
              disabled={isSubmitting || isLoading}
              type="submit"
              className={[
                isSubmitting
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
