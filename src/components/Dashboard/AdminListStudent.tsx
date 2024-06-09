import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';

import Loader from '../Loader';
import { RootState } from '../../redux/store';
import {
  FLAG_REQUEST,
  PAYMENT_STATUS,
  REQUEST_TEACHER,
  VERIFY_FLAG,
} from '../../constants/common';
import { Tag } from 'primereact/tag';
import {
  useGetListUserQuery,
  useManageRequestTeacherAdminMutation,
} from '../../redux/adminApi';
import { useNavigate } from 'react-router-dom';

const AdminListStudent: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const [filters, setFilters] = useState<any>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const {
    data: listUser,
    isLoading,
    isSuccess,
    refetch,
  } = useGetListUserQuery();

  const [manageRequestTeacher] = useManageRequestTeacherAdminMutation();

  useEffect(() => {
    initFilters();
  }, []);

  const clearFilter = () => {
    initFilters();
  };

  // userID', 'email', 'name'
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

  const handleAcceptRequestTeacher = async (student: any) => {
    await manageRequestTeacher({
      userID: student.userID,
      flg: FLAG_REQUEST.ACCEPT,
    }).unwrap();
    refetch();
  };

  const handleRejectRequestTeacher = async (student: any) => {
    console.log(student);

    await manageRequestTeacher({
      userID: student.userID,
      flg: FLAG_REQUEST.REJECT,
    }).unwrap();
    refetch();
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

  const getSeverity = (payment: any) => {
    switch (payment.verify_flg) {
      case VERIFY_FLAG.NOT_VERIFY:
        return 'danger';
      case VERIFY_FLAG.VERIFIED:
        return 'success';

      default:
        return null;
    }
  };
  const statusBodyTemplate = (payment: any) => {
    let value;
    switch (payment.verify_flg) {
      case VERIFY_FLAG.VERIFIED: {
        value = 'Verified';
        break;
      }
      default:
        value = 'Not verify';
    }
    return <Tag value={value} severity={getSeverity(payment)}></Tag>;
  };

  const getSeverityRequestTeacher = (student: any) => {
    switch (student.requestTeachStatus) {
      case REQUEST_TEACHER.REJECT:
        return 'danger';
      case REQUEST_TEACHER.ACCEPT:
        return 'success';
      case REQUEST_TEACHER.PENDING:
        return 'warning';
      default:
        return null;
    }
  };
  const requestTeachStatusTemplateBody = (student: any) => {
    return (
      <div className="flex gap-x-2">
        <Tag
          value={
            student.requestTeachStatus === REQUEST_TEACHER.DEFAULT
              ? 'Default'
              : student.requestTeachStatus === REQUEST_TEACHER.PENDING
              ? 'Pending'
              : student.requestTeachStatus === REQUEST_TEACHER.ACCEPT
              ? 'Accept'
              : 'Reject'
          }
          severity={getSeverityRequestTeacher(student)}
        ></Tag>
        {student.requestTeachStatus === REQUEST_TEACHER.PENDING && (
          <div className="flex gap-x-2">
            <button
              className="text-sm font-semibold text-green-400 hover:text-green-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
              onClick={() => handleAcceptRequestTeacher(student)}
            >
              Accecpt
            </button>
            <button
              className="text-sm font-semibold text-red-400 hover:text-red-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
              onClick={() => handleRejectRequestTeacher(student)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="">
      {isLoading && <Loader />}

      {isSuccess && (
        <div>
          <h1 className="text-xl font-bold">List Student</h1>
          <DataTable
            value={listUser}
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
              navigate(`/admin/student/${e.value.userID}`, {
                state: e.value,
              });
              // setSelectedProduct(e.value);
            }}
            filters={filters}
            globalFilterFields={['userID', 'email', 'name']}
            header={header}
            emptyMessage="No student found."
            resizableColumns
          >
            <Column
              field="userID"
              header="User ID"
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
              // body={amountBodyTemplate}
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
              field="verify_flg"
              header="Verify"
              sortable
              style={{
                fontSize: '16px',
                minWidth: '8rem',
                overflow: 'hidden',
              }}
              className="text-lg"
              body={statusBodyTemplate}
            />
            <Column
              field="requestTeachStatus"
              header="requestTeachStatus"
              sortable
              style={{
                fontSize: '16px',
                minWidth: '8rem',
                overflow: 'hidden',
              }}
              className="text-lg"
              body={requestTeachStatusTemplateBody}
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
                    {/* <button
                      className="text-sm font-semibold text-sky-400 hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"

                      // onClick={() => handleEdit(rowData)}
                    >
                      Edit
                    </button> */}
                    <button
                      className="text-sm font-semibold text-red-400 hover:text-red-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"

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

export default AdminListStudent;
