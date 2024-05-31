import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useScanAllCoursesMutation } from '../redux/coursesApi';
import Loader from '../components/Loader';
import { LIMIT_DATA_QUERY, REQUEST_TEACHER } from '../constants/common';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  useGetUserInfoMutation,
  useManageRequestTeacherMutation,
} from '../redux/userApi';
import ProfileFrontPage from '../components/Profile/ProfileFront';

const ProfilePage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { userID } = useParams();

  // const [isRHV, setIsRHV] = useState();
  const [authInfo, setAuthInfo] = useState<any>();

  const [
    getAuthorInfo,
    { isLoading: loadingGetAuth, isSuccess: successGetAuth },
  ] = useGetUserInfoMutation();

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      const data = await getAuthorInfo({
        userID: userID === user.userID ? user.userID : userID,
      }).unwrap();
      setAuthInfo(data.userInfo);
    };
    fetchAuthorInfo();
  }, []);

  const [manageRequestTeacher, { isLoading, isSuccess }] =
    useManageRequestTeacherMutation();

  const handleManageRequestTeacher = async (userID: string, flg: number) => {
    await manageRequestTeacher({
      userID: userID,
      flg: flg,
    }).unwrap();
  };

  // const [listCourses, setListCourses] = useState<any[]>([]);
  // const {
  //   data: listCourses,
  //   isLoading,
  //   isSuccess,
  // } = useGetListCoursesQuery({ userID });
  // // // const [scanCourses, { isLoading, isSuccess }] = useScanAllCoursesMutation();

  // // // const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>();

  // // useEffect(() => {
  // //   const fetchCourses = async () => {
  // //     const data = await scanCourses({
  // //       lastEvaluatedKey,
  // //       limit: LIMIT_DATA_QUERY,
  // //     }).unwrap();
  // //     setListCourses([...listCourses, ...data.courses]);
  // //     setLastEvaluatedKey(data.lastEvaluatedKey);
  // //   };
  // //   // fetchCourses();
  // // }, []);
  // const handleLoadMore = async () => {
  //   console.log(lastEvaluatedKey);
  //   const data = await scanCourses({
  //     lastEvaluatedKey,
  //     limit: LIMIT_DATA_QUERY,
  //   }).unwrap();
  //   setListCourses([...listCourses, ...data.courses]);
  //   setLastEvaluatedKey(data.lastEvaluatedKey);
  // };
  return (
    <>
      {isLoading && <Loader />}
      ProfilePage Page
      {/* {isSuccess && {}} */}
      {user.userID === userID && successGetAuth ? (
        <div>
          {authInfo?.requestTeachStatus === REQUEST_TEACHER.DEFAULT ? (
            <button
              onClick={() =>
                handleManageRequestTeacher(user.userID, REQUEST_TEACHER.PENDING)
              }
            >
              Request Teacher
            </button>
          ) : authInfo?.requestTeachStatus === REQUEST_TEACHER.PENDING ? (
            <div>
              <span className="text-yellow-500">Pending</span>
              <button
                onClick={() =>
                  handleManageRequestTeacher(
                    user.userID,
                    REQUEST_TEACHER.DEFAULT
                  )
                }
              >
                Un Request Teacher
              </button>
            </div>
          ) : authInfo?.requestTeachStatus === REQUEST_TEACHER.REJECT ? (
            <div>
              <span className="text-gray-600">Rejected</span>
              <button
                onClick={() =>
                  handleManageRequestTeacher(
                    user.userID,
                    REQUEST_TEACHER.DEFAULT
                  )
                }
              >
                Un Request Teacher
              </button>
            </div>
          ) : (
            <h1>You is teacher</h1>
          )}
        </div>
      ) : (
        <ProfileFrontPage />
      )}
      {/* <div>
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
      </div> */}
    </>
  );
};

export default ProfilePage;
