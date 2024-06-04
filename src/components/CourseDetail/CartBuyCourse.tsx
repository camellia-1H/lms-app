import {
  faChartBar,
  faFile,
  faInfinity,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBuyCourseMutation } from '../../redux/coursesApi';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Course } from '../../models/Course';

const CartBuyCourse = ({
  scrollShow,
  courseID,
  courseData,
  courseDataAuth,
  isStartLearn,
  nextChapter,
  courseTitle,
}: {
  scrollShow: number;
  courseID: string;
  courseData: Course;
  courseDataAuth: { isPaid?: boolean; isAuthor?: boolean };
  isStartLearn: boolean;
  nextChapter: string;
  courseTitle: string;
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  // const isUserAuthor = user.userID === courseData.userID;

  // const [courseDataAuth, setCourseDataAuth] = useState<any>();
  // const [isLoadingAuth, setLoadingAuth] = useState<boolean>(false);
  // const [isSuccessAuth, setSuccessAuth] = useState<boolean>(false);

  // if (user.userID) {
  //   const {
  //     data: courseDataAuthValue,
  //     isLoading: isLoadingAuthValue,
  //     isSuccess: isSuccessAuthValue,
  //   } = useGetCourseDetailAuthQuery({
  //     userID: isUserAuthor ? courseData.userID : user.userID,
  //     courseID: courseID,
  //   });
  //   useEffect(() => {
  //     setLoadingAuth(true);
  //     if (isSuccessAuthValue) {
  //       setCourseDataAuth(courseDataAuthValue);
  //       setSuccessAuth(true);
  //       setLoadingAuth(false);
  //     }
  //   }, [isLoadingAuthValue]);
  //   if (!isUserAuthor) {
  //   }
  // }

  const navigate = useNavigate();
  const [buyCourse, { isLoading }] = useBuyCourseMutation();

  const handleBuy = async () => {
    // if (!isUserAuthor) {
    await buyCourse({
      authorID: courseData.userID,
      userID: user.userID,
      courseID: courseID,
    }).unwrap();
    toast.success('Buy course successfully');
    // }
  };
  const handleStartCourse = () => {
    navigate(`/courses/${courseID}/chapter/${nextChapter}`, {
      state: { title: courseTitle },
    });
  };
  return (
    <div className="ring-1 ring-gray-300 shadow bg-white">
      {isLoading && <Loader />}
      <div
        className={
          scrollShow === 1 || scrollShow === 2 ? 'hidden' : 'border-b h-2/4'
        }
      >
        <img
          src="https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg"
          alt=""
          className="lg:block sm:hidden w-full"
        />
      </div>
      <div
        className={
          scrollShow === 1
            ? 'lg:w-3/12 sm:w-full lg:fixed lg:top-[120px] lg:right-[128px] ring-1 ring-gray-300 shadow bg-white opacity-0 animate-cart_course_fade_in'
            : scrollShow === 2
            ? `lg:absolute lg:top-[1500px] sm:w-full ring-1 ring-gray-300 `
            : ''
        }
      >
        <div className="lg:px-8 md:px-20 sm:px-6 py-8">
          <div className="flex flex-col gap-y-4">
            {user.userID && user.userID !== courseData.userID ? (
              <>
                {user.userID ? (
                  <>
                    {courseDataAuth?.isPaid ? (
                      <>
                        {isStartLearn ? (
                          <button
                            onClick={handleStartCourse}
                            className="mt-3 w-full justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                          >
                            Start learn
                          </button>
                        ) : (
                          <button
                            onClick={handleStartCourse}
                            className="mt-3 w-full justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                          >
                            Continue learn
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col lg:gap-y-6 sm:gap-y-8">
                        <h3 className="text-3xl font-bold">₫2,199,000</h3>
                        <div className="flex flex-col gap-y-4">
                          <button className="mt-3 w-full justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200">
                            Add to cart
                          </button>
                          <button
                            onClick={handleBuy}
                            className="mt-3 w-full justify-center rounded-md bg-white font-bold px-3 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                          >
                            Buy now
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col lg:gap-y-6 sm:gap-y-8">
                    <h3 className="text-3xl font-bold">₫2,199,000</h3>
                    <div className="flex flex-col gap-y-4">
                      <button
                        onClick={() => navigate('/user/login')}
                        className="mt-3 w-full justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                      >
                        Add to cart
                      </button>
                      <button
                        onClick={() => navigate('/user/login')}
                        className="mt-3 w-full justify-center rounded-md bg-white font-bold px-3 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              user.userID &&
              user.userID === courseData.userID && (
                <button
                  onClick={() => navigate(`/courses/${courseID}/draft`)}
                  className="mt-3 mb-6 w-full justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                >
                  Draft
                </button>
              )
            )}

            {!user.userID && (
              <div className="flex flex-col lg:gap-y-6 sm:gap-y-8">
                <h3 className="text-3xl font-bold">₫2,199,000</h3>
                <div className="flex flex-col gap-y-4">
                  <button
                    onClick={() => navigate('/user/login')}
                    className="mt-3 w-full justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => navigate('/user/login')}
                    className="mt-3 w-full justify-center rounded-md bg-white font-bold px-3 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            )}
            <div className="">
              <h3 className="lg:text-lg sm:text-2xl font-bold">
                This course includes :
              </h3>
              <div className="flex flex-col gap-y-3 mt-3">
                <div className="flex">
                  <p className="justify-items-start w-4 mr-2">
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="w-full text-gray-800/80 text-md"
                    />
                  </p>
                  <span>27 hours on-demand video</span>
                </div>
                <div className="flex">
                  <p className="justify-items-start w-4 mr-[6px]">
                    <FontAwesomeIcon
                      icon={faFile}
                      className="w-max text-gray-800/80 text-md"
                    />
                  </p>
                  <span>14 chapters</span>
                </div>
                <div className="flex">
                  <p className="justify-items-start w-4 mr-2">
                    <FontAwesomeIcon
                      icon={faInfinity}
                      className="w-full text-gray-800/80 text-md"
                    />
                  </p>
                  <span>Full lifetime access</span>
                </div>
                <div className="flex">
                  <p className="justify-items-start w-4 mr-2">
                    <FontAwesomeIcon
                      icon={faChartBar}
                      className="w-full text-gray-800/80 text-md"
                    />
                  </p>
                  <span>Access on any device support</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="lg:text-lg sm:text-2xl font-bold">
                Requirements :
              </h2>
              <div className="flex flex-col gap-y-2 mt-3">
                <li>Knows English</li>
                <li>Understands Basics</li>
              </div>
            </div>
            <div>
              <form action="" className="ring-1 ring-slate-500 flex">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Coupon"
                  className="lg:w-8/12 sm:w-10/12 border-r-0 block px-2 py-2 focus-visible:outline-none"
                />
                <button
                  type="submit"
                  className="lg:w-4/12 sm:w-2/12 text-center font-bold bg-gray-700 text-white px-4 py-2 hover:bg-gray-600"
                >
                  <span>Apply</span>
                </button>
              </form>
              <div className="px-2 py-2 border border-dashed border-red-300 mt-3 text-gray-500">
                <h1 className="text-sm">
                  <strong>VOUCHER</strong> is applied
                </h1>
                <div className="flex justify-between">
                  <p className="text-sm w-fit">Team coupon</p>
                  <button className="text-sm text-sky-800 font-semibold -mt-6 mr-4">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartBuyCourse;
