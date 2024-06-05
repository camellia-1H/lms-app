import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';

import Loader from '../Loader';
import { RootState } from '../../redux/store';
import { PAYMENT_STATUS } from '../../constants/common';
import { Tag } from 'primereact/tag';
import { useGetListPaymentQuery } from '../../redux/userApi';
import { numberWithCommas } from '../../utils/common';

const TeacherPayment: FC = () => {
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

  const amountBodyTemplate = (payment: any) => {
    return payment.amount ? numberWithCommas(payment.amount) : 'Free';
  };

  return (
    <div className="">
      {isPaymentLoading && <Loader />}

      {isPaymentSuccess && (
        <div>
          <h1 className="text-xl font-bold">Payment</h1>
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
              'description',
              'payment_flg',
              'createdAt',
            ]}
            header={header}
            emptyMessage="No customers found."
            resizableColumns
          >
            <Column
              field="paymentID"
              header="PaymentID"
              sortable
              style={{
                fontSize: '16px',
                minWidth: '8rem',
                overflow: 'hidden',
              }}
              className="text-lg"
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
              field="createdAt"
              header="Created At"
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
  );
};

export default TeacherPayment;
