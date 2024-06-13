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

const StudentCoursesDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  // const [listCourses, setCourses] = useState<any[]>();
  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  // const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const {
    data: listCoursesProgress,
    isLoading,
    isSuccess,
  } = useGetListCoursesProgressQuery(user.userID);

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
          <div>
            <h2 className="text-3xl font-bold">Course Progress</h2>
          </div>
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
          className="mt-10"
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
    </div>
  );
};

export default StudentCoursesDashPage;
