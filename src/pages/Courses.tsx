import { FC, useEffect } from 'react';
import { useState } from 'react';
import { Listbox, Tab, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useSelector } from 'react-redux';

import Search from '../components/Search';
import SearchList from '../components/Courses/SearchList';
import { RootState } from '../redux/store';
import { useCreateCourseMutation } from '../redux/coursesApi';
import Loader from '../components/Loader';

interface levelItem {
  level: string;
  levelType: string;
}

interface categoryItem {
  categoryName: string;
  checked: boolean;
}

interface priceItem {
  priceID: string;
  priceValue: string;
  value: string;
  checked: boolean;
}

const levelExp: levelItem[] = [
  { level: 'All levels', levelType: 'all' },
  { level: 'Beginner', levelType: 'beginner' },
  { level: 'Intermediate', levelType: 'intermediate' },
  { level: 'Expert', levelType: 'expert' },
];

const categoryList: categoryItem[] = [
  { categoryName: 'Creative', checked: false },
  { categoryName: 'Legal', checked: false },
  { categoryName: 'Technical', checked: false },
  { categoryName: 'Design', checked: false },
  { categoryName: 'Education', checked: false },
  { categoryName: 'Soft Skill', checked: false },
];

const priceList: priceItem[] = [
  {
    priceID: 'priceItem1',
    priceValue: '0 ~ 500,000₫',
    value: 'price1',
    checked: false,
  },
  {
    priceID: 'priceItem2',
    priceValue: '500,000₫ ~ 1,000,000₫',
    value: 'price2',
    checked: false,
  },
  {
    priceID: 'priceItem3',
    priceValue: '1,000,000₫ ~ 2,000,000₫',
    value: 'price3',
    checked: false,
  },
  {
    priceID: 'priceItem4',
    priceValue: '2,000,000₫ ~ 3,000,000₫',
    value: 'price4',
    checked: false,
  },
  {
    priceID: 'priceItem5',
    priceValue: '3,000,000₫ ~ 5,000,000₫',
    value: 'price5',
    checked: false,
  },
];
const priceListIDRadio = `priceList${Math.floor(Math.random() * 10000 + 1)}`;

const CoursesPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 3,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 4,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 5,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 6,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 7,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 8,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
        img: 'https://i.scdn.co/image/ab67616d0000b273b315e8bb7ef5e57e9a25bb0f',
      },
    ],
  });
  const [selected, setSelected] = useState(levelExp[0]);
  const [checkedList, setCheckedList] = useState<any>([levelExp[0]]);
  const [showFilterBarMobile, setshowFilterBarMobile] =
    useState<boolean>(false);

  const [createCourse, { isSuccess, isError, error, isLoading }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/courses/create');
    }
    if (isError) {
      console.log((error as any).data);
    }
  }, [isLoading]);
  const handleClearFilter = () => {
    categoryList.map((category) => {
      category.checked = false;
    });
    priceList.map((price) => {
      price.checked = false;
    });
    setSelected(levelExp[0]);
    setCheckedList([levelExp[0]]);
  };

  // todo :receive data from selected filter at now pass to querystring param and call api
  // chon filter là gọi api luôn, không cần phải bấm nút filter...
  const handleFilter = async () => {};
  return (
    <div>
      {isLoading && <Loader />}

      <button onClick={() => navigate(`/profile?userId=${priceListIDRadio}`)}>
        List courses
      </button>
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full lg:px-32 md:px-20 sm:px-6">
          <h1 className="text-white font-bold text-4xl hover:underline hover:cursor-pointer">
            Course
          </h1>
          <button
            onClick={() => {
              createCourse({ userID: user.userID });
            }}
            disabled={isLoading}
            className="text-white"
          >
            Create
          </button>
        </div>
      </div>
      <div className="lg:px-32 md:px-20 sm:px-6">
        <div className="w-full px-2 py-16 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl max-w-md bg-blue-900/20 p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    [
                      'w-full rounded-lg py-2.5 text-md font-medium leading-5',
                      'focus:outline-none',
                      selected
                        ? 'bg-white text-black shadow'
                        : 'text-black hover:bg-white/[0.12] hover:text-blue-500 ',
                    ].join(' ')
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="mt-2 w-full overflow-x-scroll">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={[
                    'rounded-xl bg-white my-3',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  ].join(' ')}
                >
                  <div className="flex">
                    {posts.map((post) => (
                      <Link
                        to={'/courses'}
                        key={post.id}
                        className="rounded-md p-3 hover:bg-gray-100 mr-4"
                      >
                        <div className="lg:w-56 sm:w-44">
                          <img
                            src={post.img}
                            alt=""
                            className="block rounded-lg w-full h-32"
                          />
                        </div>
                        <h3 className="text-base font-bold leading-5 mt-3 lg:w-56 sm:w-44 line-clamp-2">
                          {post.title}
                        </h3>

                        <ul className="mx-1 flex flex-1 mt-3 space-x-1 text-xs font-normal leading-4 text-gray-500 w-full">
                          <li>{post.date}</li>
                          <li>&middot;</li>
                          <li>{post.commentCount} comments</li>
                          <li>&middot;</li>
                          <li>{post.shareCount} shares</li>
                        </ul>

                        <div className="flex mt-1">
                          <p>
                            <s>123$</s>
                          </p>
                          <p className="ml-3">100$</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div>
          <div>
            <h1 className=" font-bold text-3xl mb-14">All course</h1>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex">
                <button
                  onClick={() => {
                    setshowFilterBarMobile(!showFilterBarMobile);
                  }}
                  className="w-fit flex items-center border-2 border-black px-3 py-3"
                >
                  <FontAwesomeIcon icon={faFilter} />
                  <h2 className="font-bold ml-2">Filter</h2>
                  <strong className="ml-2">
                    <span>({checkedList.length})</span>
                  </strong>
                </button>
                <button
                  onClick={() => handleClearFilter()}
                  className="ml-4 text-violet-500 font-extrabold hover:text-violet-500/80"
                >
                  Clear Filter
                </button>
              </div>

              <Search />
            </div>
            <div className="flex justify-between">
              <div
                className={[
                  'lg:w-3/12 sm:w-4/12 lg:mr-4 sm:mr-4 lg:block ',
                  showFilterBarMobile ? ' lg:block' : 'sm:hidden',
                ].join(' ')}
              >
                <div className="mt-6">
                  <div className="mt-6 py-3 border-t-2">
                    <h1 className="font-bold text-2xl mb-4">Level</h1>
                    <Listbox
                      value={selected}
                      onChange={(select) => {
                        // priceList.map((price) => (price.checked = false));
                        // price.checked = e.target.checked;
                        setSelected(select);
                        const newCheckedList = checkedList.filter(
                          (level: levelItem) => !level.levelType
                        );
                        setCheckedList([...newCheckedList, select]);
                        console.log(select);
                      }}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {selected.level}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FontAwesomeIcon icon={faFilter} />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={React.Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {levelExp.map((level, levelIndex) => (
                              <Listbox.Option
                                key={levelIndex}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? 'bg-amber-100 text-amber-900'
                                      : 'text-gray-900'
                                  }`
                                }
                                value={level}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {level.level}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <FontAwesomeIcon icon={faFilter} />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div className="mt-6 py-3 border-t-2">
                    <h1 className="font-bold text-2xl mb-4">Category</h1>
                    <div>
                      {categoryList.map((category) => (
                        <div
                          key={category.categoryName}
                          className="flex items-center"
                        >
                          <input
                            type="checkbox"
                            name=""
                            id={category.categoryName}
                            className="w-4 h-4 mr-2"
                            checked={category.checked}
                            onChange={(e) => {
                              category.checked = e.target.checked;
                              if (category.checked) {
                                setCheckedList([...checkedList, category]);
                              } else {
                                const newCheckedList = checkedList.filter(
                                  (categoryCheck: categoryItem) =>
                                    categoryCheck.categoryName !==
                                    category.categoryName
                                );
                                setCheckedList(newCheckedList);
                              }
                            }}
                          />
                          <label htmlFor={category.categoryName}>
                            {category.categoryName}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 py-3 border-t-2">
                    <h1 className="font-bold text-2xl mb-4">Price</h1>
                    <div>
                      {priceList.map((price) => (
                        <div key={price.priceID} className="flex items-center">
                          <input
                            type="radio"
                            id={price.priceID}
                            name={priceListIDRadio}
                            checked={price.checked}
                            className="w-4 h-4 mr-2"
                            onChange={(e) => {
                              priceList.map((price) => (price.checked = false));
                              price.checked = e.target.checked;
                              const newCheckedList = checkedList.filter(
                                (priceCheck: priceItem) => !priceCheck.priceID
                              );
                              setCheckedList([...newCheckedList, price]);
                            }}
                          />
                          <label htmlFor={price.priceID}>
                            {price.priceValue}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-9/12 sm:w-full mt-6">
                <SearchList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
