import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';

import { RootState } from '../../../redux/store';
import { useGetListCoursesProgressQuery } from '../../../redux/userApi';
import Loader from '../../../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import {
  useCreateCourseMutation,
  useGetListCoursesMutation,
} from '../../../redux/coursesApi';
import { COURSE_STATUS } from '../../../constants/common';
import { Tag } from 'primereact/tag';

const TeacherCoursesDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const [listCourses, setListCourses] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  // const [selectedProduct, setSelectedProduct] = useState<any>(null);
  // const [hasMore, setMore] = useState<boolean>();
  const [getListCourses, { isLoading, isSuccess: isSuccessGetListCourses }] =
    useGetListCoursesMutation();

  const [createCourse, { isSuccess, isLoading: createCourseLoading }] =
    useCreateCourseMutation();

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getListCourses({
        userID: user.userID,
        // lastEvaluatedKey: undefined,
        // limit: 3,
      }).unwrap();
      setListCourses(data.courses);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    initFilters();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate('/courses/create');
    }
  }, [createCourseLoading]);

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
    console.log(course);

    let category = '';
    if (course.category.length) {
      (course.category as any[]).forEach((item) => {
        category += `${(item.split('#')[1] as string).replace('_', ' ')}, `;
      });
    }
    console.log(category);

    return category;
  };
  const header = renderHeader();

  return (
    <div className="">
      {(isLoading || createCourseLoading) && <Loader />}
      <div className="flex flex-col gap-y-3">
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

        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">My Course</h2>
            <button
              onClick={() => {
                createCourse({ userID: user.userID, authorName: user.name });
              }}
              disabled={createCourseLoading}
              className={[
                createCourseLoading
                  ? 'bg-gray-500/70 '
                  : 'cursor-pointer hover:bg-black bg-blue-500 ',
                'px-3 py-2 rounded-lg text-white font-bold',
              ].join('')}
            >
              Create
            </button>
          </div>
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
              console.log(e);
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
                console.log(rowData);

                return (
                  <div>
                    <button
                      className="px-3 py-2 text-lg font-semibold text-sky-400 hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                      onClick={() =>
                        navigate(`/courses/${rowData.courseID}/draft`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 text-lg font-semibold text-red-400 hover:text-red-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"

                      // onClick={() => handleDelete(rowData)}
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
    </div>
  );
};

export default TeacherCoursesDashPage;
