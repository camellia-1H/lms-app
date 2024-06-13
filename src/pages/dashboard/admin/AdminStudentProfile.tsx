import { FC, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';

import { useGetListCoursesProgressQuery } from '../../../redux/userApi';
import Loader from '../../../components/Loader';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FLAG_REQUEST, REQUEST_TEACHER } from '../../../constants/common';
import { useManageRequestTeacherAdminMutation } from '../../../redux/adminApi';
import { parseSecondToTime } from '../../../utils/common';

const AdminStudentProfile: FC = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  // const [listCourses, setCourses] = useState<any[]>();
  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  // const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const {
    data: listCoursesProgress,
    isLoading,
    isSuccess,
  } = useGetListCoursesProgressQuery(userID);
  const [manageRequestTeacher] = useManageRequestTeacherAdminMutation();

  const handleAcceptRequestTeacher = async () => {
    await manageRequestTeacher({
      userID: state.userID,
      flg: FLAG_REQUEST.ACCEPT,
    }).unwrap();
  };

  const handleRejectRequestTeacher = async () => {
    await manageRequestTeacher({
      userID: state.userID,
      flg: FLAG_REQUEST.REJECT,
    }).unwrap();
  };

  useEffect(() => {
    initFilters();
  }, []);

  const clearFilter = () => {
    initFilters();
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      courseTitle: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      createdAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      updatedAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue('');
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-end">
        <button type="button" className="mr-4" onClick={clearFilter}>
          Clear Filter
        </button>
        <IconField iconPosition="left">
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="">
      {isLoading && <Loader />}
      <div className="flex flex-col gap-y-3">
        <div className=" flex items-center gap-x-2">
          <FontAwesomeIcon icon={faChevronCircleLeft} />
          <button
            onClick={() => navigate(-1)}
            className="flex items-center hover:underline"
          >
            <span className="mr-3">Back</span>
          </button>
        </div>

        <div className="flex flex-col gap-y-4">
          {isSuccess && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Course Progress</h2>
              <h1 className="">
                <strong>Name </strong>: {state?.name}
              </h1>
              <div className="flex items-center">
                <div className="rounded-lg bg-white w-2/6 mr-5 p-3">
                  <div className="flex items-center content-center">
                    <FontAwesomeIcon
                      icon={faChartSimple}
                      className="text-xl mr-5 rounder p-3 bg-gray-100 rounded-full text-sky-500"
                    />
                    <div>
                      <p className="text-slate-400">Learning Times</p>
                      <p className="font-bold">
                        {parseSecondToTime(state.totalTimeLearn ?? 0)}
                      </p>
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
                      <p className="font-bold">
                        {listCoursesProgress.courses.length ?? 0} Course
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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
          // selection={selectedProduct}
          onSelectionChange={(e) => {
            console.log(e);
            navigate(`/courses/${e.value.progressID.split('#')[1]}`);
            // setSelectedProduct(e.value);
          }}
          filters={filters}
          globalFilterFields={['courseTitle', 'createdAt', 'updatedAt']}
          header={header}
          emptyMessage="No course found."
          className="mt-4"
        >
          <Column
            field="courseTitle"
            header="Course Title"
            sortable
            style={{ fontSize: '16px', minWidth: '12rem', overflow: 'hidden' }}
            className="text-lg"
          />
          <Column
            field="completed"
            header="Completed"
            sortable
            style={{ fontSize: '16px', minWidth: '12rem', overflow: 'hidden' }}
            className="text-lg"
            body={(rowData) => {
              return (
                <ProgressBar
                  completed={Math.ceil(
                    (rowData.completed.length / rowData.totalChapters) * 100
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
            style={{ fontSize: '16px', minWidth: '12rem', overflow: 'hidden' }}
            className="text-lg"
          />

          <Column
            field="updatedAt"
            header="UpdatedAt"
            sortable
            style={{ fontSize: '16px', minWidth: '12rem', overflow: 'hidden' }}
            className="text-lg"
          />
        </DataTable>
      )}
      <div>
        <h1 className="text-3xl font-bold">Request become teacher</h1>
        <div className="mt-6">
          {state?.requestTeachStatus === REQUEST_TEACHER.DEFAULT ? (
            <div className="flex gap-x-2">
              <span className="text-white px-3 py-2 text-xl font-semibold bg-sky-400 rounded-full">
                User is student
              </span>
            </div>
          ) : state?.requestTeachStatus === REQUEST_TEACHER.PENDING ? (
            <div className="flex gap-x-2">
              <span className="text-white px-3 py-2 text-xl font-semibold bg-yellow-400 rounded-full">
                Pending
              </span>
            </div>
          ) : state?.requestTeachStatus === REQUEST_TEACHER.REJECT ? (
            <div className="flex gap-x-2">
              <span className="px-3 py-2 text-xl font-semibold bg-gray-400 rounded-full text-gray-600">
                Rejected
              </span>
            </div>
          ) : (
            <h1>You are teacher</h1>
          )}
          {state.requestTeachStatus === REQUEST_TEACHER.PENDING && (
            <div className="flex gap-x-2">
              <button
                className="text-sm font-semibold text-green-400 hover:text-green-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                onClick={handleAcceptRequestTeacher}
              >
                Accecpt
              </button>
              <button
                className="text-sm font-semibold text-red-400 hover:text-red-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                onClick={handleRejectRequestTeacher}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentProfile;
