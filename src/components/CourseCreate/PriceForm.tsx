import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

import { useUpdateCourseMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COURSE_STATUS, ROLE_USER } from '../../constants/common';

interface PriceFormProps {
  initialData: {
    price: number;
  };
  courseID: string;
  courseData: any;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({
  initialData,
  courseID,
  courseData,
}: PriceFormProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [price, setPrice] = useState<number>(initialData?.price);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const [updateCourse] = useUpdateCourseMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      setPrice(values.price);
      await updateCourse({
        userID: courseData.userID,
        courseID,
        price: values.price,
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
        <p>
          Course Price (Unit : <span className="font-bold">thousand</span>)
        </p>
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2 font-bold">
          {price ? price : <i className="text-gray-400">No price</i>}
        </p>
      )}
      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {errors?.price?.message && (
            <p className="text-sm text-red-600">{errors.price.message}</p>
          )}
          <input
            type="text"
            disabled={isSubmitting}
            placeholder="Set a price for your course"
            className="w-5/12 h-10 outline-none outline-gray-950/60 focus:outline-blue-300 rounded-md p-2 text-black"
            {...form.register('price')}
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
