import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COURSE_STATUS, ROLE_USER } from '../../constants/common';

export const ActionForm = ({
  handleDeleteCourse,
  courseData,
}: {
  handleDeleteCourse: () => void;
  courseData: any;
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [isShow, setShow] = useState<boolean>(false);
  const toggleEdit = () => setShow((current) => !current);

  return (
    <>
      <div className="border-l-2 border-gray-200 ml-3">
        <button
          disabled={
            (user.role as string).startsWith(ROLE_USER.RGV) &&
            courseData.courseStatus === COURSE_STATUS.PUBLIC
          }
          onClick={toggleEdit}
          className={[
            'inline-flex w-full justify-center text-white rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ',
            (user.role as string).startsWith(ROLE_USER.RGV) &&
            courseData.courseStatus === COURSE_STATUS.PUBLIC
              ? 'bg-gray-500 '
              : 'bg-red-700 hover:bg-red-900 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200 ',
          ].join('')}
        >
          Delete
        </button>
      </div>
      <div
        className={['relative z-10 ', isShow ? 'block' : 'hidden'].join('')}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-6 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="text-red-500 text-xl"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Delete Course
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete your course? All of your
                        course and data of chapters will be permanently removed.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  onClick={() => {
                    handleDeleteCourse();
                    toggleEdit();
                  }}
                >
                  Delete
                </button>
                <button
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  onClick={toggleEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
