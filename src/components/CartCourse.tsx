import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { Course } from '../models/Course';
import { numberWithCommas } from '../utils/common';

const CartCourse = ({ course }: { course: Course }) => {
  return (
    <Link to={`/courses/${course.courseID}`} className="rounded-md">
      <div className="">
        <img
          src={course.imageUrl}
          alt=""
          className="block rounded-lg w-full lg:h-60 sm:h-44"
        />
      </div>
      <h3 className="text-lg font-bold leading-5 mt-3 lg:w-56 sm:w-44 line-clamp-2">
        {course.title}
      </h3>

      <div className="flex flex-1 flex-col gap-y-3 font-normal leading-4  w-full">
        <h4 className="text-md font-thin text-gray-400 mt-1">
          {course.authorName}
        </h4>
        <div className="flex">
          <span className="font-bold">
            {Math.ceil((course.totalRate / course.totalReviews) * 10) / 10 || 0}
          </span>
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-md" />
          <span className="ml-1 text-gray-600">
            ({course.totalReviews || 0})
          </span>
        </div>
      </div>

      <div className="flex mt-1 items-center">
        <p className="font-bold text-lg">
          {course.price ? numberWithCommas(course.price) : 'Free'}
        </p>
      </div>
    </Link>
  );
};
export default CartCourse;
