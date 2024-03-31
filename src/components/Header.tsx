import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { config } from "../config";
import { Disclosure, Menu, Transition } from "@headlessui/react";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "/", current: true, notInM: true },
  { name: "Why team ?", href: "/about_us", current: false },
  { name: "Course", href: "/courses", current: false },
  { name: "Our instructor", href: "/members", current: false },
  { name: "Pricing", href: "/register-member", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const active = (item: any) => {
  navigation.map((data) => {
    data.current = false;
  });
  item.current = true;
};

const Header: React.FC = () => {
  // const user = useSelector((state: RootState) => state.user.user);
  const [isLogin, setLogin] = useState<boolean>(false);

  return (
    <>
      <header className="fixed lg:px-32 md:px-20 sm:px-6 py-4 top-0 right-0 left-0 bg-white border-b-2 border-blue-400/10 z-50">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="mr-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={[
                              item.current ? "text-blue-500" : " ",
                              "px-3 py-2 text-xl font-semibold text-black hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200",
                            ].join(" ")}
                            aria-current={item.current ? "page" : undefined}
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
                    {isLogin ? (
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="relative rounded-full p-1 text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <FontAwesomeIcon icon={faBell} />
                        </button>
                        <Menu as="div" className="relative mx-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.imageUrl}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={[
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700",
                                      ].join(" ")}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
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
                      to={"/"}
                      className="py-2 text-xl font-semibold text-black hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                    >
                      Home
                    </Link>

                    <div className="flex">
                      {isLogin && (
                        <div className="flex items-center mr-4">
                          <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <FontAwesomeIcon icon={faBell} />
                          </button>
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={[
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700",
                                        ].join(" ")}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
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
                        item.current ? "text-blue-500" : " ",
                        item.notInM ? "hidden" : "block",
                        "px-3 py-2 text-xl font-semibold text-black hover:text-blue-500 transition ease-in-out hover:-translate-y-0.5 duration-200",
                      ].join(" ")}
                      aria-current={item.current ? "page" : undefined}
                      onClick={() => {
                        active(item);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {!isLogin && (
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

        {/* {user.id ? (
            <div className="flex items-center">
              <Link
                to={config.routes.upload}
                className="flex-1 bg-transparent font-medium rounded-md px-3 py-2 ring-1 ring-gray-900/5"
              >
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Upload
              </Link>
              <Link to={config.routes.profileLink(user.id)} className="ml-3">
                <img
                  src={user.avatar}
                  alt=""
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to={config.routes.login}
                className="flex-1 bg-transparent font-medium rounded-md px-3 py-2 ring-1 ring-gray-900/5"
              >
                Login
              </Link>
  
              <Link
                to={config.routes.register}
                className="ml-4 flex-1 bg-blue-500 hover:bg-blue-500/90 font-medium text-white rounded-md px-3 py-2"
              >
                Register
              </Link>
            </div>
          )} */}
      </header>
    </>
  );
};
export default Header;
