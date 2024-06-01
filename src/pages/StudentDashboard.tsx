import * as React from 'react'
import { faArrowRight, faChartSimple, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImageForm } from '../components/CourseCreate/ImageForm';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import ProgressBar from '@ramonak/react-progress-bar';

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
  }
  
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
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('firstName', {
    cell: info => info.getValue(),
    header: () => <span>First Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: info => info.column.id,
  }),
]


// const [data, _setData] = React.useState(() => [...defaultData])
// const rerender = React.useReducer(() => ({}), {})[1]

// const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
// })
  

const Sidebar: React.FC = () => {
    const [data, _setData] = React.useState(() => [...defaultData])
    const rerender = React.useReducer(() => ({}), {})[1]

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
})
  return (
    <div className="dashboard w-11/12 mx-5 my-5">
      {/* <h2 className='text-center'>Student Dashboard</h2> */}
      <div className='flex justify-between'>
        <div>
            <p>Hi tarum,</p>    
            <p className='text-3xl'>Welcome to Sova!</p>
        </div>
        <div className='content-center'>
            <input id="email-address" name="email" type="email" required className="mx-2 min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="..." />
            <button type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Search</button>
        </div>
      </div>
      <div className='flex justify-between mt-3'>
        <div className='rounded-lg bg-white w-2/6 mr-5 p-3'>
            <div className='flex items-center content-center'>
                <FontAwesomeIcon icon={faChartSimple} style={{ color: '#4b0082', padding: "10px", backgroundColor: '#f3f3f3', borderRadius: "20px"}} className='text-xl mr-5 rounder'/>
                <div>
                    <p className='text-slate-400'>Learning Times</p>
                    <p className='font-bold'>2h 37m</p>
                </div>
            </div>
        </div>
        <div className='rounded-lg bg-white w-2/6 mr-5 p-3'>
            <div className='flex items-center content-center'>
                <FontAwesomeIcon icon={faChartSimple} style={{ color: '#4b0082', padding: "10px", backgroundColor: '#f3f3f3', borderRadius: "20px"}} className='text-xl mr-5 rounder'/>
                <div>
                    <p className='text-slate-400'>My Activities</p>
                    <p className='font-bold'>21 Tasks</p>
                </div>
            </div>
        </div>
        <div className='rounded-lg bg-blue-500 text-white w-2/6 p-3'>
            <div className='flex justify-between items-center content-center'>
                <div className='flex justify-between items-center content-center ml-2'>
                    {/* <FontAwesomeIcon icon={faChartSimple} className='text-xl mr-5 rounder'/> */}
                    <div>
                        <p>Discussion Box</p>
                        <p className='font-bold'>3 New Messages</p>
                    </div>
                </div>
                <FontAwesomeIcon icon={faArrowRight} className='text-3xl mr-5 rounder'/>
            </div>
        </div>
      </div>
      <div className='flex my-5'>
        <div className='w-3/4 bg-white p-3 flex justify-between rounded-lg'>
            <div className='flex flex-col px-5 py-5 justify-between mb-10 w-2/5'>
                <div>
                    <p className='text-2xl w-3/4 mb-3 font-bold'>Learn Python within 30 Days</p>
                    <p className='w-3/4 mb-3'>Time to become advance then others with this course</p>
                </div>
                <div className='flex'>
                    <button type="submit" className="mr-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Join Trail Class</button>
                    <button type="submit" className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Skip</button>
                </div>
            </div>
            <div className='w-3/4'>
                <ImageForm></ImageForm>
            </div>
        </div>
        <div className='w-1/4 bg-white ml-5 p-3 rounded-lg'>
            <div className='px-5 pb-5 flex justify-between flex-col h-full'>
                <div className='mt-5 flex justify-between flex-col'>
                    <p className='text-2xl font-bold '>Upcoming Task</p>
                    <div className='border-l-4 border-indigo-500 rounder-sm px-3 my-2'>
                        <p className='font-bold'>Enviroment Discuss</p>
                        <p className='text-slate-500'>01:00 PM - 02:00 PM</p>
                    </div>
                    <div className='border-l-4 border-indigo-500 px-3 my-2'>
                        <p className='font-bold'>Fitness Training</p>
                        <p className='text-slate-500'>02:00 PM - 03:00 PM</p>
                    </div>
                    <div className='border-l-4 border-indigo-500 px-3 my-2'>
                        <p className='font-bold'>Reading Time</p>
                        <p className='text-slate-500'>04:00 PM - 04:00 PM</p>
                    </div>
                </div>
                <div className='flex flex-row-reverse content-center items-center text-blue-800 hover:text-blue-900'>
                    <FontAwesomeIcon icon={faArrowRight} className='text-xl mr-5 rounder'/>
                    <p className='mx-3'>View all tasks</p>
                </div>
            </div>
        </div>
      </div>
      <div className='flex'>
        <div className='w-3/4 bg-white p-3 justify-between rounded-lg'>
            <p className='text-xl font-bold'>My Courses</p>
            <div className='flex justify-between content-center items-center mb-10'>
                <p>Image</p>
                <div>
                    <p>History of India</p>
                    <p>By Random Author</p>
                </div>
                <ProgressBar className='w-1/5' completed={50} />
                <div className='flex'>
                    <FontAwesomeIcon icon={faStar} className='text-xl mr-2 rounder'/>
                    <p>5</p>
                </div>
                <button type="submit" className="mr-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">View Course</button>
            </div>
            <div className='flex justify-between content-center items-center mb-10'>
                <p>Image</p>
                <div>
                    <p>History of India</p>
                    <p>By Random Author</p>
                </div>
                <ProgressBar className='w-1/5' completed={50} />
                <div className='flex'>
                    <FontAwesomeIcon icon={faStar} className='text-xl mr-2 rounder'/>
                    <p>5</p>
                </div>
                <button type="submit" className="mr-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">View Course</button>
            </div>
            <div className='flex justify-between content-center items-center mb-10'>
                <p>Image</p>
                <div>
                    <p>History of India</p>
                    <p>By Random Author</p>
                </div>
                <ProgressBar className='w-1/5' completed={50} />
                <div className='flex'>
                    <FontAwesomeIcon icon={faStar} className='text-xl mr-2 rounder'/>
                    <p>5</p>
                </div>
                <button type="submit" className="mr-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">View Course</button>
            </div>
            <div className='flex flex-row-reverse content-center items-center text-blue-800 hover:text-blue-900'>
                <FontAwesomeIcon icon={faArrowRight} className='text-xl mr-5 rounder'/>
                <p className='mx-3'>View all</p>
            </div>
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
        <div className='w-1/4 bg-white ml-5 p-3 rounded-lg'>
            <div className='px-5 pb-5 flex justify-between flex-col h-full'>
                <div className='mt-5 flex justify-between flex-col'>
                    <p className='text-2xl font-bold '>Your Transactions</p>
                    <div className='flex justify-between items-center content-center border-l-4 border-indigo-500 rounder-sm px-3 my-2'>
                        <div>
                            <p className='font-bold'>Uniform</p>
                            <p className='text-slate-500'>01:00 PM - 02:00 PM</p>
                        </div>
                        <p>$150.00</p>
                    </div>
                    <div className='flex justify-between items-center content-center border-l-4 border-indigo-500 px-3 my-2'>
                        <div>
                            <p className='font-bold'>Transport</p>
                            <p className='text-slate-500'>02:00 PM - 03:00 PM</p>
                        </div>
                        <p>$200.00</p>
                    </div>
                    <div className='flex justify-between items-center content-center border-l-4 border-indigo-500 px-3 my-2'>
                        <div>
                            <p className='font-bold'>Design Course</p>
                            <p className='text-slate-500'>04:00 PM - 04:00 PM</p>
                        </div>
                        <p>$300.00</p>
                    </div>
                </div>
                <div className='flex flex-row-reverse content-center items-center text-blue-800 hover:text-blue-900'>
                    <FontAwesomeIcon icon={faArrowRight} className='text-xl mr-5 rounder'/>
                    <p className='mx-3'>View all transactions</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;