import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchCourseMutation } from '../redux/coursesApi';

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debounceSearchValue] = useDebounce(searchValue, 500);

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
      // setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      const result = await searchCourse(searchValue).unwrap();
      console.log(result);
      // setSearchResult(result);
    };

    fetchApi();
  }, [debounceSearchValue]);

  return (
    <div className="pt-1 lg:4/12 sm:w-4/12">
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
          <button className="absolute right-4">
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
  );
};
export default Search;
