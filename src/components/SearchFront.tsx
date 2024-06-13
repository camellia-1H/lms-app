import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { DataScroller } from 'primereact/datascroller';

import { useSearchCourseMutation } from '../redux/coursesApi';
import { Link } from 'react-router-dom';

const SearchFront: React.FC = () => {
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

    const fetchApi = async () => {
      const result = await searchCourse(searchValue).unwrap();
      console.log(result);
      setSearchResult(result);
    };

    fetchApi();
  }, [debounceSearchValue]);

  const itemTemplate = (data: any) => {
    return (
      <div className="w-full text-black list-none">
        <Link
          to={`/courses/${data.courseID}`}
          className="flex gap-x-4 hover:bg-gray-200 rounded-sm px-3 py-2"
        >
          <img src={data.imageUrl} alt="" className="w-14 h-14" />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold line-clamp-1 flex-1">
              {data.title.trim()}
            </h3>
            <div>
              <h3 className="text-sm text-gray-400">
                {data.authorName.trim()}
              </h3>
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
            className="w-full h-18 outline-none outline-gray-950/10 rounded-md p-4 focus:outline-blue-300 outline-2 text-black"
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
              rows={2}
              style={{ background: '#111827!' }}
              className="list-none rounded-md mt-1 shadow-md bg-gray-500/80"
            />
          )}
          {!listSearch.length && searchValue.length > 0 && (
            <div className="flex flex-col gap-y-6 mb-5">
              <h1 className="text-xl font-bold">
                Sorry, we couldn't find any results for cxhtch
              </h1>
              <h2 className="text-lg">Try adjusting your search.</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchFront;
