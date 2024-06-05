import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useState } from 'react';
import {
  useGetListCoursePopularQuery,
  useGetListCourseRecentQuery,
} from '../../redux/coursesApi';
import { Course } from '../../models/Course';
import CartCourse from '../CartCourse';

const TabCourse = () => {
  const [tabCourse, setTabCourseValue] = useState<any>({});
  const {
    data: listCourseRecent,
    isSuccess,
    isLoading,
  } = useGetListCourseRecentQuery();

  const {
    data: listCoursePopular,
    isSuccess: isSuccess1,
    isLoading: isLoading1,
  } = useGetListCoursePopularQuery();
  useEffect(() => {
    if (isSuccess) {
      setTabCourseValue({ ...tabCourse, Recent: listCourseRecent.courses });
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess1) {
      setTabCourseValue({ ...tabCourse, Popular: listCoursePopular.courses });
    }
  }, [isLoading1]);

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
                  <div
                    key={course.courseID.concat(
                      Math.floor(Math.random() * 100).toString()
                    )}
                    className="lg:w-3/12 sm:w-4/12 overflow-hidden"
                  >
                    <CartCourse course={course} />
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
