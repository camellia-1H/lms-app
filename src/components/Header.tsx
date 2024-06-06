import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { config } from '../config';
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  MenuSeparator,
} from '@headlessui/react';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/userReducer';
import { ROLE_USER } from '../constants/common';

const navigation = [
  { name: 'Home', href: '/', current: true, notInM: true },
  { name: 'Why team ?', href: '/about_us', current: false },
  { name: 'Courses', href: '/courses', current: false },
  { name: 'Our instructor', href: '/members', current: false },
  { name: 'Pricing', href: '/register-member', current: false },
];

const active = (item: any) => {
  navigation.map((data) => {
    data.current = false;
  });
  item.current = true;
};

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log('user', user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout: any = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      <header className="fixed lg:px-32 md:px-20 sm:px-6 py-4 top-0 right-0 left-0 bg-white border-b-2 border-blue-400/10 z-50 shadow-md">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="mr-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={[
                              item.current ? 'text-blue-500' : ' ',
                              'px-3 py-2 text-xl font-semibold text-black hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200',
                            ].join(' ')}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={() => active(item)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    {/* Profile dropdown */}
                    {user.userID ? (
                      <div className="flex items-center gap-x-2">
                        <button
                          type="button"
                          className="relative rounded-full p-1 text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <FontAwesomeIcon icon={faBell} />
                        </button>
                        <Menu as={'div'} className={'ml-3'}>
                          <MenuButton className="inline-flex items-center gap-2 rounded-md font-semibold text-white shadow-inner shadow-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                            <div>
                              <img
                                className="h-10 lg:w-10 md:w-11 rounded-full ring-1 hover:bg-black block"
                                src={user.avatar}
                              />
                            </div>
                          </MenuButton>
                          <Transition
                            enter="transition ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <MenuItems
                              anchor="bottom end"
                              className="z-50 w-52 bg-gray-800 mt-2 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                            >
                              <MenuItem>
                                <button
                                  onClick={() =>
                                    navigate(
                                      user.role === ROLE_USER.RHV
                                        ? `/student/dashboard`
                                        : `/teacher/dashboard`
                                    )
                                  }
                                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                >
                                  Dashboard
                                </button>
                              </MenuItem>
                              <MenuSeparator className="my-1 h-px bg-gray-300" />
                              <MenuItem>
                                <button
                                  onClick={handleLogout}
                                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                >
                                  Logout
                                </button>
                              </MenuItem>
                            </MenuItems>
                          </Transition>
                        </Menu>
                      </div>
                    ) : (
                      <div className="h-full flex items-center">
                        <Link
                          to={config.routes.login}
                          className="block font-medium rounded-md px-3 py-2 ring-1 ring-gray-900/40 hover:bg-gray-100 hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                        >
                          Login
                        </Link>

                        <Link
                          to={config.routes.register}
                          className="block ml-4 bg-blue-500 hover:bg-blue-950/90 font-medium text-white rounded-md px-3 py-2 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                  {/* Mobile menu button */}
                  <div className="w-full flex justify-between md:hidden">
                    <Link
                      to={'/'}
                      className="py-2 text-xl font-semibold text-black hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                    >
                      Home
                    </Link>

                    <div className="flex">
                      {user.userID && (
                        <div className="flex items-center mr-4">
                          <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <FontAwesomeIcon icon={faBell} />
                          </button>

                          <Menu as={'div'} className={'ml-3'}>
                            <MenuButton className="flex items-center gap-2 rounded-md font-semibold text-white shadow-inner shadow-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                              <div>
                                <img
                                  className="h-10 w-10 rounded-full ring-1 hover:bg-black"
                                  src={user.avatar}
                                  alt="khong cos avaldad"
                                />
                              </div>
                            </MenuButton>
                            <Transition
                              enter="transition ease-out duration-75"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <MenuItems
                                anchor="bottom end"
                                className="z-50 w-52 bg-gray-800 mt-2 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                              >
                                <MenuItem>
                                  <button
                                    onClick={() =>
                                      navigate(
                                        user.role === ROLE_USER.RHV
                                          ? `/student/dashboard`
                                          : `/teacher/dashboard`
                                      )
                                    }
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                  >
                                    Dashboard
                                  </button>
                                </MenuItem>
                                <MenuSeparator className="my-1 h-px bg-gray-300" />
                                <MenuItem>
                                  <button
                                    onClick={handleLogout}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                  >
                                    Logout
                                  </button>
                                </MenuItem>
                              </MenuItems>
                            </Transition>
                          </Menu>
                        </div>
                      )}

                      <Disclosure.Button className="flex items-center justify-center rounded-md bg-gray-800 px-4 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        {open ? (
                          <FontAwesomeIcon icon={faBars} />
                        ) : (
                          <FontAwesomeIcon icon={faBars} />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={[
                        item.current ? 'text-blue-500' : ' ',
                        item.notInM ? 'hidden' : 'block',
                        'px-3 py-2 text-xl font-semibold text-black hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 duration-200',
                      ].join(' ')}
                      aria-current={item.current ? 'page' : undefined}
                      onClick={() => {
                        active(item);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {!user.userID && (
                  <div className="h-full flex-col text-center mx-5">
                    <Link
                      to={config.routes.login}
                      className="block mt-3 font-medium rounded-md px-3 py-2 ring-1 ring-gray-900/40 hover:bg-gray-100 hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 duration-200"
                    >
                      Login
                    </Link>

                    <Link
                      to={config.routes.register}
                      className="block mt-3 font-medium  rounded-md px-3 py-2 bg-blue-500 hover:bg-blue-950/90 text-white transition ease-in-out hover:-translate-y-0.5 duration-200"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>
    </>
  );
};
export default Header;
