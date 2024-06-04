import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { DataScroller } from 'primereact/datascroller';

import { useSearchCourseMutation } from '../../redux/coursesApi';
import { Link } from 'react-router-dom';

const SearchFilter = ({
  listCourses,
  setListCourseQuery,
}: {
  listCourses: any[];
  setListCourseQuery: any;
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debounceSearchValue] = useDebounce(searchValue, 500);

  const [listSearch, setSearchResult] = useState<any[]>([]);

  const searchInput = useRef<any>(null);

  const [searchCourse, { isLoading, isSuccess }] = useSearchCourseMutation();

  const handleSearchValue = (e: any) => {
    const searchValue = e.target.value;
    if (searchValue[0] !== ' ') {
      setSearchValue(e.target.value);
    }
  };

  const handleClear = () => {
    // setSearchResult([]);
    setSearchValue('');
    searchInput?.current.focus();
  };

  const handleHideResult = () => {
    // setShowResult(false);
    setSearchValue('');
  };

  const handleShowResult = () => {
    // setShowResult(true);
  };

  useEffect(() => {
    if (!debounceSearchValue.trim()) {
      setSearchResult([]);
      return;
    }

    // const fetchApi = async () => {
    //   const result = await searchCourse(searchValue).unwrap();
    //   console.log(result);
    //   setSearchResult(result);
    // };

    // fetchApi();
    /// TODO Filter base on listCourses and save them setListCourseQuery
  }, [debounceSearchValue]);

  const itemTemplate = (data: any) => {
    return (
      <div className="w-full text-black list-none ">
        <Link
          to={`/courses/${data.courseID}`}
          className="flex gap-x-4 hover:bg-gray-200 rounded-sm px-3 py-2"
        >
          <img src={data.imageUrl} alt="" className="w-14 h-14" />
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold">{data.title}</h3>
            <div>
              <h3 className="text-sm text-gray-400">{data.authorName}</h3>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="lg:4/12 md:w-4/12 sm:w-8/12">
      <div className="pt-1 w-full">
        <form action="" className="relative flex items-center">
          <input
            className="w-full h-12 outline-none outline-gray-950/10 rounded-md p-2 focus:outline-blue-300 text-black"
            type="text"
            placeholder="Search Course"
            value={searchValue}
            ref={searchInput}
            onChange={handleSearchValue}
          />
          {searchValue && !isLoading && (
            <button className="absolute right-4" onClick={handleClear}>
              <FontAwesomeIcon icon={faXmark} color="red" />
            </button>
          )}
          {isLoading && (
            <button className="absolute right-4">
              <FontAwesomeIcon icon={faSpinner} spin color="blue" />
            </button>
          )}
        </form>
      </div>
      {isSuccess && (
        <div className="w-full rounded-lg">
          {listSearch.length > 0 && (
            <DataScroller
              value={listSearch}
              itemTemplate={itemTemplate}
              rows={5}
              style={{ background: '#111827!' }}
              className="list-none rounded-md mt-1 shadow-md bg-gray-500/80"
            />
          )}
          {!listSearch.length && searchValue.length > 0 && (
            <div className="flex flex-col gap-y-6">
              <h1 className="text-xl font-bold">
                Sorry, we couldn't find any results for cxhtch
              </h1>
              <h2 className="text-lg">
                Try adjusting your search. Here are some ideas:
              </h2>
              <ul className="flex flex-col gap-y-4">
                <li className="text-lg">
                  Make sure all words are spelled correctly
                </li>
                <li className="text-lg">Try different search terms</li>
                <li className="text-lg">Try more general search terms</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchFilter;
