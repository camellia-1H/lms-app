import React, { useState } from 'react';
import { faTableColumns, faBriefcase, faCalendarDays, faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  // const { userId } = useContext(UserContext); // Lấy userId từ context
  const [userId] = useState<string>('1');
  const [roleUser] = useState<string>('TEACHER');
  return (
    <div className="p-5 w-1/6 bg-white h-screen">
      <div className="mb-5 pb-5 border-b-2">
        {/* icon */}
        <h2 className='text-3xl font-bold'>STUDENT</h2>
        <h2 className='text-xl'>DASHBOARD</h2>
      </div>
      <ul className='list-none h-5/6 flex flex-col justify-between text-slate-600'>
        <div>
          <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faTableColumns} className='text-xl mr-5 rounder'/><Link to="/dashboard/student">Dashboard</Link></li>
          <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faBriefcase} className='text-xl mr-5 rounder'/><Link to="/dashboard/student/course">Course</Link></li>
          {roleUser === 'TEACHER' 
          ? 
            <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faCalendarDays} className='text-xl mr-5 rounder'/><Link to="/courses">Students</Link></li>
          :
            <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faCalendarDays} className='text-xl mr-5 rounder'/><Link to="/courses">Resources</Link></li>
          }
          
          <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faCalendarDays} className='text-xl mr-5 rounder'/><Link to="/settings">Discussion</Link></li>
          <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faCalendarDays} className='text-xl mr-5 rounder'/><Link to="/settings">Schedules</Link></li>
          {roleUser === 'TEACHER' 
          ? 
            <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faCalendarDays} className='text-xl mr-5 rounder'/><Link to="/courses">Transactions</Link></li>
          :
          <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faUser} className='text-xl mr-5 rounder'/><Link to={`/profile/${userId}`}>My Account</Link></li>
          }
          <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faCalendarDays} className='text-xl mr-5 rounder'/><Link to="/settings">Settings</Link></li>
        </div>
        <li className='rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300'><FontAwesomeIcon icon={faRightToBracket} className='text-xl mr-5 rounder'/><Link to="/settings">Log Out</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
