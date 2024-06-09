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
import {
  useGetListCoursesProgressQuery,
  useGetUserInfoMutation,
} from '../redux/userApi';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const StudentDashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  const [userInfo, setUserInfo] = useState<any>();

  const navigate = useNavigate();

  const [
    getAuthorInfo,
    { isLoading: loadingGetAuth, isSuccess: successGetAuth },
  ] = useGetUserInfoMutation();

  const {
    data: listCoursesProgress,
    isLoading,
    isSuccess,
  } = useGetListCoursesProgressQuery(user.userID);

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
      {(loadingGetAuth || isLoading) && <Loader />}
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
                    <p className="font-bold">2 Course</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-full bg-white p-3 justify-between rounded-lg">
              <p className="text-xl font-bold">My Courses</p>
              {isSuccess && (
                <DataTable
                  value={listCoursesProgress.courses}
                  tableStyle={{ minWidth: '50rem' }}
                  paginator
                  rows={5}
                  stripedRows
                  sortMode="multiple"
                  removableSort
                  showGridlines
                  selectionMode="single"
                  onSelectionChange={(e) => {
                    console.log(e);
                    navigate(`/courses/${e.value.progressID.split('#')[1]}`);
                  }}
                  className="mt-10"
                >
                  <Column
                    field="courseTitle"
                    header="Course Title"
                    sortable
                    style={{
                      fontSize: '16px',
                      minWidth: '12rem',
                      overflow: 'hidden',
                    }}
                    className="text-lg"
                  />
                  <Column
                    field="completed"
                    header="Completed"
                    sortable
                    style={{
                      fontSize: '16px',
                      minWidth: '12rem',
                      overflow: 'hidden',
                    }}
                    className="text-lg"
                    body={(rowData) => {
                      return (
                        <ProgressBar
                          completed={Math.ceil(
                            (rowData.completed.length / rowData.totalChapters) *
                              100
                          )}
                          height="10px"
                          labelSize="10px"
                        />
                      );
                    }}
                  />

                  <Column
                    field="createdAt"
                    header="Bought at"
                    sortable
                    style={{
                      fontSize: '16px',
                      minWidth: '12rem',
                      overflow: 'hidden',
                    }}
                    className="text-lg"
                  />

                  <Column
                    field="updatedAt"
                    header="UpdatedAt"
                    sortable
                    style={{
                      fontSize: '16px',
                      minWidth: '12rem',
                      overflow: 'hidden',
                    }}
                    className="text-lg"
                  />
                </DataTable>
              )}
              <div className="flex flex-row-reverse content-center items-center text-blue-800 hover:text-blue-900">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xl mr-5 rounder"
                />
                <button
                  onClick={() => navigate('/student/courses')}
                  className="mx-3"
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDashboardPage;
