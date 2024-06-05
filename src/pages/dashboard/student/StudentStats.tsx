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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { PAYMENT_STATUS } from '../../../constants/common';
import { Tag } from 'primereact/tag';

const listStats = [
  {
    paymentID: 'paymentID1',
    paymentID: 955484,
    userID: '20240530063906352ITZY',
    amount: 1000,
    createdAt: '30/05/2024 14:29:59',
    description: 'Thong tin don hang',
    paymentStatus: PAYMENT_STATUS.CANCEL,
  },
  {
    paymentID: 'paymentID2',
    paymentID: 145677,
    userID: '20240530063906352ITZY',
    amount: 1000,
    createdAt: '30/05/2024 02:23:41',
    description: 'Thong tin don hang',
    paymentStatus: PAYMENT_STATUS.SUCCESS,
  },
  {
    paymentID: 'paymentID1',
    paymentID: 425498,
    userID: '20240530063906352ITZY',
    amount: 1000,
    createdAt: '30/05/2024 12:41:28',
    description: 'Thong tin don hang mua khoa hoc',
    paymentStatus: PAYMENT_STATUS.CANCEL,
  },
  {
    paymentID: 'paymentID1',
    paymentID: 753629,
    userID: '20240530063906352ITZY',
    amount: 3000,
    createdAt: '02/06/2024 11:29:01',
    description: 'mua khoa học',
    paymentStatus: PAYMENT_STATUS.CANCEL,
  },
  {
    paymentID: 'paymentID1',
    paymentID: 412085,
    userID: '20240530063906352ITZY',
    amount: 1000,
    createdAt: '30/04/2024 17:51:20',
    description: 'Thong tin don hang',
    paymentStatus: PAYMENT_STATUS.CANCEL,
  },
];

const StudentStatsDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  // const {
  //   data: listReviews,
  //   isLoading,
  //   isSuccess,
  // } = useGetListReviewsQuery(user.userID);

  useEffect(() => {
    initFilters();
  }, []);

  const clearFilter = () => {
    initFilters();
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      paymentID: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      amount: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      createdAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      paymentStatus: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      description: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
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

  const getSeverity = (paymentInfo: any) => {
    switch (paymentInfo.paymentStatus) {
      case PAYMENT_STATUS.CANCEL:
        return 'danger';
      case PAYMENT_STATUS.SUCCESS:
        return 'success';

      default:
        return null;
    }
  };
  const paymentBodyTemplate = (course: any) => {
    let value;
    switch (course.courseStatus) {
      case PAYMENT_STATUS.SUCCESS: {
        value = 'Success';
        break;
      }
      default:
        value = 'Cancel';
    }
    return <Tag value={value} severity={getSeverity(course)}></Tag>;
  };

  return (
    <div className="">
      {/* {isLoading && <Loader />} */}
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
            <h2 className="text-3xl font-bold">Manage Stats</h2>
          </div>
        </div>
      </div>
      {/* {isSuccess && ( */}
      <DataTable
        value={listStats}
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
        globalFilterFields={[
          'paymentID',
          'amount',
          'createdAt',
          'paymentStatus',
          'description',
        ]}
        header={header}
        emptyMessage="No customers found."
        className="mt-10"
        resizableColumns
      >
        <Column
          field="paymentID"
          header="Payment ID"
          sortable
          style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
          className="text-lg"
        />
        <Column
          field="amount"
          header="Amount"
          sortable
          style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
          className="text-lg"
        />

        <Column
          field="createdAt"
          header="Created At"
          sortable
          style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
          className="text-lg"
        />
        <Column
          field="description"
          header="Description"
          sortable
          style={{ fontSize: '16px', minWidth: '8rem', overflow: 'hidden' }}
          className="text-lg"
        />
        <Column
          field="paymentStatus"
          header="Status"
          sortable
          style={{ fontSize: '18px', maxWidth: '6rem', overflow: 'hidden' }}
          className="text-lg"
          body={paymentBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default StudentStatsDashPage;
