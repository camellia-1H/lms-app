import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { RootState } from '../../../redux/store';
import TeacherPayment from '../../../components/Dashboard/TeacherPayment';
import TeacherRevenue from '../../../components/Dashboard/TeacherRevenue';

const TeacherStatsDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

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
