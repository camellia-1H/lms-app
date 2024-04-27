import { FC, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetListCoursesQuery } from '../redux/coursesApi';
import Loader from '../components/Loader';

const ProfilePage: FC = () => {
  const userID = 'userID1';
  const [s] = useSearchParams();
  console.log(s.get('userId'));
  const {
    data: listCourses,
    isLoading,
    isSuccess,
  } = useGetListCoursesQuery(userID);

  useEffect(() => {
    if (isSuccess) {
    }
  }, [isLoading]);
  return (
    <>
      {isLoading && <Loader />}
      ProfilePage Page
      <div>
        <h1>List course of user :</h1>
        {isSuccess && (
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
        )}
      </div>
    </>
  );
};

export default ProfilePage;
