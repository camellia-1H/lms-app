import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faCirclePlay,
  faStar,
  faUsers,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import Parser from 'html-react-parser';

import CartBuyCourse from '../components/CourseDetail/CartBuyCourse';
import {
  useGetCourseDetailAuthQuery,
  useGetCourseDetailPublicQuery,
  useGetListCourseChaptersQuery,
  useGetListReviewOfCourseMutation,
} from '../redux/coursesApi';
import {
  LIMIT_QUERY_REVIEWS,
  LIMIT_QUERY_REVIEWS_FRONT,
} from '../constants/common';
import ModalListReview from '../components/CourseDetail/ModalListReview';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ReviewCourse from '../components/CourseDetail/ReviewCourse';
import CartCourseList from '../components/CartCourseList';
import { useGetUserInfoMutation } from '../redux/userApi';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { parseSecondToTime } from '../utils/common';

// logic call progress :
// nếu user đã đăng nhập và lưu ở store thì mới gọi.
// để lấy thông tin cho việc từ course chuyển sang course chapter chưa học
const CourseDetailPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const { courseID } = useParams();
  const navigate = useNavigate();

  const [scrollShow, setScrollShow] = useState<number>(0);

  // user(student)
  const [listChaptersCompleted, setListChapterCompleted] = useState<any[]>([]);

  const [listChaptersOfCourses, setListChapterOfCourses] = useState<any[]>([]);
  const [nextChapter, setNextChapter] = useState<string>('');

  // LIST REVIEW
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>();
  const [listReview, setListReview] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>();

  // check user author : isAuthor : true, or user(student) : isPaid : true/false
  const [courseDataAuth, setCourseDataAuth] = useState<any>();
  const [isLoadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [isSuccessAuth, setSuccessAuth] = useState<boolean>(false);

  // author info
  const [authInfo, setAuthInfo] = useState<any>();

  const [isModalListReviewOpen, setModalListReviewOpen] =
    useState<boolean>(false);

  const [
    getListReviewOfCourse,
    { isLoading: isLoadingGetListReview, isSuccess: isSuccessGetListReview },
  ] = useGetListReviewOfCourseMutation();

  // course data public
  const {
    data: courseData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCourseDetailPublicQuery({
    courseID: courseID,
  });

  // get userInfo author
  const [getAuthorInfo] = useGetUserInfoMutation();

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      const data = await getAuthorInfo({
        userID: courseData.course.userID,
      }).unwrap();
      setAuthInfo(data.userInfo);
    };

    if (isSuccess) {
      fetchAuthorInfo();
    }
  }, [isLoading]);

  const fetchGetListReview = async () => {
    const data = await getListReviewOfCourse({
      courseID: courseID,
      lastEvaluatedKey,
      limit: LIMIT_QUERY_REVIEWS_FRONT,
    }).unwrap();
    setListReview(data.reviews);
    setLastEvaluatedKey(data.lastEvaluatedKey);
  };

  useEffect(() => {
    fetchGetListReview();
  }, [courseID]);

  /// load more review
  const handleLoadMore = async () => {
    console.log(lastEvaluatedKey);
    const data = await getListReviewOfCourse({
      courseID: courseID,
      lastEvaluatedKey,
      limit: LIMIT_QUERY_REVIEWS,
    }).unwrap();
    setListReview([...listReview, ...data.reviews]);
    setHasMore(data.hasMore);
    setLastEvaluatedKey(data.lastEvaluatedKey);
  };

  if (user.userID) {
    const { data, isLoading, isSuccess } = useGetListCourseChaptersQuery({
      courseID: courseID as string,
      userID: user.userID,
    });
    useEffect(() => {
      if (isSuccess) {
        setListChapterOfCourses(data.chapters);
        if (data.progress) {
          setListChapterCompleted(data?.progress?.completed);
          for (const a of data.chapters) {
            if (!data.progress.completed.includes(a.chapterID)) {
              setNextChapter(a.chapterID);
              break;
            }
            if (!nextChapter) {
              setNextChapter(data.chapters[data.chapters.length - 1].chapterID);
            }
          }
        }
      }
    }, [isLoading]);
    // get author isauthor, ispaid
    const {
      data: courseDataAuthValue,
      isLoading: isLoadingAuthValue,
      isSuccess: isSuccessAuthValue,
    } = useGetCourseDetailAuthQuery({
      userID: user.userID, // author hoac user student
      courseID: courseID,
    });
    useEffect(() => {
      setLoadingAuth(true);
      if (isSuccessAuthValue) {
        setCourseDataAuth(courseDataAuthValue);
        setSuccessAuth(true);
        setLoadingAuth(false);
      }
    }, [isLoadingAuthValue]);
  } else {
    const { data, isLoading, isSuccess } = useGetListCourseChaptersQuery({
      courseID: courseID as string,
    });
    useEffect(() => {
      if (isSuccess) {
        setListChapterOfCourses(data.chapters);
        setCourseDataAuth({ isPaid: false });
      }
    }, [isLoading]);
  }

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // const elementRect = myElementRef.current.getBoundingClientRect();
      if (window.scrollY > 370) {
        setScrollShow(1);
      } else setScrollShow(0);
      console.log('window.scrollY', window.scrollY);
      console.log(window.innerHeight);

      if (window.scrollY > window.innerHeight * 1.6) {
        setScrollShow(2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {(isLoading || isLoadingAuth) && <Loader />}
      {(scrollShow === 1 || scrollShow === 2) && isSuccess && (
        <div
          className={[
            'lg:block sm:hidden w-full bg-gray-700 fixed lg:px-32 md:px-20 sm:px-6 py-3 ',
            scrollShow === 1 ? 'lg:z-0 sm:z-40' : 'lg:z-40 sm:z-20',
          ].join('')}
        >
          <h1 className="text-white font-bold text-lg hover:underline hover:cursor-pointer">
            {courseData.course?.title}
          </h1>
          <div className="flex gap-x-1">
            <div className="text-white flex items-center">
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400 text-md"
              />
              <h2 className="text-md font-bold">
                <span className="mr-1">
                  {courseData.course?.totalRate
                    ? Math.ceil(
                        (courseData.course?.totalRate /
                          courseData.course?.totalReviews) *
                          10
                      ) / 10
                    : 0}
                </span>
                rate
              </h2>
            </div>
            <button
              onClick={() => setModalListReviewOpen(true)}
              className="text-sky-600 underline"
            >
              ({courseData.course?.totalReviews ?? 0} ratings)
            </button>
            <span className="text-white">
              {courseData.course?.totalStudents} students
            </span>
          </div>
        </div>
      )}
      {isSuccess && (
        <div
          className={[
            'lg:hidden sm:block ',
            'w-full bg-gray-700 fixed bottom-0 lg:px-32 md:px-20 sm:px-6 py-3 ',
          ].join('')}
        >
          <div className="flex justify-between items-center">
            <div className="w-10/12">
              <h1 className="text-white font-bold text-lg hover:underline hover:cursor-pointer">
                {courseData.course?.title}
              </h1>
              <div className="flex gap-x-1">
                <div className="text-white flex items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-400 text-md"
                  />
                  <h2 className="text-md font-bold">
                    <span className="mr-1">
                      {courseData.course?.totalRate
                        ? Math.ceil(
                            (courseData.course?.totalRate /
                              courseData.course?.totalReviews) *
                              10
                          ) / 10
                        : 0}
                    </span>
                    rate
                  </h2>
                </div>
                <button
                  onClick={() => setModalListReviewOpen(true)}
                  className="text-sky-600 underline"
                >
                  ({courseData.course?.totalReviews ?? 0} ratings)
                </button>
                <span className="text-white">
                  {courseData.course?.totalStudents} students
                </span>
              </div>
            </div>
            <button className="w-2/12 h-10 rounded-md bg-white font-bold text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200">
              Buy now
            </button>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="lg:hidden sm:block lg:px-32 md:px-20 sm:px-6 py-10 ">
          <div
            className={[
              'bg-cover bg-no-repeat min-h-[300px] ',
              `bg-[url(${courseData.course?.imageUrl})]`,
            ].join('')}
          >
            <img
              src={courseData.course?.imageUrl}
              alt="courseData.course?.imageUrl"
              className="w-full max-h-[300px] "
            />
          </div>
        </div>
      )}
      {/* {(isLoading || isDeleteChapterLoading) && <Loader />} */}
      {isSuccess && (
        <div className="bg-[#111827]">
          <div className="h-full lg:px-32 md:px-20 sm:px-6 gap-x-4">
            <div className="lg:w-8/12 sm:w-full py-10 flex flex-col gap-y-5">
              <h1 className="text-white font-bold lg:text-4xl sm:text-2xl hover:underline hover:cursor-pointer">
                {courseData.course?.title}
              </h1>
              <h2 className="text-white lg:text-4l sm:text-md">
                {courseData.course?.description}
              </h2>
              <div className="flex gap-x-2">
                {courseData.course.category?.map((category: any) => (
                  <span className="text-sm px-2 py-0.5 bg-sky-700 rounded-md text-white">
                    {(category.split('#')[1] as string).replaceAll('_', ' ')}
                  </span>
                ))}
              </div>
              <div className="flex gap-x-1">
                <div className="text-white flex items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-400 text-md"
                  />
                  <h2 className="text-md font-bold">
                    <span className="mr-1">
                      {courseData.course?.totalRate
                        ? Math.ceil(
                            (courseData.course?.totalRate /
                              courseData.course?.totalReviews) *
                              10
                          ) / 10
                        : 0}
                    </span>
                    rate
                  </h2>
                </div>
                <button
                  onClick={() => setModalListReviewOpen(true)}
                  className="text-sky-600 underline"
                >
                  ({courseData.course?.totalReviews ?? 0} ratings)
                </button>
                <span className="text-white">
                  {courseData.course?.totalStudents} students
                </span>
              </div>
              <div className="text-white">
                <span className="mr-1">Create by</span>
                <Link
                  to={`/user/${courseData.course?.userID}`}
                  className="text-sky-500 underline"
                >
                  {courseData.course?.authorName ??
                    'authorName neu chua update db'}
                </Link>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="text-gray-200 mr-2"
                />
                <p className="text-white text-sm font-thin">
                  Last updated at {courseData.course?.updatedAt.split(' ')[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSuccess && isSuccessAuth ? (
        <div className="lg:absolute lg:top-0 lg:right-[128px] lg:w-3/12 md:w-full sm:w-full py-10">
          <CartBuyCourse
            scrollShow={scrollShow}
            courseID={courseID as string}
            courseData={courseData.course}
            courseDataAuth={courseDataAuth}
            isStartLearn={listChaptersCompleted.length > 0 ? false : true}
            nextChapter={nextChapter}
            courseTitle={courseData.course?.title}
            refetch={refetch}
          />
        </div>
      ) : (
        isSuccess && (
          <div className="lg:absolute lg:top-0 lg:right-[128px] lg:w-3/12 md:w-full sm:w-full py-10">
            <CartBuyCourse
              scrollShow={scrollShow}
              courseID={courseID as string}
              courseData={courseData.course}
              courseDataAuth={courseDataAuth}
              isStartLearn={listChaptersCompleted.length > 0 ? false : true}
              nextChapter={nextChapter}
              courseTitle={courseData.course?.title}
              refetch={refetch}
            />
          </div>
        )
      )}

      <div className="w-full lg:px-32 md:px-20 sm:px-6 lg:my-10 sm:mb-10">
        <div className="lg:w-8/12 sm:w-full flex flex-col gap-y-10 pb-10 border-b border-gray-400">
          {isSuccess && (
            <>
              {/* COURSE CONTENT */}
              <div>
                <h2 className="text-2xl font-bold">Course Content</h2>
                <div className="flex items-center mb-4 mt-8">
                  <span className="font-thin">
                    <strong>{courseData.course.totalChapters}</strong> chapters
                  </span>
                  <span className="text-lg font-extrabold px-2 text-gray-500">
                    .
                  </span>
                  <span className="font-thin">
                    <strong>
                      {parseSecondToTime(courseData.course.totalTime)}
                    </strong>{' '}
                    total length
                  </span>
                </div>

                <div className="">
                  <div className="flex flex-col gap-x-4 px-6 max-h[300px] overflow-auto">
                    {listChaptersOfCourses.length > 0 &&
                      listChaptersOfCourses.map((chapter) => (
                        <>
                          {chapter.isPublished ? (
                            <Accordion key={chapter.chapterID}>
                              <AccordionTab
                                header={
                                  <div className="flex justify-between border-b border-gray-200/90 py-2 gap-x-3">
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-x-3">
                                        <FontAwesomeIcon
                                          icon={faVideo}
                                          className="text-sky-500"
                                        />

                                        <div className="flex">
                                          <p>
                                            <span>
                                              {chapter.position + 1}.{' '}
                                            </span>{' '}
                                            {chapter.chapterTitle}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-sky-500">
                                      ( Preview )
                                    </div>
                                  </div>
                                }
                              >
                                <video
                                  src={chapter.chapterVideoUrl}
                                  controls
                                ></video>
                              </AccordionTab>
                            </Accordion>
                          ) : (
                            <div className="flex justify-between border-b border-gray-200/90 py-5">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-x-3">
                                  <FontAwesomeIcon
                                    icon={faVideo}
                                    className="text-sky-500 pl-11"
                                  />

                                  <div className="flex">
                                    <p className="font-bold text-gray-600">
                                      <span>{chapter.position + 1}. </span>{' '}
                                      {chapter.chapterTitle}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                    {!listChaptersOfCourses.length && (
                      <div>
                        <h1 className="text-xl">Course hasn't chapter</h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* COURSE DESCRIPTION */}
              <div>
                <h2 className="text-2xl font-bold mb-2">Course Description</h2>
                <div className="max-h-[300px] overflow-y-scroll">
                  <div className="mt-6 list-inside descriptionDetail">
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: courseData.course.descriptionDetail,
                      }}
                    ></div> */}
                    {Parser(courseData.course.descriptionDetail)}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* INSTRUCTOR */}
          {isSuccess && (
            <div>
              <h2 className="text-2xl font-bold">About Instructor</h2>
              <div className="flex flex-col gap-y-4 mt-6">
                <Link
                  to={`/user/${courseData.course?.userID}`}
                  className="text-sky-500 underline"
                >
                  {authInfo?.name ?? 'authorName neu chua update db'}
                </Link>
                <p className="text-gray-600 -mt-4">
                  Software developer, tech book author
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Link to={`/user/${courseData.course?.userID}`}>
                      <img
                        src={authInfo?.avatar}
                        alt=""
                        className="rounded-full w-28 h-28"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm">
                      <FontAwesomeIcon
                        icon={faCirclePlay}
                        className="w-4 mr-3"
                      />
                      <span className="text-gray-600">
                        {authInfo?.totalCourses} courses
                      </span>
                    </p>
                    <p className="text-sm">
                      <FontAwesomeIcon icon={faUsers} className="w-4 mr-3" />
                      <span className="text-gray-600">
                        {authInfo?.totalStudents} Students
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">
                    {authInfo?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* course review, rate */}
          {isSuccess && (
            <div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 text-xl"
                />
                <h2 className="text-2xl font-bold">
                  <span className="mr-1">
                    {courseData.course?.totalRate
                      ? Math.ceil(
                          (courseData.course?.totalRate /
                            courseData.course?.totalReviews) *
                            10
                        ) / 10
                      : 0}
                  </span>
                  course rating
                </h2>
                <span className="text-2xl font-extrabold px-2 text-gray-500">
                  .
                </span>
                <h2 className="text-2xl font-bold">
                  <span>{courseData.course?.totalReviews ?? 0}</span> ratings
                </h2>
              </div>

              {isSuccess &&
                isSuccessAuth &&
                courseDataAuth?.isPaid &&
                user.userID &&
                user.userID !== courseData.course.userID && (
                  <ReviewCourse
                    courseID={courseID as string}
                    courseData={courseData.course}
                    fetchGetListReview={fetchGetListReview}
                    refetch={refetch}
                  />
                )}
              {isSuccessGetListReview && (
                <div className="flex flex-col gap-y-5">
                  <div className="flex flex-wrap gap-y-3">
                    {listReview.map((review) => (
                      <div
                        key={review.updatedAt}
                        className="w-6/12 px-4 flex flex-col gap-y-4 mt-4"
                      >
                        <div className="flex border-t border-gray-300 pt-4 gap-x-4">
                          <img
                            src={review.avatar}
                            alt=""
                            className="rounded-full w-16 h-16"
                          />
                          <div>
                            <p className="text-lg font-bold">{review.name}</p>
                            <p className="text-md">
                              {review.rate}
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-400 text-sm"
                              />
                              <span className="text-sm text-gray-600 font-bold ml-2">
                                {review.updatedAt}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-base line-clamp-4">
                            {review.review}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ModalListReview
                    isModalListReviewOpen={isModalListReviewOpen}
                    setModalListReviewOpen={setModalListReviewOpen}
                    listReview={listReview}
                    courseData={courseData}
                    hasMore={hasMore as boolean}
                    handleLoadMore={handleLoadMore}
                  />
                </div>
              )}
            </div>
          )}
          {/* course relate of author */}
          {isSuccess && (
            <div>
              <h2 className="text-2xl font-bold">
                More Courses by{' '}
                <Link
                  to={`/user/${courseData.course?.userID}`}
                  className="text-sky-500 underline"
                >
                  {courseData.course?.authorName ??
                    'authorName neu chua update db'}
                </Link>
              </h2>

              <div className="mt-10">
                <CartCourseList authorID={courseData.course?.userID} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
