import { useSelector } from 'react-redux';
import { useGetReviewUserOfCourseQuery } from '../../redux/coursesApi';
import { RatingForm } from './RatingForm';
import { RootState } from '../../redux/store';

const ReviewCourse = ({
  courseID,
  courseData,
  fetchGetListReview,
  refetch,
}: {
  courseID: string;
  courseData: any;
  fetchGetListReview: () => Promise<void>;
  refetch: () => any;
}) => {
  console.log('voo foori');

  const user = useSelector((state: RootState) => state.user.user);

  //   const [reviewUserOfCourse, setReviewUserOfCourse] = useState<any>();
  //   const [isLoadingReview, setLoadingReview] = useState<boolean>(false);
  //   const [isErrorReview, setErrorReview] = useState<boolean>(false);
  const {
    data: reviewDetail,
    isLoading,
    isSuccess,
    isError,
  } = useGetReviewUserOfCourseQuery({
    userID: user.userID,
    courseID: courseID,
  });

  return (
    <div className="mt-6">
      {isError && (
        <div className="flex flex-col gap-y-3">
          <p className="italic text-gray-500 font-bold">
            You haven't reviewed of course yet
          </p>
          <div>
            <h2 className="font-bold">Add your review : </h2>
            <RatingForm
              reviewDetail={reviewDetail}
              courseData={courseData}
              fetchGetListReview={fetchGetListReview}
              refetch={refetch}
            />
          </div>
        </div>
      )}
      {isSuccess && (
        <div>
          <h1 className="text-lg font-bold">My review : </h1>
          <RatingForm
            reviewDetail={reviewDetail}
            courseData={courseData}
            fetchGetListReview={fetchGetListReview}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  );
};
export default ReviewCourse;
