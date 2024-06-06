import { faMarker, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Course } from '../../models/Course';
import { numberWithCommas } from '../../utils/common';

const SearchItem = ({ courseData }: { courseData: Partial<Course> }) => {
  return (
    <Link
      to={`/courses/${courseData.courseID}`}
      className="block w-full mb-4 pb-4 border-b-2 border-gray-100 hover:opacity-80"
    >
      <div className="w-full flex">
        <div className="lg:w-4/12 sm:w-6/12">
          <img
            src={courseData.imageUrl}
            alt=""
            className="rounded-xl block w-full"
          />
        </div>
        <div className="ml-4 lg:w-8/12 sm:w-6/12">
          <div className="relative">
            <h1 className="font-semibold text-lg -mt-1">{courseData.title}</h1>
            <p className="lg:w-10/12 sm:w-10/12 text-sm">
              {courseData.description}
            </p>
            <h2 className="text-sm text-gray-500">
              {courseData.category?.map((category: any) => (
                <span>{category.split('#')[1]}</span>
              ))}
            </h2>
            <div className="flex items-center mt-2 gap-x-2">
              <FontAwesomeIcon
                icon={faFile}
                className="w-max text-gray-800/80 text-md"
              />
              <h3 className="">
                <strong>{courseData.totalChapters}</strong> chapters
              </h3>
            </div>
            <div className="flex flex-col justify-end absolute top-0 right-0">
              <p className="font-bold">
                {courseData.price ? numberWithCommas(courseData.price) : 'Free'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SearchItem;
