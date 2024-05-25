import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetListCourseRecentQuery } from '../../redux/coursesApi';
import { Course } from '../../models/Course';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const TabCourse = () => {
  // console.log('listCourseQuery', listCourseQuery);
  const [tabCourse, setTabCourseValue] = useState<any>({});
  const {
    data: listCourseRecent,
    isSuccess,
    isLoading,
  } = useGetListCourseRecentQuery();
  useEffect(() => {
    if (isSuccess) {
      setTabCourseValue({ ...tabCourse, Recent: listCourseRecent.courses });
    }
  }, [isLoading]);
  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <TabGroup>
        <TabList className="flex space-x-1 rounded-xl max-w-md bg-blue-900/20 p-1">
          {Object.keys(tabCourse).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                [
                  'w-full rounded-lg py-2.5 text-md font-medium leading-5',
                  'focus:outline-none',
                  selected
                    ? 'bg-white text-black shadow'
                    : 'text-black hover:bg-white/[0.12] hover:text-blue-500 ',
                ].join(' ')
              }
            >
              {category}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-2 w-full overflow-x-scroll">
          {Object.values(tabCourse).map((courses: any, idx) => (
            <TabPanel
              key={idx}
              className={[
                'rounded-xl bg-white my-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              ].join(' ')}
            >
              <div className="flex lg:gap-x-4 sm:gap-x-7">
                {courses.map((course: Course) => (
                  <div key={course.courseID} className="lg:w-3/12 sm:w-4/12">
                    <Link
                      to={`/courses/${course.courseID}`}
                      className="rounded-md"
                    >
                      <div className="">
                        <img
                          src={course.imageUrl}
                          alt=""
                          className="block rounded-lg w-full lg:h-60 sm:h-32"
                        />
                      </div>
                      <h3 className="text-lg font-bold leading-5 mt-3 lg:w-56 sm:w-44 line-clamp-2">
                        {course.title}
                      </h3>

                      <div className="flex flex-1 flex-col gap-y-2 font-normal leading-4 text-gray-500 w-full">
                        <h4 className="text-md">{course.userID}</h4>
                        <div>
                          {course.totalRate / course.totalReviews}
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-400 text-md"
                          />
                          <span>({course.totalReviews})</span>
                        </div>
                      </div>

                      <div className="flex mt-1">
                        <p>
                          <s>123$</s>
                        </p>
                        <p className="ml-3 font-bold text-lg">{course.price}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};
export default TabCourse;
