import React, { useState } from 'react';
import {
  faTableColumns,
  faBriefcase,
  faCalendarDays,
  faUser,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ROLE_USER } from '../constants/common';

const Sidebar: React.FC = () => {
  // const { userId } = useContext(UserContext); // Lấy userId từ context
  const user = useSelector((state: RootState) => state.user.user);
  // const role = 'RGV';

  return (
    <div className="fixed min-w-64 h-full">
      <div className="">
        <div className="mb-5 pb-5 border-b-2">
          {/* icon */}
          <h2 className="text-3xl font-bold">STUDENT</h2>
        </div>
        <ul className="list-none h-5/6 flex flex-col justify-between text-slate-600">
          <div>
            <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
              <FontAwesomeIcon
                icon={faTableColumns}
                className="text-xl mr-5 rounder"
              />
              <Link to="/student/dashboard">Dashboard</Link>
            </li>

            {user.role === ROLE_USER.RHV && (
              <div>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/student/profile">Profile</Link>
                </li>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/student/courses">Course</Link>
                </li>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/student/reviews">Binh luan</Link>
                </li>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/student/stats">Thanh toan</Link>
                </li>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/student/">
                    nnag cap goi tai khoan, cho vao profile
                  </Link>
                </li>
              </div>
            )}

            {user.role.startsWith(ROLE_USER.RGV) && (
              <div>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/student/dashboard/course">Profile</Link>
                </li>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/settings">Course</Link>
                </li>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/settings">Binh luan</Link>
                </li>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/settings">Thoong ke </Link>
                </li>
                <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-xl mr-5 rounder"
                  />
                  <Link to="/settings">nnag cap goi tai khoan</Link>
                </li>
              </div>
            )}

            <li className="rounded py-2 px-1 hover:bg-sky-500 hover:text-white active:bg-sky-600 focus:outline-none focus:ring focus:bg-sky-300">
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="text-xl mr-5 rounder"
              />
              <Link to="/settings">Log Out</Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
