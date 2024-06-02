import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { RootState } from '../../redux/store';
import { useGetListCoursesProgressQuery } from '../../redux/userApi';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

const StudentCoursesDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  // const [listCourses, setCourses] = useState<any[]>();

  const columns = [
    { field: 'courseTitle', header: 'courseTitle' },
    { field: 'completed', header: 'completed' },
    { field: 'createdAt', header: 'createdAt' },
    { field: 'updatedAt', header: 'updatedAt' },
  ];

  const {
    data: listCoursesProgress,
    isLoading,
    isSuccess,
  } = useGetListCoursesProgressQuery(user.userID);
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
            <h2 className="text-3xl font-bold">Profile</h2>
          </div>
        </div>
      </div>
      {isSuccess && (
        <DataTable
          value={listCoursesProgress.courses}
          tableStyle={{ minWidth: '50rem' }}
        >
          {columns.map((col, i) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
            ></Column>
          ))}
        </DataTable>
      )}
    </div>
  );
};

export default StudentCoursesDashPage;
