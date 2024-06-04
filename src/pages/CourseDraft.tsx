import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faLockOpen,
  faPencil,
  faWater,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { TitleForm } from '../components/CourseCreate/TitleForm';
import { DescriptionForm } from '../components/CourseCreate/DescriptionForm';
import { ImageForm } from '../components/CourseCreate/ImageForm';
import { CategoryForm } from '../components/CourseCreate/CategoryForm';
import { PriceForm } from '../components/CourseCreate/PriceForm';
import { ChaptersForm } from '../components/CourseCreate/ChaptersForm';
import { RootState } from '../redux/store';
import {
  useDeleteCourseMutation,
  useGetCourseDetailAuthQuery,
  useGetCourseDetailPublicQuery,
  useGetListCourseChaptersQuery,
  useUpdateCourseMutation,
} from '../redux/coursesApi';
import Loader from '../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { DescriptionDetailForm } from '../components/CourseCreate/DescriptionDetailForm';
import { ActionForm } from '../components/CourseCreate/ActionForm';
import toast from 'react-hot-toast';
import { generateTime } from '../utils/string-utils';
import { COURSE_STATUS } from '../constants/common';

const CourseDraftPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const courseID = useSelector(
    (state: RootState) => state.course.currentCourseID
  );
  const navigate = useNavigate();
  const { courseID: courseIDParam } = useParams();

  const [requiredFields, setRequiredFields] = useState<
    (string | boolean | number | string[])[]
  >([]);
  const {
    data: courseData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCourseDetailPublicQuery({
    courseID: courseIDParam ?? courseID,
  });
  console.log(courseData);

  const { data, isSuccess: isSuccessGetListChapters } =
    useGetListCourseChaptersQuery(
      { courseID: courseIDParam ?? courseID },
      {
        refetchOnFocus: true,
      }
    );

  const [deleteCourse, { isLoading: isDeleteCourseLoading }] =
    useDeleteCourseMutation();

  const [updateCourse, { isLoading: isUpdateCourseLoading }] =
    useUpdateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      setRequiredFields([
        courseData.course.title,
        courseData.course.description,
        courseData.course.imageUrl,
        courseData.course.price,
        courseData.course.category,
        // course.chapters.some(chapter => chapter.isPublished),
      ]);
    }
  }, [isLoading]);

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const handleDeleteCourse = async () => {
    await deleteCourse({
      userID: user.userID,
      courseID: courseIDParam ?? courseID,
    }).unwrap();
    toast.success('Delete Course Success');
    if (courseIDParam) {
      navigate(-2);
    } else navigate(-1);
  };

  const handleRequestPublicCourse = async () => {
    try {
      await updateCourse({
        userID: user.userID,
        courseID: courseIDParam ?? courseID,
        courseStatus: COURSE_STATUS.PENDING,
        updatedAt: generateTime(),
      }).unwrap();
      refetch();
      toast.success('Course updated');
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleRequestUnpublicCourse = async () => {
    try {
      await updateCourse({
        userID: user.userID,
        courseID: courseIDParam ?? courseID,
        courseStatus: COURSE_STATUS.DEFAULT,
        updatedAt: generateTime(),
      }).unwrap();
      refetch();
      toast.success('Course updated');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="">
      {(isLoading || isDeleteCourseLoading || isUpdateCourseLoading) && (
        <Loader />
      )}
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full lg:px-32 md:px-20 sm:px-6">
          <h1 className="text-white font-bold text-4xl hover:underline hover:cursor-pointer">
            {courseIDParam ? 'Draft Course' : 'Create Course'}
          </h1>
        </div>
      </div>
      {isSuccess && (
        <div className="flex flex-col lg:px-32 md:px-20 sm:px-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-3xl font-bold">Course setup</h1>
              {/* <span className="text-base text-slate-700">
                Complete all fields {completionText}
              </span> */}
            </div>

            <div className="flex items-center">
              {courseData.course?.courseStatus === COURSE_STATUS.DEFAULT ? (
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-2xl text-red-500"
                  />
                  <button
                    onClick={handleRequestPublicCourse}
                    className="text-sm block ml-4 bg-blue-500 hover:bg-blue-950/90 font-medium text-white rounded-md px-3 py-2 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  >
                    Publish
                  </button>
                </div>
              ) : courseData.course?.courseStatus === COURSE_STATUS.PENDING ? (
                <div className="flex items-center">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-2xl text-red-500"
                    />
                    <button
                      disabled={true}
                      className="text-sm block ml-4 bg-yellow-500 font-medium text-white rounded-md px-3 py-2"
                    >
                      Pending
                    </button>
                  </div>

                  <button
                    onClick={handleRequestUnpublicCourse}
                    className="text-sm block ml-4 bg-sky-900 hover:bg-red-950/90 font-medium text-white rounded-md px-3 py-2 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  >
                    Unpublish Request
                  </button>
                </div>
              ) : courseData.course?.courseStatus === COURSE_STATUS.REJECT ? (
                <div className="flex items-center">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-2xl text-red-500"
                    />
                    <button
                      disabled={true}
                      className="text-sm block ml-4 bg-gray-500 font-medium text-white rounded-md px-3 py-2"
                    >
                      Rejected
                    </button>
                  </div>
                  <button
                    onClick={handleRequestPublicCourse}
                    className="text-sm block ml-4 bg-blue-500 hover:bg-blue-950/90 font-medium text-white rounded-md px-3 py-2 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  >
                    Publish request
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faLockOpen}
                    className="text-2xl text-red-500"
                  />
                  <button
                    onClick={handleRequestUnpublicCourse}
                    className="text-sm block ml-4 bg-blue-500 hover:bg-blue-950/90 font-medium text-white rounded-md px-3 py-2 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  >
                    UnPublish
                  </button>
                </div>
              )}
              <ActionForm handleDeleteCourse={handleDeleteCourse} />
            </div>
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
              {isSuccess && (
                <>
                  <TitleForm
                    initialData={{ title: courseData.course?.title as string }}
                    courseID={courseIDParam ?? courseID}
                  />
                  <DescriptionForm
                    initialData={{
                      description: courseData.course?.description as string,
                    }}
                    courseID={courseIDParam ?? courseID}
                  />
                  <DescriptionDetailForm
                    initialData={{
                      descriptionDetail: courseData.course
                        ?.descriptionDetail as string,
                    }}
                    courseID={courseIDParam ?? courseID}
                  />
                  <ImageForm
                    initialData={{
                      imageUrl: courseData.course?.imageUrl as string,
                    }}
                    courseID={courseIDParam ?? courseID}
                  />
                  <CategoryForm
                    initialData={{
                      category: courseData.course?.category as string[],
                    }}
                    courseID={courseIDParam ?? courseID}
                  />
                </>
              )}
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

                {isSuccessGetListChapters && (
                  <ChaptersForm
                    initialData={data.chapters}
                    courseID={courseIDParam ?? courseID}
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
                {isSuccess && (
                  <PriceForm
                    initialData={{ price: courseData.course?.price as number }}
                    courseID={courseIDParam ?? courseID}
                  />
                )}
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

export default CourseDraftPage;
