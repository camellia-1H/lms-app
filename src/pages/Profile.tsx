import { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useScanAllCoursesMutation } from '../redux/coursesApi';
import Loader from '../components/Loader';
import { LIMIT_DATA_QUERY } from '../constants/common';

const ProfilePage: FC = () => {
  const userID = 'userID1';
  const [s] = useSearchParams();
  console.log(s.get('userId'));
  const [listCourses, setListCourses] = useState<any[]>([]);
  // const {
  //   data: listCourses,
  //   isLoading,
  //   isSuccess,
  // } = useGetListCoursesQuery({ userID });
  const [scanCourses, { isLoading, isSuccess }] = useScanAllCoursesMutation();

  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>();

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await scanCourses({
        lastEvaluatedKey,
        limit: LIMIT_DATA_QUERY,
      }).unwrap();
      setListCourses([...listCourses, ...data.courses]);
      setLastEvaluatedKey(data.lastEvaluatedKey);
    };
    fetchCourses();
  }, []);
  const handleLoadMore = async () => {
    console.log(lastEvaluatedKey);
    const data = await scanCourses({
      lastEvaluatedKey,
      limit: LIMIT_DATA_QUERY,
    }).unwrap();
    setListCourses([...listCourses, ...data.courses]);
    setLastEvaluatedKey(data.lastEvaluatedKey);
  };
  return (
    <>
      {isLoading && <Loader />}
      ProfilePage Page
      <div>
        <h1>List course of user :</h1>
        {isSuccess && (
          <>
            <ul>
              {listCourses.map((course) => (
                <li key={course.courseID}>
                  <Link to={`/courses/${course.courseID}`}>
                    <div className="flex">
                      <h1>Course ID : {course.courseID}</h1>
                      <img src={course.imageUrl} alt="" className="w-96 h-96" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <button onClick={handleLoadMore}>Loadmore</button>
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
