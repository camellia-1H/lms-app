import { FC, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';

import { useGetRevenueQuery } from '../../../redux/userApi';
import Loader from '../../../components/Loader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  COURSE_STATUS,
  FLAG_REQUEST,
  PAYMENT_STATUS,
} from '../../../constants/common';
import { Tag } from 'primereact/tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faChevronCircleLeft,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { numberWithCommas } from '../../../utils/common';
import { Tooltip } from 'primereact/tooltip';
import {
  useGetListCourseOfTeacherQuery,
  useManagePublicCourseMutation,
} from '../../../redux/adminApi';
import { useDeleteCourseMutation } from '../../../redux/coursesApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const TeacherCoursesDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { userID } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [globalFilterValuePayment, setGlobalFilterValuePayment] =
    useState<string>('');

  const {
    data: listCourses,
    isLoading,
    isSuccess: isSuccessGetListCourses,
    refetch,
  } = useGetListCourseOfTeacherQuery(userID);

  const {
    data: revenues,
    isLoading: isLoadingPayment,
    isSuccess,
  } = useGetRevenueQuery(state.userID);

  const [managePublicCourse] = useManagePublicCourseMutation();
  const [deleteCourse, { isLoading: deleteCourseLoading }] =
    useDeleteCourseMutation();

  const handleAcceptPublicCourse = async (course: any) => {
    await managePublicCourse({
      authorID: state.userID,
      courseID: course.courseID,
      flg: FLAG_REQUEST.ACCEPT,
    }).unwrap();
    refetch();
  };

  const handleRejectPublicCourse = async (course: any) => {
    await managePublicCourse({
      authorID: state.userID,
      courseID: course.courseID,
      flg: FLAG_REQUEST.REJECT,
    }).unwrap();
    refetch();
  };

  const handleDeleteCourse = async (course: any) => {
    try {
      await deleteCourse({
        userLoginID: user.userID,
        userID: course.userID,
        courseID: course.courseID,
      }).unwrap();
      toast.success('Delete Course success');
    } catch (error) {
      toast.error('Not Permission');
    }
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
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      category: {
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

  const imageBodyTemplate = (course: any) => {
    return (
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-[6rem] h-16 rounded-lg"
      />
    );
  };
  const getSeverity = (course: any) => {
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
    console.log(course);

    return (
      <div className="flex gap-x-2">
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
        {course.courseStatus === COURSE_STATUS.PENDING && (
          <div className="flex gap-x-2">
            <button
              className="text-sm font-semibold text-green-400 hover:text-green-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
              onClick={() => handleAcceptPublicCourse(course)}
            >
              Accecpt
            </button>
            <button
              className="text-sm font-semibold text-red-400 hover:text-red-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
              onClick={() => handleRejectPublicCourse(course)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    );
  };

  const categoryBodyTemplate = (course: any) => {
    let category = '';
    if (course.category.length) {
      (course.category as any[]).forEach((item) => {
        category += `${(item.split('#')[1] as string).replace('_', ' ')}, `;
      });
    }

    return category;
  };

  const header = renderHeader();
  //// rev
  useEffect(() => {
    initFiltersPayment();
  }, []);

  const clearFilterPayment = () => {
    initFilters();
  };

  const initFiltersPayment = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      userID: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      amount: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      createdAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      courseID: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      description: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      payment_flg: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    setGlobalFilterValuePayment('');
  };

  const onGlobalFilterChangePayment = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValuePayment(value);
  };

  const renderHeaderPayment = () => {
    return (
      <div className="flex justify-end">
        <button type="button" className="mr-4" onClick={clearFilterPayment}>
          Clear Filter
        </button>
        <IconField iconPosition="left">
          <InputText
            value={globalFilterValuePayment}
            onChange={onGlobalFilterChangePayment}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };
  const headerPayment = renderHeaderPayment();

  const getSeverityPayment = (paymentInfo: any) => {
    switch (paymentInfo.payment_flg) {
      case PAYMENT_STATUS.CANCEL:
        return 'danger';
      case PAYMENT_STATUS.SUCCESS:
        return 'success';

      default:
        return null;
    }
  };
  const paymentBodyTemplate = (payment: any) => {
    let value;
    switch (payment.payment_flg) {
      case PAYMENT_STATUS.SUCCESS: {
        value = 'Success';
        break;
      }
      default:
        value = 'Cancel';
    }
    return <Tag value={value} severity={getSeverityPayment(payment)}></Tag>;
  };

  const courseBodyTemplate = (payment: any) => {
    return (
      <>
        <Tooltip
          target=".courseID"
          mouseTrack
          mouseTrackLeft={10}
          className="bg-transparent px-1 py-2"
        />
        <button
          onClick={() => navigate(`/courses/${payment.courseID}`)}
          className="courseID"
          data-pr-tooltip="View course"
        >
          {payment.courseID}
        </button>
      </>
    );
  };

  const amountBodyTemplate = (payment: any) => {
    return payment.amount ? numberWithCommas(payment.amount) : 'Free';
  };

  return (
    <div className="flex flex-col gap-y-8">
      {(isLoading || isLoadingPayment || deleteCourseLoading) && <Loader />}
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
          {isSuccessGetListCourses && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Course</h2>
              <h1 className="">
                <strong>Name </strong>: {state?.name}
              </h1>
              <div className="flex justify-between items-center mt-3">
                <div className="rounded-lg bg-white w-1/4 mr-5 p-3">
                  <div className="flex items-center content-center">
                    <FontAwesomeIcon
                      icon={faChartSimple}
                      className="text-xl mr-5 rounder p-3 bg-gray-100 rounded-full text-sky-500"
                    />
                    <div>
                      <p className="text-slate-400">Total Course</p>
                      <p className="font-bold">{state?.totalCourses}</p>
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
                        <p className="font-bold">{state?.totalStudents}</p>
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
                        {numberWithCommas(state?.totalRevenue)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isSuccessGetListCourses && (
        <div className="mt-4">
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
            selectionMode="single"
            onSelectionChange={(e) => {
              navigate(`/courses/${e.value.courseID}`);
            }}
            filters={filters}
            globalFilterFields={['title', 'category', 'createdAt', 'updatedAt']}
            header={header}
            emptyMessage="No course found."
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
              className="text-lg font-bold"
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
              style={{
                fontSize: '16px',
                minWidth: '12rem',
                overflow: 'hidden',
              }}
              className="text-lg"
              body={categoryBodyTemplate}
            />
            <Column
              field="courseStatus"
              header="Status"
              sortable
              body={statusBodyTemplate}
              className="text-lg"
            />
            <Column
              field="createdAt"
              header="CreatedAt"
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
            <Column
              field="custom"
              style={{
                fontSize: '16px',
                minWidth: '12rem',
                overflow: 'hidden',
              }}
              className="text-lg"
              body={(rowData) => {
                return (
                  <div className="flex gap-x-2">
                    <button
                      className="font-semibold text-sky-400 hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                      onClick={() =>
                        navigate(`/courses/${rowData.courseID}/draft`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="font-semibold text-red-400 hover:text-red-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                      onClick={() => handleDeleteCourse(rowData)}
                    >
                      Delete
                    </button>
                  </div>
                );
              }}
            />
          </DataTable>
        </div>
      )}
      <div className="">
        {isSuccess && (
          <div>
            <h1 className="text-xl font-bold">Revenue</h1>
            <DataTable
              value={revenues}
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
                // navigate(`/courses/${e.value.progressID.split('#')[1]}`);
                // setSelectedProduct(e.value);
              }}
              filters={filters}
              globalFilterFields={[
                'userID',
                'courseID',
                'amount',
                'description',
                'payment_flg',
                'createdAt',
              ]}
              header={headerPayment}
              emptyMessage="No payment found."
              resizableColumns
            >
              <Column
                field="userID"
                header="userID"
                sortable
                style={{
                  fontSize: '16px',
                  minWidth: '8rem',
                  overflow: 'hidden',
                }}
                className="text-lg"
              />
              <Column
                field="courseID"
                header="Course ID"
                sortable
                style={{
                  fontSize: '16px',
                  minWidth: '8rem',
                  overflow: 'hidden',
                }}
                className="text-lg"
                body={courseBodyTemplate}
              />
              <Column
                field="amount"
                header="Amount"
                sortable
                style={{
                  fontSize: '16px',
                  minWidth: '8rem',
                  overflow: 'hidden',
                }}
                className="text-lg"
                body={amountBodyTemplate}
              />
              <Column
                field="createdAt"
                header="Created At"
                sortable
                style={{
                  fontSize: '16px',
                  minWidth: '10rem',
                  overflow: 'hidden',
                }}
                className="text-lg"
              />
              <Column
                field="description"
                header="Description"
                sortable
                style={{
                  fontSize: '16px',
                  minWidth: '8rem',
                  overflow: 'hidden',
                }}
                className="text-lg"
              />
              <Column
                field="payment_flg"
                header="Status"
                sortable
                style={{
                  fontSize: '16px',
                  minWidth: '8rem',
                  overflow: 'hidden',
                }}
                className="text-lg"
                body={paymentBodyTemplate}
              />
            </DataTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCoursesDashPage;
