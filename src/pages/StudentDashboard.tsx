import * as React from 'react';
import {
  faArrowRight,
  faChartSimple,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';
import { useGetUserInfoMutation } from '../redux/userApi';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const StudentDashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  const [userInfo, setUserInfo] = useState<any>();

  const [
    getAuthorInfo,
    { isLoading: loadingGetAuth, isSuccess: successGetAuth },
  ] = useGetUserInfoMutation();

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      const data = await getAuthorInfo({
        userID: user.userID,
      }).unwrap();
      setUserInfo(data.userInfo);
    };
    fetchAuthorInfo();
  }, []);

  return (
    <>
      {loadingGetAuth && <Loader />}
      {successGetAuth && (
        <div className="flex flex-col gap-y-3">
          <div className="self-end">
            <Link to={'/'} className="flex items-center">
              <span className="mr-3">Home</span>
              <img
                className="h-10 w-10 rounded-full"
                src={userInfo?.avatar}
                alt="khong cos avaldad"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-y-4">
            <div>
              <h2 className="text-3xl font-bold">DASHBOARD</h2>
            </div>
            <div className="flex">
              <div className="rounded-lg bg-white w-2/6 mr-5 p-3">
                <div className="flex items-center content-center">
                  <FontAwesomeIcon
                    icon={faChartSimple}
                    className="text-xl mr-5 rounder p-3 bg-gray-100 rounded-full text-sky-500"
                  />
                  <div>
                    <p className="text-slate-400">Learning Times</p>
                    <p className="font-bold">2h 37m</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white w-2/6 mr-5 p-3">
                <div className="flex items-center content-center">
                  <FontAwesomeIcon
                    icon={faChartSimple}
                    className="text-xl mr-5 rounder p-3 bg-gray-100 rounded-full text-sky-500"
                  />
                  <div>
                    <p className="text-slate-400">Learning Course</p>
                    <p className="font-bold">21 Course</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-3/4 bg-white p-3 justify-between rounded-lg">
              <p className="text-xl font-bold">My Courses</p>
              <div className="flex justify-between content-center items-center mb-10">
                <p>Image</p>
                <div>
                  <p>History of India</p>
                  <p>By Random Author</p>
                </div>
                <ProgressBar className="w-1/5" completed={50} />
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-xl mr-2 rounder"
                  />
                  <p>5</p>
                </div>
                <button
                  type="submit"
                  className="mr-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  View Course
                </button>
              </div>
              <div className="flex justify-between content-center items-center mb-10">
                <p>Image</p>
                <div>
                  <p>History of India</p>
                  <p>By Random Author</p>
                </div>
                <ProgressBar className="w-1/5" completed={50} />
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-xl mr-2 rounder"
                  />
                  <p>5</p>
                </div>
                <button
                  type="submit"
                  className="mr-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  View Course
                </button>
              </div>
              <div className="flex justify-between content-center items-center mb-10">
                <p>Image</p>
                <div>
                  <p>History of India</p>
                  <p>By Random Author</p>
                </div>
                <ProgressBar className="w-1/5" completed={50} />
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-xl mr-2 rounder"
                  />
                  <p>5</p>
                </div>
                <button
                  type="submit"
                  className="mr-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  View Course
                </button>
              </div>
              <div className="flex flex-row-reverse content-center items-center text-blue-800 hover:text-blue-900">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xl mr-5 rounder"
                />
                <p className="mx-3">View all</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDashboardPage;
