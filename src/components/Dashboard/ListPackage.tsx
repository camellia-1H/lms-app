import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListPackage = () => {
  return (
    <div className="flex gap-x-16">
      <div className="max-w-[350px] rounded-[30px] border-2 border-gray-400 shadow-md px-10 py-4">
        <div className="flex flex-col gap-y-6">
          <h1 className="font-bold text-xl">Package Basic</h1>
          <p className="max-w-60 text-gray-500">
            Basic package when users sign up with simple capabilities
          </p>
          <h1>
            <strong className="text-xl">FREE</strong>
          </h1>

          <button className="cursor-default mt-3 w-full justify-center rounded-md text-sky-400 font-bold text-md bg-white px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto">
            Actived
          </button>

          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-3 items-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xl text-green-500"
              />
              <span>
                Limit Course : <strong>2</strong>
              </span>
            </div>
            <div className="flex gap-x-3 items-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xl text-green-500"
              />
              <span>
                Display order : <strong>Medium</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[350px] rounded-[30px] border-2 border-gray-400 shadow-md px-10 py-4">
        <div className="flex flex-col gap-y-6">
          <h1 className="font-bold text-xl">Package Pro</h1>
          <p className="max-w-60 text-gray-500">
            Package Pro with many advanced features
          </p>
          <h1>
            <strong className="text-xl">300</strong>
          </h1>

          <button className="mt-3 w-full justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200">
            Buy Package
          </button>

          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-3 items-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xl text-green-500"
              />
              <span>
                Limit Course : <strong>No limit</strong>
              </span>
            </div>
            <div className="flex gap-x-3 items-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xl text-green-500"
              />
              <span>
                Display order : <strong>Highest</strong>
              </span>
            </div>
            <div className="flex gap-x-3 items-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xl text-green-500"
              />
              <span>
                <strong>Auto</strong> accept request post course
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListPackage;
