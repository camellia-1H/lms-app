import * as React from 'react';
import {
  faArrowRight,
  faChartSimple,
  faVideo,
  faUsers,
  faCircleCheck,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserInfoMutation } from '../redux/userApi';
import Loader from '../components/Loader';
import { useGetListCoursesMutation } from '../redux/coursesApi';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Accordion, AccordionTab } from 'primereact/accordion';

import {
  COURSE_STATUS,
  LIMIT_COURSE_BASIC,
  PACKAGE_TYPE,
} from '../constants/common';
import { numberWithCommas } from '../utils/common';

const TeacherDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<any>();
  const [listCourses, setListCourses] = useState<any[]>([]);
  // const [hasMore, setMore] = useState<boolean>();
  const [getListCourses, { isSuccess: isSuccessGetListCourses }] =
    useGetListCoursesMutation();

  const [
    getAuthorInfo,
    { isLoading: loadingGetAuth, isSuccess: successGetAuth },
  ] = useGetUserInfoMutation();

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getListCourses({
        userID: user.userID,
        // lastEvaluatedKey: undefined,
        // limit: 3,
      }).unwrap();
      setListCourses(data.courses);
    };
    const fetchAuthorInfo = async () => {
      const data = await getAuthorInfo({
        userID: user.userID,
      }).unwrap();
      setUserInfo(data.userInfo);
    };
    fetchAuthorInfo();
    fetchCourses();
  }, []);

  /// DATA TABLE
  const imageBodyTemplate = (course: any) => {
    return (
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-[6rem] rounded-lg"
      />
    );
  };
  const getSeverity = (course: any) => {
    console.log(course);

    switch (course.courseStatus) {
      case COURSE_STATUS.REJECT:
        return 'danger';
      case COURSE_STATUS.PUBLIC:
        return 'success';
      case COURSE_STATUS.PENDING:
        return 'warning';
      default:
        return null;
    }
  };
  const statusBodyTemplate = (course: any) => {
    return (
      <Tag
        value={
          course.courseStatus === COURSE_STATUS.DEFAULT
            ? 'Default'
            : course.courseStatus === COURSE_STATUS.PENDING
            ? 'Pending'
            : course.courseStatus === COURSE_STATUS.PUBLIC
            ? 'Public'
            : 'Reject'
        }
        severity={getSeverity(course)}
      ></Tag>
    );
  };
  const categoryBodyTemplate = (course: any) => {
    let category = '';
    if (course.category.length) {
      (course.category as any[]).forEach((item) => {
        category += `${(item.split('#')[1] as string).replace('_', ' ')}, `;
      });
    }
    console.log(category);

    return category;
  };

  return (
    <>
      {loadingGetAuth && <Loader />}
      <div className="flex flex-col gap-y-3">
        {successGetAuth && (
          <div className="self-end">
            <Link to={'/'} className="flex items-center">
              <span className="mr-3">Home</span>
              <img
                className="h-10 w-10 rounded-full"
                src={user?.avatar}
                alt="khong cos avaldad"
              />
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-y-4">
          <div>
            <h2 className="text-3xl font-bold">DASHBOARD</h2>
          </div>
        </div>
      </div>
      {successGetAuth && userInfo && (
        <>
          <div className="flex justify-between items-center mt-3">
            <div className="rounded-lg bg-white w-1/4 mr-5 p-3">
              <div className="flex items-center content-center">
                <FontAwesomeIcon
                  icon={faChartSimple}
                  className="text-xl mr-5 rounder p-3 bg-gray-100 rounded-full text-sky-500"
                />
                <div>
                  <p className="text-slate-400">Total Course</p>
                  <p className="font-bold">{userInfo.totalCourses}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white w-1/4 mr-5 p-3">
              <div className="flex justify-between items-center content-center">
                <div className="flex justify-between items-center content-center">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-xl mr-5 rounder p-3 bg-gray-100 rounded-full text-sky-500"
                  />
                  <div>
                    <p className="text-slate-400">Students</p>
                    <p className="font-bold">{userInfo.totalStudents}</p>
                  </div>
                </div>
                {/* <FontAwesomeIcon icon={faArrowRight} className='text-3xl mr-5 rounder'/> */}
              </div>
            </div>
            <div className="rounded-lg bg-green-400 text-white w-1/4 p-3">
              <div className="flex items-center content-center">
                <FontAwesomeIcon
                  icon={faChartSimple}
                  className="text-xl mr-5 rounder p-3 bg-gray-100 rounded-full text-sky-500"
                />
                <div>
                  <p>Earning</p>
                  <p className="font-bold">
                    {numberWithCommas(userInfo.totalRevenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="w-full bg-white p-3 rounded-lg">
              <h1 className="text-3xl font-bold">Course</h1>
              {isSuccessGetListCourses && (
                <div className="px-5 pt-5 flex flex-col">
                  <DataTable
                    value={listCourses}
                    tableStyle={{ minWidth: '50rem' }}
                    paginator
                    rows={5}
                    sortMode="multiple"
                    stripedRows
                    showGridlines
                    columnResizeMode="expand"
                    resizableColumns
                  >
                    <Column
                      field="title"
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
                      field="imageUrl"
                      header="Thumbnail"
                      body={imageBodyTemplate}
                      className="text-lg"
                    />
                    <Column
                      field="category"
                      header="Category"
                      sortable
                      style={{ fontSize: '18px', maxWidth: '8rem' }}
                      className="text-lg"
                      body={categoryBodyTemplate}
                    />
                    <Column
                      field="courseStatus"
                      header="Status"
                      sortable
                      style={{ fontSize: '18px', maxWidth: '4.5rem' }}
                      body={statusBodyTemplate}
                      className="text-lg"
                    />
                  </DataTable>
                  <div className="flex flex-row-reverse content-center items-center text-lg text-green-500 hover:text-green-900 font-bold">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xl rounder"
                    />
                    <button
                      onClick={() => navigate('/teacher/courses')}
                      className="mx-3"
                    >
                      View all
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="mt-3 flex justify-between flex-col">
              <h1 className="text-2xl font-bold mb-5">Package</h1>
              <Accordion>
                {(userInfo?.role as string).includes(PACKAGE_TYPE.BASIC) ? (
                  <AccordionTab
                    header={
                      <div className="flex gap-x-3 items-center">
                        <span>Package Basic</span>
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="text-xl text-green-500"
                        />
                      </div>
                    }
                  >
                    <div>
                      <div className="flex gap-x-3 items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-xl text-green-500"
                        />
                        <span>
                          Limit Course : <strong>{LIMIT_COURSE_BASIC}</strong>
                        </span>
                      </div>
                    </div>
                  </AccordionTab>
                ) : (
                  <AccordionTab
                    header={
                      <div className="flex gap-x-3 items-center">
                        <span>Package Pro</span>
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="text-xl text-green-500"
                        />
                      </div>
                    }
                  >
                    <div>
                      <div className="flex gap-x-3 items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-xl text-green-500"
                        />
                        <span>
                          Limit Course : <strong>No Limit</strong>
                        </span>
                      </div>
                    </div>
                  </AccordionTab>
                )}
              </Accordion>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TeacherDashboard;
