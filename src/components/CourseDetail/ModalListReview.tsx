import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

const ModalListReview = ({
  isModalListReviewOpen,
  setModalListReviewOpen,
  listReview,
  courseData,
  hasMore,
  handleLoadMore,
}: {
  isModalListReviewOpen: boolean;
  setModalListReviewOpen: any;
  listReview: any;
  courseData: any;
  hasMore: boolean;
  handleLoadMore: () => void;
}) => {
  function open() {
    setModalListReviewOpen(true);
  }

  function close() {
    setModalListReviewOpen(false);
  }

  return (
    <>
      <button
        onClick={open}
        className="mt-3 w-fit justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
      >
        More reviews
      </button>

      <Transition appear show={isModalListReviewOpen}>
        <Dialog
          as="div"
          className="relative z-50 focus:outline-none"
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800/70">
            <div className="flex items-center justify-center py-16 px-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full lg:max-w-screen-lg sm:max-w-2xl rounded-xl bg-white p-6 backdrop-blur-2xl overflow-auto ring-1 ring-gray-500/20">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400 text-xl"
                      />
                      <h2 className="text-2xl font-bold">
                        <span className="mr-1">
                          {courseData.course?.totalRate > 0
                            ? Math.ceil(
                                (courseData.course?.totalRate /
                                  courseData.course?.totalReviews) *
                                  10
                              ) / 10
                            : 0}
                        </span>
                        course rating
                      </h2>
                      <span className="text-2xl font-extrabold px-2 text-gray-500">
                        .
                      </span>
                      <h2 className="text-2xl font-bold">
                        <span>{courseData.course?.totalReviews ?? 0}</span>{' '}
                        ratings
                      </h2>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white hover:bg-gray-500"
                      onClick={close}
                    >
                      Close
                    </button>
                  </div>

                  <div className="flex flex-col justify-center gap-y-5">
                    <div className="flex flex-wrap gap-y-3">
                      {listReview.map((review: any) => (
                        <div
                          key={review.courseID.concat(review.userID)}
                          className="w-6/12 px-4 flex flex-col gap-y-4 mt-4"
                        >
                          <div className="flex border-t border-gray-300 pt-4 gap-x-4">
                            <img
                              src={review.avatar}
                              alt=""
                              className="rounded-full w-16 h-16"
                            />
                            <div>
                              <p className="text-lg font-bold">Devesh G.</p>
                              <p className="text-md">
                                {review.rate}
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-yellow-400 text-sm"
                                />
                                <span className="text-sm text-gray-600 font-bold ml-2">
                                  {review.updatedAt}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-base line-clamp-4">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleLoadMore}
                      disabled={!hasMore}
                      className={[
                        'mt-3 w-fit justify-center rounded-md text-white font-bold text-md  px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 ',
                        hasMore
                          ? 'bg-sky-400 hover:bg-white hover:text-sky-400 hover:ring-sky-400 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200 '
                          : 'bg-gray-600',
                      ].join('')}
                    >
                      More reviews
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ModalListReview;
