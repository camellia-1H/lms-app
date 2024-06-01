import {
  faBars,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faLock,
  faPlay,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useRef, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import {
  useGetCourseChapterDetailQuery,
  useGetListCourseChaptersQuery,
  useUpdateCourseProgressMutation,
} from '../redux/coursesApi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const CourseChapterDetailPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const { courseID, chapterID } = useParams();

  const { state } = useLocation();

  const [listChapters, setListChapters] = useState<any[]>([]);

  const [listChaptersCompleted, setListChaptersCompleted] = useState<any>([]);

  const [nextChapter, setNextChapter] = useState<string>('');
  const [preChapter, setPreChapter] = useState<string>('');

  const [isPre, setPre] = useState<boolean>();
  const [isNext, setNext] = useState<boolean>();

  const { data, isSuccess, isLoading, refetch, isFetching } =
    useGetListCourseChaptersQuery({
      courseID: courseID as string,
      userID: user.userID,
    });

  useEffect(() => {
    if (isSuccess) {
      setListChapters(data.chapters);
      setListChaptersCompleted(data.progress.completed);
      for (const a of data.chapters) {
        // previous chapter
        if (a.chapterID === chapterID) {
          if (a.position === 0) {
            setPre(false);
            setPreChapter('');
          } else {
            setPreChapter(data.chapters[a.position - 1].chapterID);
            setPre(true);
          }
          // next chapter
          if (
            a.position === data.chapters.length - 1 ||
            (!data.progress.completed.includes(
              data.chapters[a.position + 1].chapterID
            ) &&
              !data.progress.completed.includes(
                data.chapters[a.position].chapterID
              ))
          ) {
            setNext(false);
            setNextChapter('');
          } else if (
            !data.progress.completed.includes(
              data.chapters[a.position].chapterID
            )
          ) {
            setNext(true);
            setNextChapter(data.chapters[a.position + 1].chapterID);
          } else {
            setNext(true);
            setNextChapter(data.chapters[a.position + 1].chapterID);
          }
        }
      }
    }
  }, [isLoading, chapterID, isFetching, isNext]);

  const {
    data: chapterDetail,
    isLoading: getChapterDetailLoading,
    isSuccess: getChapterDetailSuccess,
  } = useGetCourseChapterDetailQuery({
    courseID: courseID as string,
    chapterID: chapterID as string,
  });

  const [updateCourseProgress] = useUpdateCourseProgressMutation();

  // useEffect(() => {
  //   refetch();
  //   reFetchChapterDetail();
  // }, [chapterID]);
  const [isSidebarShow, setShow] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleShow = () => setShow(!isSidebarShow);

  // video
  const videoRef = useRef<any>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  console.log('currentTime', currentTime);
  console.log('setTotalTime', totalTime);

  useEffect(() => {
    const setTime = () => {
      setTotalTime(videoRef.current.duration);
    };
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', setTime);
    }
    return () => removeEventListener('loadedmetadata', setTime);
  }, []);

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
    if (currentTime > totalTime * 0.75 && !isNext) {
      setNext(true);
      handleUpdateProgress();
    }
  };

  const handleUpdateProgress = async () => {
    await updateCourseProgress({
      courseID: courseID as string,
      userID: user.userID,
      chapter: chapterID as string,
    }).unwrap();
    refetch();
  };

  const handlePreChapter = () => {
    navigate(`/courses/${courseID}/chapter/${preChapter}`);
  };
  const handleNextChapter = () => {
    navigate(`/courses/${courseID}/chapter/${nextChapter}`);
  };
  return (
    <div className="relative">
      {(isLoading || getChapterDetailLoading) && <Loader />}
      <div className="flex mt-16">
        <div
          className={[
            'flex flex-col ',
            isSidebarShow ? 'lg:w-9/12' : 'w-full',
          ].join('')}
        >
          <div className="flex flex-col relative">
            <div className="flex justify-center bg-gray-900/95 px-10 ring-gray-950 ">
              <div className="lg:w-10/12 sm:w-10/12">
                <video
                  ref={videoRef}
                  onTimeUpdate={updateTime}
                  src={
                    chapterDetail?.chapterVideoUrl ??
                    'https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/videos/2022-10-02+17-55-08.mkv'
                  }
                  controls
                  className={isPlaying ? 'block' : 'hidden'}
                ></video>
                {isPlaying ? (
                  <></>
                ) : (
                  <div className="max-h-[447px] overflow-hidden object-cover flex justify-center">
                    <button
                      className="absolute flex justify-center top-[20%] right-[50%] bg-red-600 hover:bg-red-700/90 font-medium text-white rounded-full px-4 py-3 transition ease-in-out hover:-translate-y-0.5 hover:scale-125 duration-300"
                      onClick={togglePlay}
                    >
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-3xl pl-1 py-0.5"
                      />
                    </button>
                    <img
                      className="h-full"
                      src="https://sam-app-temporarybucket-u31kktlyktoq.s3.amazonaws.com/images/444dd013-bc6e-4f6d-b745-a36e8c6cf4aa.jpg"
                      alt="Video Thumbnail"
                    />
                  </div>
                )}
              </div>
            </div>

            {getChapterDetailSuccess && (
              <div className="min-h-[400px] lg:px-32 md:px-20 sm:px-6 py-6 flex flex-col gap-y-4">
                <div className="flex justify-between">
                  <h1 className="text-3xl font-bold">
                    {chapterDetail?.chapterTitle}
                  </h1>
                  <button
                    disabled={!isNext}
                    className={[
                      'font-medium rounded-md px-3 py-2 flex items-center ml-4 ',
                      isNext
                        ? 'bg-blue-500 hover:bg-blue-950/90 text-white transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200'
                        : 'bg-gray-500/70 ',
                    ].join('')}
                    onClick={handleUpdateProgress}
                  >
                    Mark done chapter
                  </button>
                </div>
                <h2 className="text-sm">
                  Updated at <span>{chapterDetail?.updatedAt}</span>
                </h2>
                <div>
                  <h1 className="text-xl font-bold">Kiến thức cần nắm : </h1>
                  <div>{chapterDetail?.chapterDescription}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={[
            'fixed right-0 h-full border-l border-gray-300 bg-white ',
            isSidebarShow
              ? 'opacity-0 lg:w-3/12 sm:w-full animate-cart_course_fade_in'
              : 'hidden lg:w-0',
          ].join('')}
        >
          <div className="lg:px-4 md:px-4 sm:px-6 py-2">
            <h1 className="font-bold text-2xl border-b border-gray-300 py-4">
              Course Overview
            </h1>
            {isSuccess &&
              listChapters.map((chapter: any, index: number) => (
                <Link
                  key={index}
                  to={`/courses/${courseID}/chapter/${chapter.chapterID}`}
                  className={[
                    'px-6 py-4 lg:-mx-4 sm:-mx-6 relative flex flex-col border-b border-gray-200 ',
                    chapterID === chapter.chapterID
                      ? 'bg-red-200'
                      : 'hover:bg-gray-100 bg-gray-300/90',
                  ].join('')}
                  style={{
                    pointerEvents:
                      chapterID === chapter.chapterID ||
                      !listChaptersCompleted.includes(chapter.chapterID)
                        ? 'none'
                        : 'auto',
                  }}
                >
                  <h1 className="text-black text-lg font-bold">
                    <span className="mr-3">{index + 1}.</span>
                    {chapter.chapterTitle}
                  </h1>
                  <div>
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="text-sm text-sky-500 mr-2"
                    />
                    <span className="text-sm">10:30</span>
                  </div>
                  <div className="absolute right-6 top-8">
                    {listChaptersCompleted.includes(chapter.chapterID) ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-600 text-xl"
                      />
                    ) : chapterID === chapter.chapterID ? (
                      <></>
                    ) : (
                      <FontAwesomeIcon icon={faLock} />
                    )}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full fixed top-0 flex justify-between items-center bg-[#111827] h-16 text-white lg:px-32 md:px-20 sm:px-6 py-3">
        <div>
          <button
            onClick={() => navigate(`/courses/${courseID}`)}
            className="hover:underline cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="font-bold pl-3 text-xl">
              {state?.title ?? 'Title'}
            </span>
          </button>
        </div>
        {isSuccess && (
          <div>
            <p>Course Progress</p>
            <ProgressBar
              completed={
                (listChaptersCompleted.length / listChapters.length) * 100
              }
              height="10px"
              labelSize="10px"
            />
          </div>
        )}
      </div>
      <div className="fixed w-full bottom-0 py-2 bg-gray-100 border-b-2 border-blue-400/10 shadow-md">
        <div className="px-2 py-2 flex justify-center items-center">
          <button
            onClick={handlePreChapter}
            disabled={!isPre}
            className={[
              'font-medium rounded-md px-3 py-2 flex items-center ml-4 ',
              isPre
                ? 'bg-gray-100 hover:bg-gray-200/90 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200 '
                : 'bg-gray-500/70 ',
            ].join('')}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Previos Chapter
          </button>
          <button
            onClick={handleNextChapter}
            disabled={!isNext}
            className={[
              'font-medium rounded-md px-3 py-2 flex items-center ml-4 ',
              isNext
                ? 'bg-blue-500 hover:bg-blue-950/90 text-white transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200'
                : 'bg-gray-500/70 ',
            ].join('')}
          >
            Next Chapter
            <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
          </button>
        </div>
        <div className="absolute right-6 top-6">
          <button className="text-xl px-2" onClick={toggleShow}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CourseChapterDetailPage;
