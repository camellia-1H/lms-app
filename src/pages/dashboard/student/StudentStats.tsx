import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { Tag } from 'primereact/tag';

import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { useGetListPaymentQuery } from '../../../redux/userApi';
import { RootState } from '../../../redux/store';
import { PAYMENT_STATUS } from '../../../constants/common';

const StudentStatsDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const {
    data: listPayment,
    isLoading: isPaymentLoading,
    isSuccess: isPaymentSuccess,
  } = useGetListPaymentQuery(user.userID);

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
    return <Tag value={value} severity={getSeverity(payment)}></Tag>;
  };

  return (
    <div className="">
      {isPaymentLoading && <Loader />}
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
      {isPaymentSuccess && (
        <DataTable
          value={listPayment}
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
      )}
    </div>
  );
};

export default StudentStatsDashPage;
