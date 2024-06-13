import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';

import Loader from '../Loader';
import { RootState } from '../../redux/store';
import { useGetListTeacherQuery } from '../../redux/adminApi';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../../utils/common';

const AdminListTeacher: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const { data: listTeacher, isLoading, isSuccess } = useGetListTeacherQuery();

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
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      role: {
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

  // const getSeverity = (paymentInfo: any) => {
  //   switch (paymentInfo.payment_flg) {
  //     case PAYMENT_STATUS.CANCEL:
  //       return 'danger';
  //     case PAYMENT_STATUS.SUCCESS:
  //       return 'success';

  //     default:
  //       return null;
  //   }
  // };
  // const paymentBodyTemplate = (payment: any) => {
  //   let value;
  //   switch (payment.payment_flg) {
  //     case PAYMENT_STATUS.SUCCESS: {
  //       value = 'Success';
  //       break;
  //     }
  //     default:
  //       value = 'Cancel';
  //   }
  //   return <Tag value={value} severity={getSeverity(payment)}></Tag>;
  // };

  const amountBodyTemplate = (payment: any) => {
    return numberWithCommas(payment.totalRevenue);
  };

  return (
    <div className="">
      {isLoading && <Loader />}

      {isSuccess && (
        <div>
          <h1 className="text-xl font-bold">List Teacher</h1>
          <DataTable
            value={listTeacher}
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
              navigate(`/admin/teacher/${e.value.userID}`, {
                state: e.value,
              });
            }}
            filters={filters}
            globalFilterFields={[
              'userID',
              'email',
              'name',
              'role',
              'totalRevenue',
              'totalCourses',
            ]}
            header={header}
            emptyMessage="No customers found."
            resizableColumns
          >
            <Column
              field="userID"
              header="UserID"
              sortable
              style={{
                fontSize: '16px',
                minWidth: '8rem',
                overflow: 'hidden',
              }}
              className="text-lg"
            />
            <Column
              field="email"
              header="Email"
              sortable
              style={{
                fontSize: '16px',
                minWidth: '8rem',
                overflow: 'hidden',
              }}
              className="text-lg"
            />
            <Column
              field="name"
              header="Name"
              sortable
              style={{
                fontSize: '16px',
                minWidth: '8rem',
                overflow: 'hidden',
              }}
              className="text-lg"
            />
            <Column
              field="role"
              header="role"
              sortable
              style={{
                fontSize: '16px',
                minWidth: '8rem',
                overflow: 'hidden',
              }}
              className="text-lg"
            />
            <Column
              field="totalRevenue"
              header="totalRevenue"
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
              field="totalCourses"
              header="totalCourses"
              sortable
              style={{
                fontSize: '16px',
                minWidth: '8rem',
                overflow: 'hidden',
              }}
              className="text-lg"
              // body={paymentBodyTemplate}
            />
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default AdminListTeacher;
