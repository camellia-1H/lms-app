import { FC, ReactNode } from "react";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = (props) => {
  return (
    // lg:px-60 md:px-20 sm:px-20
    <div className="w-full relative">
      <Header />
      <main className="mt-24 h-[550px] flex-1">{props.children}</main>
      <footer className="w-full mt-36 bg-[#111827] text-white">
        <div className="lg:px-36 md:px-20 sm:px-8 py-16">
          <div className="flex justify-between gap-x-10 lg:flex-row sm:flex-col">
            <div className="lg:w-4/12 sm:w-full lg:mt-0 sm:mt-10">
              <h1 className="font-bold border-b pb-3 mb-6">GET IN TOUCH</h1>
              <div>
                <div>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-500"
                  />
                  <span className="ml-2 text-gray-500">
                    <a
                      href="mailto:daomanh1551@gmail.com"
                      className="hover:text-gray-300"
                    >
                      daomanh1551@gmail.com
                    </a>
                  </span>
                </div>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                  <span className="ml-2 text-gray-500">0389735717</span>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 sm:w-full lg:mt-0 sm:mt-10">
              <h1 className="font-bold border-b pb-3 mb-6">VIEW MORE</h1>
              <div className="flex flex-col items-start">
                <div className="hover:underline ">
                  <Link
                    to={"/"}
                    className="block text-gray-500 py-2 text-lg hover:text-blue-500 transition ease-in-out hover:translate-x-2 duration-200"
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                    </span>
                    Home
                  </Link>
                </div>
                <div className="hover:underline ">
                  <Link
                    to={"/upload"}
                    className="block text-gray-500 py-2 text-lg hover:text-blue-500 transition ease-in-out hover:translate-x-2 duration-200"
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                    </span>
                    About us
                  </Link>
                </div>
                <div className="hover:underline ">
                  <Link
                    to={"/courses"}
                    className="block text-gray-500 py-2 text-lg  hover:text-blue-500 transition ease-in-out hover:translate-x-2 duration-200"
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                    </span>
                    All Courses
                  </Link>
                </div>
                <div className="hover:underline ">
                  <Link
                    to={"/members"}
                    className="block text-gray-500 py-2 text-lg  hover:text-blue-500 transition ease-in-out hover:translate-x-2 duration-200"
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                    </span>
                    Instructors
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 sm:w-full lg:mt-0 sm:mt-10">
              <h1 className="font-bold border-b pb-3 mb-6">GET A QUOTE!</h1>
              <div>
                <h1 className="text-gray-500">
                  Thank you for getting in touch! Please fill out the
                  information. We will get back to you soon as possible.
                </h1>
                <div className="flex flex-col mt-4">
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Enter valid email..."
                    className="ring-1 rounded-lg px-4 py-2"
                  />
                  <button className="xl:w-4/12 lg:w-7/12 md:w-5/12 sm:w-3/12 mt-4 text-white font-bold px-4 py-2 bg-blue-700 rounded-lg hover:bg-black">
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
