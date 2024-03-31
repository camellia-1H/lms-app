import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search: React.FC = () => {
  return (
    <div className="pt-1 lg:4/12 sm:w-4/12">
      <form action="" className="relative flex items-center">
        <input
          className="w-full h-12 outline-none outline-gray-950/10 rounded-md p-2 focus:outline-blue-300 text-black"
          type="text"
          name=""
          id=""
          placeholder="Search Course"
        />
        <button className="absolute right-4">
          <FontAwesomeIcon icon={faXmark} color="red" />
        </button>
        <button className="absolute right-4">
          <FontAwesomeIcon icon={faSpinner} spin color="blue" />
        </button>
      </form>
    </div>
  );
};
export default Search;
