import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useScanAllCoursesMutation } from '../redux/coursesApi';
import Loader from '../components/Loader';
import { LIMIT_DATA_QUERY } from '../constants/common';
import { useGetUserInfoMutation } from '../redux/userApi';
import CartCourseList from '../components/CartCourseList';

const ProfileFrontPage: FC = () => {
  const { userID } = useParams();

  const [authInfo, setAuthInfo] = useState<any>();

  // get userInfo author
  const [getAuthorInfo, { isLoading, isSuccess }] = useGetUserInfoMutation();

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      const data = await getAuthorInfo({
        userID: userID,
      }).unwrap();
      setAuthInfo(data.userInfo);
    };

    fetchAuthorInfo();
  }, []);

  // const [listCourses, setListCourses] = useState<any[]>([]);
  // const [hasMore, setMore] = useState<boolean>(false);

  // const {
  //   data: listCourses,
  //   isLoading,
  //   isSuccess,
  // } = useGetListCoursesQuery({ userID });
  // const [scanCourses, { isLoading, isSuccess }] = useScanAllCoursesMutation();

  // const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>();

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const data = await scanCourses({
  //       lastEvaluatedKey,
  //       limit: LIMIT_DATA_QUERY,
  //     }).unwrap();
  //     setListCourses([...listCourses, ...data.courses]);
  //     setLastEvaluatedKey(data.lastEvaluatedKey);
  //     // setMore(data.hasMore);
  //   };
  //   fetchCourses();
  // }, []);
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
      {isSuccess && authInfo && (
        <div className="lg:px-64 md:px-20 sm:px-6">
          <div className="mt-36 flex justify-between">
            <div>
              <h2 className="font-bold text-2xl text-gray-600">Instructor</h2>
              <h1 className="font-bold text-5xl">{authInfo.name}</h1>
              <h2 className="text-lg font-bold mt-2">
                Be successful today with proven, real-world strategies
              </h2>
              <div className="mt-6">
                <div>
                  <h1 className="text-lg text-gray-600 font-bold">
                    Total students
                  </h1>
                  <span className="font-bold text-3xl">
                    {authInfo.totalStudents}
                  </span>
                </div>
                {/* <div>
                <h1>Total courses</h1>
                <span>106,552</span>
              </div> */}
              </div>
            </div>
            <div>
              <img
                src={
                  authInfo.avatar ??
                  'https://img-c.udemycdn.com/user/200_H/816169_ec06_8.jpg'
                }
                alt=""
                className="w-64 h-64 rounded-full"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">About me</h1>
            <div className="max-h-[300px] overflow-y-scroll">
              <div className="mt-6 list-inside descriptionDetail">
                <p>{authInfo.description}</p>
                {/* {Parser(courseData.course.descriptionDetail)} */}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-2xl">List courses:</h1>
            <div className="mt-3">
              <CartCourseList authorID={userID} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFrontPage;
