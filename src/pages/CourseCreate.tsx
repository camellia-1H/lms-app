import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faWater } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { TitleForm } from '../components/CourseCreate/TitleForm';
import { DescriptionForm } from '../components/CourseCreate/DescriptionForm';
import { ImageForm } from '../components/CourseCreate/ImageForm';
import { CategoryForm } from '../components/CourseCreate/CategoryForm';
import { PriceForm } from '../components/CourseCreate/PriceForm';
import { ChaptersForm } from '../components/CourseCreate/ChaptersForm';
import { RootState } from '../redux/store';
import { useGetCourseDetailQuery } from '../redux/coursesApi';
import Loader from '../components/Loader';
import { Course } from '../models/Course';

const CourseCreatePage: FC = () => {
  const navigate = useNavigate();
  const courseID = useSelector(
    (state: RootState) => state.course.currentCourseID
  );
  console.log(courseID);
  const [requiredFields, setRequiredFields] = useState<
    (string | boolean | number | string[])[]
  >([]);
  const {
    data: course,
    isLoading,
    isSuccess,
  } = useGetCourseDetailQuery(courseID);
  console.log(course);

  useEffect(() => {
    if (isSuccess) {
      setRequiredFields([
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.category,
        // course.chapters.some(chapter => chapter.isPublished),
      ]);
    }
  }, [isLoading]);

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="">
      {isLoading && <Loader />}
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full lg:px-32 md:px-20 sm:px-6">
          <h1 className="text-white font-bold text-4xl hover:underline hover:cursor-pointer">
            Create Course
          </h1>
        </div>
      </div>
      {isSuccess && (
        <div className="flex flex-col lg:px-32 md:px-20 sm:px-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-3xl font-bold">Course setup</h1>
              <span className="text-base text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
            <div>
              {!isComplete && (
                <div>
                  <button disabled={!isComplete}>Update</button>
                  <button disabled={!isComplete}>Publish</button>
                  <button disabled={!isComplete}>Unpublish</button>
                </div>
              )}
            </div>
            {/* <Actions
            disabled={!isComplete}
            courseID={params.courseID}
            isPublished={course.isPublished}
          /> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <div className="flex items-center gap-x-2">
                <FontAwesomeIcon
                  icon={faWater}
                  className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
                />
                <h2 className="text-xl font-bold">Customize your course</h2>
              </div>
              <TitleForm
                initialData={{ title: course?.title as string }}
                courseID={courseID}
              />
              <DescriptionForm
                initialData={{ description: course?.description as string }}
                courseID={courseID}
              />
              <ImageForm
                initialData={{ imageUrl: course?.imageUrl as string }}
                courseID={courseID}
              />
              <CategoryForm
                initialData={{ category: course?.category as string[] }}
                courseID={courseID}
              />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <FontAwesomeIcon
                    icon={faWater}
                    className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
                  />
                  <h2 className="text-xl font-bold">Course chapters</h2>
                </div>

                {isSuccess && (
                  <ChaptersForm
                    initialData={course as Course}
                    courseID={courseID}
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="bg-gray-100 text-blue-500 text-xl px-2 py-2 rounded-full"
                  />
                  <h2 className="text-xl font-bold">Sell your course</h2>
                </div>
                <PriceForm
                  initialData={{ price: course?.price as number }}
                  courseID={courseID}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <FontAwesomeIcon icon={faPencil} />
                  <h2 className="text-xl">Resources & Attachments</h2>
                </div>
                {/* <AttachmentForm initialData={course} courseID={course.id} /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCreatePage;
