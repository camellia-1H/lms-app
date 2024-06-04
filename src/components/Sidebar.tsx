import React, { useState } from 'react';
import {
  faTableColumns,
  faBriefcase,
  faCalendarDays,
  faUser,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ROLE_USER } from '../constants/common';

const Sidebar: React.FC = () => {
  // const { userId } = useContext(UserContext); // Lấy userId từ context
  const user = useSelector((state: RootState) => state.user.user);
  // const role = 'RGV';
  const location = useLocation();

  console.log(location.pathname === '/teacher/dashboard');

  return (
    <div className="fixed w-2/12 h-full">
      <div className="">
        <div className="mb-5 pb-5 border-b-2">
          {user.role === ROLE_USER.RHV ? (
            <h2 className="text-3xl font-bold">STUDENT</h2>
          ) : (
            <h2 className="text-3xl font-bold">TEACHER</h2>
          )}
        </div>
        <ul className="list-none h-5/6 text-slate-600">
          <div className="flex flex-col gap-y-3 justify-between">
            {user.role === ROLE_USER.RHV ? (
              <li
                className={[
                  'flex items-center rounded ',
                  location.pathname === '/student/dashboard'
                    ? 'bg-sky-400 text-white'
                    : 'text-black hover:bg-sky-400 hover:text-white ',
                ].join('')}
              >
                <Link
                  className="inline-block w-full font-semibold text-lg py-2 px-4"
                  to="/student/dashboard"
                >
                  <FontAwesomeIcon
                    icon={faTableColumns}
                    className="text-xl mr-5 rounder"
                  />
                  Dashboard
                </Link>
              </li>
            ) : (
              <li
                className={[
                  'flex items-center rounded ',
                  location.pathname === '/teacher/dashboard'
                    ? 'bg-sky-400 text-white'
                    : 'text-black hover:bg-sky-400 hover:text-white ',
                ].join('')}
              >
                <Link
                  className="inline-block w-full font-semibold text-lg py-2 px-4"
                  to="/teacher/dashboard"
                >
                  <FontAwesomeIcon
                    icon={faTableColumns}
                    className="text-xl mr-5 rounder"
                  />
                  Dashboard
                </Link>
              </li>
            )}

            {user.role === ROLE_USER.RHV && (
              <div className="flex flex-col gap-y-3">
                <li
                  className={[
                    'flex items-center rounded ',
                    location.pathname === '/student/profile'
                      ? 'bg-sky-400 text-white'
                      : 'text-black hover:bg-sky-400 hover:text-white ',
                  ].join('')}
                >
                  <Link
                    className="inline-block w-full font-semibold text-lg py-2 px-4"
                    to="/student/profile"
                  >
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="text-xl mr-5 rounder"
                    />
                    Profile
                  </Link>
                </li>
                <li
                  className={[
                    'flex items-center rounded ',
                    location.pathname === '/student/courses'
                      ? 'bg-sky-400 text-white'
                      : 'text-black hover:bg-sky-400 hover:text-white ',
                  ].join('')}
                >
                  <Link
                    className="inline-block w-full font-semibold text-lg py-2 px-4"
                    to="/student/courses"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-xl mr-5 rounder"
                    />
                    Course
                  </Link>
                </li>

                <li
                  className={[
                    'flex items-center rounded ',
                    location.pathname === '/student/stats'
                      ? 'bg-sky-400 text-white'
                      : 'text-black hover:bg-sky-400 hover:text-white ',
                  ].join('')}
                >
                  <Link
                    className="inline-block w-full font-semibold text-lg py-2 px-4"
                    to="/student/stats"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-xl mr-5 rounder"
                    />
                    Financial statistics
                  </Link>
                </li>
              </div>
            )}

            {user.role.startsWith(ROLE_USER.RGV) && (
              <div className="flex flex-col gap-y-3">
                <li
                  className={[
                    'flex items-center rounded ',
                    location.pathname === '/teacher/profile'
                      ? 'bg-sky-400 text-white'
                      : 'text-black hover:bg-sky-400 hover:text-white ',
                  ].join('')}
                >
                  <Link
                    className="inline-block w-full font-semibold text-lg py-2 px-4"
                    to="/teacher/profile"
                  >
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="text-xl mr-5 rounder"
                    />
                    Profile
                  </Link>
                </li>
                <li
                  className={[
                    'flex items-center rounded ',
                    location.pathname === '/teacher/courses'
                      ? 'bg-sky-400 text-white'
                      : 'text-black hover:bg-sky-400 hover:text-white ',
                  ].join('')}
                >
                  <Link
                    className="inline-block w-full font-semibold text-lg py-2 px-4"
                    to="/teacher/courses"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-xl mr-5 rounder"
                    />
                    Manage Course
                  </Link>
                </li>
                <li
                  className={[
                    'flex items-center rounded ',
                    location.pathname === '/teacher/reviews'
                      ? 'bg-sky-400 text-white'
                      : 'text-black hover:bg-sky-400 hover:text-white ',
                  ].join('')}
                >
                  <Link
                    className="inline-block w-full font-semibold text-lg py-2 px-4"
                    to="/teacher/reviews"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-xl mr-5 rounder"
                    />
                    Manage Reviews
                  </Link>
                </li>
                <li
                  className={[
                    'flex items-center rounded ',
                    location.pathname === '/teacher/stats'
                      ? 'bg-sky-400 text-white'
                      : 'text-black hover:bg-sky-400 hover:text-white ',
                  ].join('')}
                >
                  <Link
                    className="inline-block w-full font-semibold text-lg py-2 px-4"
                    to="/teacher/stats"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-xl mr-5 rounder"
                    />
                    Financial statistics
                  </Link>
                </li>
              </div>
            )}

            <li className="text-black hover:bg-sky-400 hover:text-white">
              <Link
                className="inline-block w-full font-semibold text-lg py-2 px-4"
                to="/settings"
              >
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="text-xl mr-5 rounder"
                />
                Log Out
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
