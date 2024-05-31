import * as z from 'zod';
import { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import { Radio, RadioGroup } from '@headlessui/react';
import toast from 'react-hot-toast';

import { useCreateRatingCourseMutation } from '../../redux/coursesApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface RatingFormProps {
  reviewDetail: {
    review: string;
    rate: number;
  };
  courseData: any;
  fetchGetListReview?: any;
}

const formSchema = z.object({
  review: z.string({ required_error: 'Review is required' }).min(10),
  rate: z.number({ required_error: 'Rate is required' }),
});

const stars = [1, 2, 3, 4, 5];

export const RatingForm = ({
  reviewDetail,
  courseData,
  fetchGetListReview,
}: RatingFormProps) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [review, setReview] = useState<string>(reviewDetail?.review);
  const [rate, setRate] = useState<number>(reviewDetail?.rate || stars[0]);

  // const [selected, setSelected] = useState(stars[0]);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  // TODO create rating
  const [createRating, { isLoading, isSuccess }] =
    useCreateRatingCourseMutation();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log(review);
      console.log(rate);

      const validatedData = formSchema.parse({ review: review, rate: rate });
      // setReview(values.review);
      console.log(validatedData);

      await createRating({
        authorID: courseData.userID,
        userID: user.userID,
        name: user.name,
        courseID: courseData.courseID,
        ...validatedData,
      }).unwrap();
      // updatedAt: generateTime(),
      toast.success('Create Rating Success');
      await fetchGetListReview();
      toggleEdit();
    } catch (error: any) {
      console.log(error.errors);
      toast.error('Something went wrong');
      toast.error(error.errors[0].message);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Review
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </button>
      </div>
      {!isEditing && (
        <div className="flex flex-col gap-y-2">
          <p className="text-sm">{review}</p>
          <p className="flex gap-x-2">
            Rate :
            <span>
              {rate}
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400 text-md"
              />
            </span>
          </p>
        </div>
      )}
      {isEditing && (
        <>
          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              value={review}
              disabled={isLoading}
              placeholder="e.g. 'Something about your course'"
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-10 outline-none outline-gray-950/60 focus:outline-blue-300 rounded-md p-2 text-black"
            />

            <RadioGroup
              // by="name"
              value={rate}
              onChange={setRate}
              aria-label="Server size"
              className="space-y-2"
            >
              <div className="flex items-center gap-x-3">
                <h1 className="text-base font-medium">Rating : </h1>
                {stars.map((star) => (
                  <Radio
                    key={star}
                    value={star}
                    className="group relative flex items-center gap-x-2 cursor-pointer rounded-lg bg-white/5 py-2 px-3 shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="size-5 fill-sky-400 opacity-0 transition group-data-[checked]:opacity-100 text-green-500"
                    />
                    <div>
                      <span className="">{star}</span>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400 text-md"
                      />
                    </div>
                  </Radio>
                ))}
              </div>
            </RadioGroup>

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
        </>
      )}
    </div>
  );
};
