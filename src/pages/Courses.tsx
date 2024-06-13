import { FC, useEffect } from 'react';
import { useState } from 'react';
import {
  Combobox,
  Listbox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faFilter,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useSelector } from 'react-redux';

import SearchList from '../components/Courses/SearchList';
import { RootState } from '../redux/store';
import { useSearchCourseFilterMutation } from '../redux/coursesApi';
import { LIMIT_MAX } from '../constants/common';
import { numberWithCommas } from '../utils/common';
import TabCourse from '../components/Courses/TabCourse';
import SearchFilter from '../components/Courses/SearchFilter';
import { categoryList, priceList, levelList } from '../constants/data-master';

interface levelItem {
  levelID: string;
  levelType: string;
}

const CoursesPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [levelExp, setLevelExp] = useState<levelItem[]>(levelList);
  const [priceListMaster, setPriceList] = useState<any[]>(priceList);
  const [filteredCategoryList, setFilteredCategoryList] =
    useState<any[]>(categoryList);
  console.log(filteredCategoryList);

  const [selected, setSelected] = useState({ levelID: '' });
  const [checkedList, setCheckedList] = useState<any[]>([]);

  const [queryCategory, setQueryCategory] = useState<string>('');
  const [categorySelected, setCategorySelected] = useState<any[]>([]);

  const [showFilterBarMobile, setshowFilterBarMobile] =
    useState<boolean>(false);

  // list course show
  const [listCourseQuery, setListCourseQuery] = useState<any[]>([]);

  // is has more coure
  const [hasMoreCourse, setMoreCourse] = useState<boolean>(false);
  // last item course query
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>();
  // is loading when filter search
  const [isLoadingFilter, setLoadingFilter] = useState<boolean>(false);

  useEffect(() => {
    const filteredCategoryList =
      queryCategory === ''
        ? categoryList
        : categoryList.filter((category) => {
            return category.categoryID
              .toLowerCase()
              .includes(queryCategory.toLowerCase());
          });
    console.log(filteredCategoryList);

    setFilteredCategoryList(filteredCategoryList);
  }, [queryCategory]);

  const [searchCourseFilter] = useSearchCourseFilterMutation();

  useEffect(() => {
    const prices: any[] = [];
    priceList.map((item: any) => {
      prices.push({ ...item, checked: false });
    });
    setPriceList(prices);
    setCheckedList([levelExp[3]]);
    setSelected(levelExp[3]);
  }, []);

  useEffect(() => {
    console.log('newest checkedList', checkedList);
    handleFilter();
  }, [checkedList, checkedList.length]);

  const handleClearFilter = () => {
    console.log(priceList);

    priceListMaster.map((price) => {
      price.checked = false;
    });
    setCategorySelected([]);
    setSelected(levelExp[3]);
    setCheckedList([levelExp[3]]);
  };

  // todo :receive data from selected filter at now pass to querystring param and call api
  // chon filter là gọi api luôn, không cần phải bấm nút filter...
  const handleFilter = async () => {
    setLoadingFilter(true);
    const level = checkedList.filter((item) => item.levelID);
    const price = checkedList.filter((item) => item.priceID);

    const categories = checkedList.filter((item) => item.categoryID);

    let routerLink = [
      level.length ? `?level=${level[0].levelType}` : '',
      price.length ? `&price=${price[0].priceID}` : '',
    ].join('');

    if (categories.length) {
      categories.forEach((item) => {
        console.log(item);
        console.log(item.categoryID.split('#')[0]);

        routerLink += `&category=${item.categoryID.split('#')[0]}`;
      });
    }
    window.history.replaceState(null, '', routerLink);

    const listCourseQueryRel = await searchCourseFilter({
      level: level[0],
      price: price[0],
      categories: categories,
      limit: LIMIT_MAX,
      lastEvaluatedKey,
    }).unwrap();
    // setListCourseQuery([...listCourseQuery, ...listCourseQueryRel.courses]);
    setListCourseQuery(listCourseQueryRel.courses);
    // setMoreCourse(listCourseQueryRel.hasMore);
    setLoadingFilter(false);
  };

  console.log('listCourseQuery', listCourseQuery);

  return (
    <div>
      {/* <button onClick={() => navigate(`/user/?&userId=1`)}>
        List courses
      </button> */}
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full lg:px-32 md:px-20 sm:px-6">
          <h1 className="text-white font-bold text-4xl hover:underline hover:cursor-pointer">
            Course
          </h1>
        </div>
      </div>
      <div className="lg:px-32 md:px-20 sm:px-6">
        <TabCourse />
        <div>
          <div>
            <h1 className="font-bold text-3xl mb-14">All course</h1>
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

              <SearchFilter
                listCourses={listCourseQuery}
                setListCourseQuery={setListCourseQuery}
              />
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
                        setSelected(select);
                        const newCheckedList = checkedList.filter(
                          (level: levelItem) => !level.levelID
                        );
                        setCheckedList([...newCheckedList, select]);
                      }}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {selected?.levelID.split('#')[1]}
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
                          <Listbox.Options className="absolute mt-1 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                                        selected ? 'font-bold' : 'font-normal'
                                      }`}
                                    >
                                      {level.levelID.split('#')[1]}
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

                    <Combobox
                      multiple
                      value={categorySelected}
                      onChange={(value: any) => {
                        console.log('value', value);

                        if (value.length > categorySelected.length) {
                          console.log('ínert');
                          setCategorySelected(value);
                          const newCheckedList = removeDuplicateCheckedList(
                            checkedList,
                            value
                          );
                          setCheckedList(newCheckedList);
                        } else if (value.length < categorySelected.length) {
                          console.log('deletekeken');
                          setCategorySelected(value);
                          const newCheckedList = removeCategoryItemOfArrays(
                            checkedList,
                            value
                          );
                          setCheckedList(newCheckedList);
                        } else {
                          console.log('===================');
                        }
                      }}
                    >
                      <div className="relative mt-1">
                        <ComboboxInput
                          className="w-full border-none text-sm/6 rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md outline-gray-300 "
                          // displayValue={(category: categoryItem) =>
                          //   // category.categoryID.split('#')[1]
                          //   console.log(category)
                          // }
                          onChange={(event: any) =>
                            setQueryCategory(event.target.value)
                          }
                          placeholder="Search Category"
                        />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="size-4 fill-white/60 group-data-[hover]:fill-white"
                          />
                        </ComboboxButton>
                      </div>
                      <Transition
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryCategory('')}
                      >
                        <ComboboxOptions
                          anchor="bottom"
                          className="mt-2 max-h-60 lg:w-[calc(25%-4rem)] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm [--anchor-gap:var(--spacing-1)] empty:hidden"
                        >
                          {filteredCategoryList.map((category) => (
                            <ComboboxOption
                              key={category.categoryID}
                              value={category}
                              className="group cursor-pointer items-center -px-2 rounded-lg select-none data-[focus]:bg-white/10"
                            >
                              <div className="w-full gap-2 flex items-center group-data-[selected]:bg-amber-100 group-data-[selected]:text-amber-700 group-data-[selected]:font-bold py-1.5 px-3 ">
                                <FontAwesomeIcon
                                  icon={faFilter}
                                  className="invisible size-4 fill-white group-data-[selected]:visible"
                                />
                                <div className="text-sm/6">
                                  {category.categoryID.split('#')[1]}
                                </div>
                              </div>
                            </ComboboxOption>
                          ))}
                        </ComboboxOptions>
                      </Transition>
                      {categorySelected.length > 0 && (
                        <ul className="mt-3 flex gap-2 flex-wrap">
                          {categorySelected.map((categoryItemSelected) => (
                            <li
                              key={categoryItemSelected.categoryID}
                              className="flex bg-sky-400 text-gray-600 w-fit px-1 rounded"
                            >
                              {categoryItemSelected?.categoryID.split('#')[1]}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Combobox>
                  </div>

                  <div className="mt-6 py-3 border-t-2">
                    <h1 className="font-bold text-2xl mb-4">Price</h1>
                    {/* {getListPriceMasterSuccess && ( */}
                    <div>
                      {priceListMaster.map((price) => (
                        <div key={price.priceID} className="flex items-center">
                          <input
                            type="radio"
                            id={price.priceID}
                            name={price.priceID}
                            checked={price.checked}
                            className="w-4 h-4 mr-2"
                            onChange={(e) => {
                              priceListMaster.map(
                                (price) => (price.checked = false)
                              );
                              price.checked = e.target.checked;
                              const newCheckedList = checkedList.filter(
                                (priceCheck: any) => !priceCheck.priceID
                              );
                              setCheckedList([...newCheckedList, price]);
                            }}
                          />
                          <label htmlFor={price.priceID}>
                            <span>
                              {numberWithCommas(price.priceMin as number)} ~
                              {numberWithCommas(price.priceMax as number)}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
              <div className="lg:w-9/12 sm:w-full mt-6">
                {isLoadingFilter ? (
                  <div className="flex justify-center">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      color="blue"
                      className="text-5xl z-50"
                    />
                  </div>
                ) : listCourseQuery.length ? (
                  <SearchList listCourseQuery={listCourseQuery} />
                ) : (
                  <p className="font-bold italic text-gray-600 text-xl">
                    No Course with filter
                  </p>
                )}

                {hasMoreCourse && (
                  <button onClick={handleFilter}>Load more</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

// delete categoryID in arr1 if it exist in arr2
const removeCategoryItemOfArrays = (arr1: any[], arr2: any[]) => {
  const arr1Map: any = {};
  if (arr2.length) {
    arr2.forEach((item) => (arr1Map[item.categoryID] = true));
    arr1.forEach((item, index) => {
      if (item.categoryID && arr1Map[item.categoryID]) {
        arr1.splice(index, 1);
      }
    });
  } else {
    arr1.forEach((item, index) => {
      if (item['categoryID']) {
        arr1.splice(index, 1);
      }
    });
  }

  return arr1;
};

// remove duplicate  {} have categoryID in arr1 and arr2

const removeDuplicateCheckedList = (arr1: any[], arr2: any[]) => {
  const arr: any[] = [...arr1, ...arr2];
  const arrMap: any = {};

  arr.forEach((item, index) => {
    if (item.categoryID) {
      if (arrMap[item.categoryID] == true) {
        arr.splice(index, 1);
      }
      arrMap[item.categoryID] = true;
    }
  });

  return arr;
};
