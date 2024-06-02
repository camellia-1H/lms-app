import * as React from 'react';
import {
  faArrowRight,
  faChartSimple,
  faStar,
  faVideo,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImageForm } from '../components/CourseCreate/ImageForm';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import ScrollToBottom from 'react-scroll-to-bottom';
// import faker from 'faker';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import ProgressBar from '@ramonak/react-progress-bar';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: (info) => info.column.id,
  }),
];

// const [data, _setData] = React.useState(() => [...defaultData])
// const rerender = React.useReducer(() => ({}), {})[1]

// const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
// })

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data2 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const TeacherDashboard: React.FC = () => {
  const [data, _setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="dashboard w-11/12 mx-5 my-5">
      {/* <h2 className='text-center'>Student Dashboard</h2> */}
      <div className="flex justify-between">
        <div>
          <p>Hi Dixit,</p>
          <p className="text-3xl">Welcome to Sova!</p>
        </div>
        <div className="content-center">
          <input
            id="email-address"
            name="email"
            type="email"
            required
            className="mx-2 min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="..."
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <div className="rounded-lg bg-white w-1/4 mr-5 p-3">
          <div className="flex items-center content-center">
            <FontAwesomeIcon
              icon={faChartSimple}
              style={{
                color: '#63E6BE',
                padding: '10px',
                backgroundColor: '#f3f3f3',
                borderRadius: '20px',
              }}
              className="text-xl mr-5 rounder"
            />
            <div>
              <p className="text-slate-400">Live Course</p>
              <p className="font-bold">13</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white w-1/4 mr-5 p-3">
          <div className="flex items-center content-center">
            <FontAwesomeIcon
              icon={faVideo}
              style={{
                color: '#63E6BE',
                padding: '10px',
                backgroundColor: '#f3f3f3',
                borderRadius: '20px',
              }}
              className="text-xl mr-5 rounder"
            />
            <div>
              <p className="text-slate-400">Videos</p>
              <p className="font-bold">276</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white w-1/4 mr-5 p-3">
          <div className="flex justify-between items-center content-center">
            <div className="flex justify-between items-center content-center">
              <FontAwesomeIcon
                icon={faUsers}
                style={{
                  color: '#63E6BE',
                  padding: '10px',
                  backgroundColor: '#f3f3f3',
                  borderRadius: '20px',
                }}
                className="text-xl mr-5 rounder"
              />
              <div>
                <p className="text-slate-400">Students</p>
                <p className="font-bold">321</p>
              </div>
            </div>
            {/* <FontAwesomeIcon icon={faArrowRight} className='text-3xl mr-5 rounder'/> */}
          </div>
        </div>
        <div className="rounded-lg bg-green-400 text-white w-1/4 p-3">
          <div className="flex items-center content-center">
            <FontAwesomeIcon
              icon={faChartSimple}
              className="text-xl mr-5 rounder"
            />
            <div>
              <p>Earning</p>
              <p className="font-bold">$ 540.50</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-5">
        <div className="w-2/4 bg-white p-3 rounded-lg">
          <div className="px-5 pb-5 flex justify-between flex-col h-full">
            <div className="mt-5 flex justify-between flex-col">
              <p className="text-2xl font-bold mb-5">Top Courses</p>
              <div className="flex justify-between content-center items-center mb-10">
                <div className="flex content-center items-center">
                  <p>Image</p>
                  <div className="ml-20">
                    <p className="font-bold text-lg">History of India</p>
                    <p className="text-slate-500 text-sm">By Random Author</p>
                  </div>
                </div>
                <div>
                  <p className="text-green-500 font-bold text-lg">$150.00</p>
                  <p className="text-slate-500 text-sm">131 Subscribes</p>
                </div>
              </div>
              <div className="flex justify-between content-center items-center mb-10">
                <div className="flex content-center items-center">
                  <p>Image</p>
                  <div className="ml-20">
                    <p className="font-bold text-lg">History of India</p>
                    <p className="text-slate-500 text-sm">By Random Author</p>
                  </div>
                </div>
                <div>
                  <p className="text-green-500 font-bold text-lg">$150.00</p>
                  <p className="text-slate-500 text-sm">131 Subscribes</p>
                </div>
              </div>
              <div className="flex justify-between content-center items-center mb-10">
                <div className="flex content-center items-center">
                  <p>Image</p>
                  <div className="ml-20">
                    <p className="font-bold text-lg">History of India</p>
                    <p className="text-slate-500 text-sm">By Random Author</p>
                  </div>
                </div>
                <div>
                  <p className="text-green-500 font-bold text-lg">$150.00</p>
                  <p className="text-slate-500 text-sm">131 Subscribes</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse content-center items-center text-lg text-green-500 hover:text-green-900 font-bold">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xl rounder"
              />
              <p className="mx-3">View all</p>
            </div>
          </div>
        </div>
        <div className="w-2/4 bg-white ml-5 p-3 rounded-lg">
          <div className="px-5 pb-5 flex justify-between flex-col h-full">
            <div className="mt-5 flex justify-between flex-col">
              <p className="text-2xl font-bold ">Upcoming Task</p>
              <div className="border-l-4 border-green-500 rounder-sm px-3 my-5">
                <p className="font-bold text-lg">Enviroment Discuss</p>
                <p className="text-slate-500 text-sm">01:00 PM - 02:00 PM</p>
              </div>
              <div className="border-l-4 border-green-500 px-3 my-5">
                <p className="font-bold text-lg">Fitness Training</p>
                <p className="text-slate-500 text-sm">02:00 PM - 03:00 PM</p>
              </div>
              <div className="border-l-4 border-green-500 px-3 my-5">
                <p className="font-bold text-lg">Reading Time</p>
                <p className="text-slate-500 text-sm">04:00 PM - 04:00 PM</p>
              </div>
            </div>
            <div className="flex flex-row-reverse content-center items-center text-lg text-green-500 hover:text-green-900 font-bold">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xl rounder"
              />
              <p className="mx-3">View all</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-3/4 bg-white p-3 justify-between rounded-lg">
          {/* <Bar options={options} data={data2} />; */}
          {/* <table className='w-full'>
                <thead className='text-left'>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody className='text-left'>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table> */}
        </div>
        <div className="w-1/4 bg-white ml-5 p-3 rounded-lg">
          <div className="px-2 pb-5 flex justify-between flex-col h-full">
            <div className="mt-5 flex justify-between flex-col">
              <p className="text-2xl font-bold ">Discussion Box</p>
              <div className="flex justify-between items-center content-center border-l-4 border-green-500 rounder-sm px-3 my-2">
                <div>
                  <p className="font-bold">
                    Sir i'm asking about Xyz topics whe...
                  </p>
                  <p className="text-slate-500">Today, 16:36</p>
                </div>
              </div>
              <div className="flex justify-between items-center content-center border-l-4 border-green-500 rounder-sm px-3 my-2">
                <div>
                  <p className="font-bold">
                    Sir i'm asking about Xyz topics whe...
                  </p>
                  <p className="text-slate-500">Today, 16:36</p>
                </div>
              </div>
              <div className="flex justify-between items-center content-center border-l-4 border-green-500 rounder-sm px-3 my-2">
                <div>
                  <p className="font-bold">
                    Sir i'm asking about Xyz topics whe...
                  </p>
                  <p className="text-slate-500">Today, 16:36</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse content-center items-center text-blue-800 hover:text-blue-900">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xl mr-5 rounder"
              />
              <p className="mx-3">View all transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
