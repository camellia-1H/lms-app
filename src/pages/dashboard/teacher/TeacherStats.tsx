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
import { PAYMENT_STATUS } from '../../../constants/common';
import { Tag } from 'primereact/tag';
import {
  useGetListPaymentQuery,
  useGetRevenueQuery,
} from '../../../redux/userApi';
import { numberWithCommas } from '../../../utils/common';
import { Tooltip } from 'primereact/tooltip';
import TeacherPayment from '../../../components/Dashboard/TeacherPayment';
import TeacherRevenue from '../../../components/Dashboard/TeacherRevenue';

const TeacherStatsDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  // const [filters, setFilters] = useState<any>(null);
  // const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  // const {
  //   data: revenues,
  //   isLoading,
  //   isSuccess,
  // } = useGetRevenueQuery(user.userID);

  // const {
  //   data: listPayment,
  //   isLoading: isPaymentLoading,
  //   isSuccess: isPaymentSuccess,
  // } = useGetListPaymentQuery(user.userID);

  // useEffect(() => {
  //   initFilters();
  // }, []);

  // const clearFilter = () => {
  //   initFilters();
  // };

  // const initFilters = () => {
  //   setFilters({
  //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  //     userID: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  //     },
  //     amount: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  //     },
  //     createdAt: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  //     },
  //     courseID: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  //     },
  //     description: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  //     },
  //     payment_flg: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  //     },
  //   });
  //   setGlobalFilterValue('');
  // };

  // const onGlobalFilterChange = (e: any) => {
  //   const value = e.target.value;
  //   let _filters = { ...filters };

  //   _filters['global'].value = value;

  //   setFilters(_filters);
  //   setGlobalFilterValue(value);
  // };

  // const renderHeader = () => {
  //   return (
  //     <div className="flex justify-end">
  //       <button type="button" className="mr-4" onClick={clearFilter}>
  //         Clear Filter
  //       </button>
  //       <IconField iconPosition="left">
  //         <InputText
  //           value={globalFilterValue}
  //           onChange={onGlobalFilterChange}
  //           placeholder="Keyword Search"
  //         />
  //       </IconField>
  //     </div>
  //   );
  // };
  // const header = renderHeader();

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

  // const courseBodyTemplate = (payment: any) => {
  //   return (
  //     <>
  //       <Tooltip
  //         target=".courseID"
  //         mouseTrack
  //         mouseTrackLeft={10}
  //         className="bg-transparent px-1 py-2"
  //       />
  //       <button
  //         onClick={() => navigate(`/courses/${payment.courseID}`)}
  //         className="courseID"
  //         data-pr-tooltip="View course"
  //       >
  //         {payment.courseID}
  //       </button>
  //     </>
  //   );
  // };

  // const amountBodyTemplate = (payment: any) => {
  //   return payment.amount ? numberWithCommas(payment.amount) : 'Free';
  // };

  return (
    <div className="">
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
      <div
        className="flex flex-col
       gap-y-4 mt-4"
      >
        <TeacherRevenue />
        <TeacherPayment />
      </div>
    </div>
  );
};

export default TeacherStatsDashPage;
