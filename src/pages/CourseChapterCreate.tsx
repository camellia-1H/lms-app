import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEye,
  faVideo,
  faWater,
} from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChapterUploadVideoForm } from '../components/CourseChapterCreate/ChapterUploadVideoForm';
import { ChapterTitleForm } from '../components/CourseChapterCreate/ChapterTitleForm';
import { ChapterDescriptionForm } from '../components/CourseChapterCreate/ChapterDescriptionForm';

const CourseChapterCreate: FC = () => {
  const chapterID = useSelector(
    (state: RootState) => state.course.currentCourseChapterID
  );
  console.log(chapterID);
  return (
    <div>
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full lg:px-32 md:px-20 sm:px-6">
          <h1 className="text-white font-bold text-4xl hover:underline hover:cursor-pointer">
            Create Chapter Course
          </h1>
        </div>
      </div>
      <div className="lg:px-32 md:px-20 sm:px-6 mt-8">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              // to={`/teacher/courses/${params.chapterID}`}
              to={`/courses/create`}
              className="flex items-center text-sm hover:opacity-75 hover:underline transition"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className=" text-gray-600 text-lg px-2 py-2 rounded-full "
              />
              <span className="text-base"> Back to course setup</span>
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-3xl font-bold">Chapter Creation</h1>
                <span className="text-base text-slate-700">
                  Complete all fields 1/6
                </span>
              </div>
              {/* <ChapterActions
                disabled={!isComplete}
                chapterID={params.chapterID}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              /> */}
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
                initialData={{ title: 'Title hay' }}
                chapterID={'is'}
              />
              <ChapterDescriptionForm
                initialData={{ description: 'Description hay' }}
                chapterID={'is'}
              />
              {/* <ChapterTitleForm
                initialData={chapter}
                chapterID={params.chapterID}
                chapterId={params.chapterId}
              /> */}
              {/* <ChapterDescriptionForm
                initialData={chapter}
                chapterID={params.chapterID}
                chapterId={params.chapterId}
              /> */}
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon
                  icon={faEye}
                  className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
                />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              {/* <ChapterAccessForm
                initialData={chapter}
                chapterID={params.chapterID}
                chapterId={params.chapterId}
              /> */}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <FontAwesomeIcon
                icon={faVideo}
                className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
              />
              <h2 className="text-xl">Add a video</h2>
            </div>

            <ChapterUploadVideoForm
              initialData={{ chapterVideoURL: '' }}
              chapterID={'is'}
            />
            {/* <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              chapterID={params.chapterID}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseChapterCreate;
