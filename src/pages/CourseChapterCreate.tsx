import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEye,
  faVideo,
  faWater,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { TitleForm } from '../components/CourseCreate/TitleForm';
import { DescriptionForm } from '../components/CourseCreate/DescriptionForm';
import { ChapterUploadVideoForm } from '../components/CourseChapterCreate/ChapterUploadVideoForm';

const CourseChapterCreate: FC = () => {
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
              // to={`/teacher/courses/${params.courseId}`}
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
                courseId={params.courseId}
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

              <TitleForm initialData={{ title: 'Title hay' }} courseId={'is'} />
              <DescriptionForm
                initialData={{ description: 'Description hay' }}
                courseId={'is'}
              />
              {/* <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              /> */}
              {/* <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
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
                courseId={params.courseId}
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
              courseId={'is'}
            />
            {/* <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseChapterCreate;
