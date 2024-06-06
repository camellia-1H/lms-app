import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';

import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { RootState } from '../../../redux/store';
import { useGetListReviewsQuery } from '../../../redux/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const TeacherReviewsDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const {
    data: listReviews,
    isLoading,
    isSuccess,
  } = useGetListReviewsQuery(user.userID);

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

  const rateBodyTemplate = (reviewInfo: any) => {
    return (
      <div>
        <span>{reviewInfo.rate}</span>
        <FontAwesomeIcon icon={faStar} className="text-lg text-yellow-500" />
      </div>
    );
  };

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
            <h2 className="text-3xl font-bold">Review of courses</h2>
          </div>
        </div>
      </div>
      {isSuccess && (
        <DataTable
          value={listReviews}
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
            // navigate(`/courses/${e.value.progressID.split('#')[1]}`);
            // setSelectedProduct(e.value);
          }}
          filters={filters}
          globalFilterFields={['courseTitle', 'createdAt', 'updatedAt']}
          header={header}
          emptyMessage="No customers found."
          className="mt-10"
          resizableColumns
        >
          <Column
            field="courseTitle"
            header="Course Title"
            sortable
            style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
            className="text-md"
          />
          <Column
            field="userID"
            header="UserID"
            sortable
            style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
            className="text-md"
          />
          <Column
            field="name"
            header="Name"
            sortable
            style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
            className="text-md"
          />
          <Column
            field="review"
            header="Review"
            sortable
            style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
            className="text-md"
          />
          <Column
            field="rate"
            header="Rate"
            sortable
            style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
            className="text-md"
            body={rateBodyTemplate}
          />
          <Column
            field="updatedAt"
            header="UpdatedAt"
            sortable
            style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
            className="text-md"
          />
          <Column
            field="custom"
            style={{ fontSize: '16px', minWidth: '12rem', overflow: 'hidden' }}
            className="text-lg"
            body={(rowData) => {
              return (
                <div>
                  <button
                    className="px-3 py-2 text-lg font-semibold text-sky-400 hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"

                    // onClick={() => handleEdit(rowData)}
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
      )}
    </div>
  );
};

export default TeacherReviewsDashPage;
