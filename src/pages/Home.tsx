import { FC } from 'react';
import SearchFront from '../components/SearchFront';
import CartCategoryList from '../components/CartCategoryList';
import { Link } from 'react-router-dom';
import CartCourseList from '../components/CartCourseList';
import { ReactTyped } from 'react-typed';

const Home: FC = () => {
  return (
    <div>
      <div className="bg-[#111827] h-[550px]">
        <div className="w-full h-auto py-32">
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="text-7xl font-bold">Learn with</h1>
            <ReactTyped
              strings={[
                'Artificial Intelligence',
                'Quality Instructors',
                'Latest technology',
              ]}
              typeSpeed={80}
              backSpeed={80}
              loop
              className="text-yellow-500 text-6xl font-bold pt-8 pb-4"
            />
            <h2 className="text-lg pb-8">
              Choose among 100+ programs for all level
            </h2>
            <SearchFront />
            <p className="opacity-60 pt-4 text-lg mt-4">
              100+ Students, 20 Instructors, 1 million hours of Teaching
            </p>
          </div>
        </div>
      </div>
      <div className="lg:px-36 md:px-20 sm:px-8">
        <CartCategoryList />

        <div className="bg-purple-900 mt-20 px-8 py-8 rounded-xl flex lg:flex-row lg:justify-between md:flex-col sm:flex-col">
          <div className="bg-purple-700 rounded-xl lg:w-3/12 md:w-full sm:w-full flex flex-col px-6 py-10 ">
            <h1 className="text-white text-2xl font-bold">Why Choose us ?</h1>
            <p className="text-white font-semibold text-lg mt-6">
              Select what is best for your child from numerous options
            </p>
            <div className="min-w-fit mt-6">
              <Link
                to={'/about_us'}
                className="text-white font-semibold px-3 py-2 bg-blue-700 rounded-lg hover:bg-black"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-3/12 md:w-full sm:w-full lg:mt-0 md:mt-14 sm:mt-14 flex flex-col lg:px-4">
            <div className="shrink-0 flex flex-1 flex-col items-center">
              <img
                src="https://demos.wplms.io/main/wp-content/uploads/2023/05/icon1-1-100x100.png"
                loading="lazy"
                className="flex-1 block w-16 mt-3"
              />
              <h2 className="text-white text-2xl font-extrabold mt-10">
                Creative thinking
              </h2>
            </div>

            <div className="flex flex-col lg:text-start sm:text-center">
              <p className="text-white font-semibold text-lg mt-6">
                Let your student come up with unique and original solutions
              </p>
            </div>
          </div>
          <div className="lg:w-3/12 md:w-full sm:w-full lg:mt-0 md:mt-14 sm:mt-14 flex flex-col lg:px-4">
            <div className="shrink-0 flex flex-1 flex-col items-center">
              <img
                src="https://demos.wplms.io/main/wp-content/uploads/2023/05/icon2-114x120.png"
                loading="lazy"
                className="flex-1 block w-16 mt-3"
              />
              <h2 className="text-white text-2xl font-extrabold mt-10">
                Career Planning
              </h2>
            </div>

            <div className="flex flex-col lg:text-start sm:text-center">
              <p className="text-white font-semibold text-lg mt-6">
                Plan your childrent career with our expert counsellors.
              </p>
            </div>
          </div>
          <div className="lg:w-3/12 md:w-full sm:w-full lg:mt-0 md:mt-14 sm:mt-14 flex flex-col lg:px-4">
            <div className="shrink-0 flex flex-1 flex-col items-center">
              <img
                src="https://demos.wplms.io/main/wp-content/uploads/2023/05/icon4-120x112.png"
                loading="lazy"
                className="flex-1 block w-16 mt-3"
              />
              <h2 className="text-white text-2xl font-extrabold mt-10">
                Public Speaking
              </h2>
            </div>

            <div className="flex flex-col lg:text-start sm:text-center">
              <p className="text-white font-semibold text-lg mt-6">
                Let your childrent talk with our instructor.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="">
            <div className="flex flex-col text-center mb-8">
              <h1 className="text-3xl font-bold">Popular Courses</h1>
              <p className="text-xl mt-6">
                Choose from 100+ courses from experienced teachers
              </p>
            </div>

            <CartCourseList />

            <section className="mt-20">
              <div className="flex items-center mx-auto lg:flex-row sm:flex-col">
                <div className="lg:w-5/12 sm:w-full">
                  <img
                    src="https://s.udemycdn.com/home/non-student-cta/instructor-mobile-v3.jpg"
                    alt=""
                    className="w-full"
                  />
                </div>
                <div className="lg:max-w-[450px] lg:ml-20 lg:text-start sm:text-center ">
                  <h1 className="text-3xl font-bold lg:mt-0 sm:mt-6">
                    Become an instructor
                  </h1>
                  <p className="text-lg mt-6">
                    Instructors from around the world teach millions of learners
                    on team. We provide the tools and skills to teach what you
                    love.
                  </p>
                  <div className="min-w-fit mt-6">
                    <Link
                      to={'/user/register'}
                      className="text-white font-bold px-4 py-3 bg-blue-700 rounded-lg hover:bg-black"
                    >
                      Start teaching today
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
