import { faMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SearchItem: React.FC = () => {
  return (
    <Link
      to={'/courses/course_id'}
      className="block w-full mb-4 pb-4 border-b-2 border-gray-100 hover:opacity-80"
    >
      <div className="w-full flex">
        <div className="lg:w-4/12 sm:w-6/12">
          <img
            src="https://demos.wplms.io/main/wp-content/uploads/2023/06/c2.jpg"
            alt=""
            className="rounded-xl block w-full"
          />
        </div>
        <div className="ml-3">
          <div className="relative">
            <h1 className="font-semibold text-lg -mt-1">Learn Bard</h1>
            <p className="lg:w-10/12 sm:w-10/12 text-sm">
              Excel, Accounting, Financial Statement Analysis, Business
              Analysis, Financial Math, PowerPoint: Everything is Included!
            </p>
            <h2 className="text-sm text-gray-500">Category</h2>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMarker} />
              <h3 className="mt-2">10 chapters</h3>
            </div>
            <ul className="mx-1 flex flex-1 mt-3 space-x-1 text-xs font-normal leading-4 text-gray-500 w-full">
              <li>5h agos</li>
              <li>&middot;</li>
              <li>99 comments</li>
              <li>&middot;</li>
              <li>1 shares</li>
            </ul>
            <div className="flex flex-col justify-end absolute top-0 right-0">
              <p className="font-bold">100$</p>
              <p className="font-bold">
                <s>123$</s>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SearchItem;
