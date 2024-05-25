import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEye,
  faLock,
  faLockOpen,
  faVideo,
  faWater,
} from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../redux/store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ChapterUploadVideoForm } from '../components/CourseChapterCreate/ChapterUploadVideoForm';
import { ChapterTitleForm } from '../components/CourseChapterCreate/ChapterTitleForm';
import { ChapterDescriptionForm } from '../components/CourseChapterCreate/ChapterDescriptionForm';
import {
  useDeleteCourseChapterMutation,
  useGetCourseChapterDetailQuery,
} from '../redux/coursesApi';
import Loader from '../components/Loader';
import { ChapterAccessForm } from '../components/CourseChapterCreate/ChapterAccessForm';
import { ActionChapterForm } from '../components/CourseChapterCreate/ActionChapterForm';
import toast from 'react-hot-toast';

// get user is logined = author
const userID = 'userID1';
const CourseChapterDraft: FC = () => {
  const location = useLocation();
  const courseID = location.state?.courseID;
  const chapterID = useSelector(
    (state: RootState) => state.course.currentCourseChapterID
  );

  const navigate = useNavigate();

  const { courseID: courseIDParam, chapterID: chapterIDParam } = useParams();

  const [requiredFields, setRequiredFields] = useState<
    (string | boolean | number | string[])[]
  >([]);
  const {
    data: chapter,
    isLoading,
    isSuccess,
  } = useGetCourseChapterDetailQuery({
    courseID: courseIDParam ?? courseID,
    chapterID: chapterIDParam ?? chapterID,
  });
  console.log(chapter);

  const [deleteCourseChapter, { isLoading: isDeleteChapterLoading }] =
    useDeleteCourseChapterMutation();

  useEffect(() => {
    if (isSuccess) {
      setRequiredFields([
        chapter.chapterTitle,
        chapter.chapterDescription,
        chapter.chapterVideoUrl,
        // chapter.isFree,
        chapter.isPublished,
        chapter.position,
        // chapter?.muxData,
      ]);
    }
  }, [isLoading]);

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const handleDeleteCourse = async () => {
    try {
      await deleteCourseChapter({
        courseID: courseIDParam ?? courseID,
        chapterID: chapterIDParam ?? chapterID,
        userID: userID,
      }).unwrap();
      toast.success('Chapter deleted');
      navigate(-1);
    } catch {
      toast.error('Something went wrong');
    }
  };
  return (
    <div>
      {(isLoading || isDeleteChapterLoading) && <Loader />}
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full lg:px-32 md:px-20 sm:px-6">
          <h1 className="text-white font-bold text-4xl hover:underline hover:cursor-pointer">
            {courseIDParam ? 'Draft Course Chapter' : 'Create Chapter Course'}
          </h1>
        </div>
      </div>
      {isSuccess && (
        <div className="lg:px-32 md:px-20 sm:px-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <button
                className="flex items-center text-sm w-fit hover:opacity-75 hover:underline"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-gray-600 text-lg px-2 py-2 rounded-full"
                />
                <span className="text-base">Back to course</span>
              </button>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-3xl font-bold">Chapter Creation</h1>
                  <span className="text-base text-slate-700">
                    Complete all fields {completionText}
                  </span>
                </div>
                <div className="flex items-center">
                  {chapter.isPublished ? (
                    <FontAwesomeIcon
                      icon={faLockOpen}
                      className="text-2xl text-blue-500"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-2xl text-red-500"
                    />
                  )}
                  <ActionChapterForm handleDeleteCourse={handleDeleteCourse} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <FontAwesomeIcon
                    icon={faWater}
                    className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
                  />
                  <h2 className="text-xl font-bold">Customize your chapter</h2>
                </div>

                <ChapterTitleForm
                  initialData={{
                    chapterTitle: chapter?.chapterTitle as string,
                  }}
                  courseID={courseIDParam ?? courseID}
                  chapterID={chapterIDParam ?? chapterID}
                />
                <ChapterDescriptionForm
                  initialData={{
                    chapterDescription: chapter?.chapterDescription as string,
                  }}
                  courseID={courseIDParam ?? courseID}
                  chapterID={chapterIDParam ?? chapterID}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2 mt-[30px]">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
                  />
                  <h2 className="text-xl">Access Settings</h2>
                </div>
                <ChapterAccessForm
                  initialData={chapter}
                  chapterID={chapterIDParam ?? chapterID}
                  courseID={courseIDParam ?? courseID}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon
                  icon={faVideo}
                  className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
                />
                <h2 className="text-xl font-bold">Add a video</h2>
              </div>

              <ChapterUploadVideoForm
                initialData={{
                  chapterVideoURL: chapter?.chapterVideoUrl as string,
                }}
                courseID={courseIDParam ?? courseID}
                chapterID={chapterIDParam ?? chapterID}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseChapterDraft;
