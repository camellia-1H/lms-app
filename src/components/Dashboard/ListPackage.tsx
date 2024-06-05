import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUpdatePackageMutation } from '../../redux/userApi';
import {
  PACKAGE_PRO_PRICE,
  PACKAGE_TYPE,
  PAYMENT_STATUS,
  ROLE_USER,
} from '../../constants/common';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createPaymentLink } from '../../utils/payosApi';
import { numberWithCommas } from '../../utils/common';
import { useState } from 'react';
import useScript from 'react-script-hook';

const ListPackage = ({
  userInfo,
  fetchAuthorInfo,
}: {
  userInfo: any;
  fetchAuthorInfo: () => Promise<void>;
}) => {
  // const user = useSelector((state: RootState) => state.user.user);
  const [updatePackage, { isLoading }] = useUpdatePackageMutation();

  const [openDialogLoading, setOpenDialogLoading] = useState(false);

  const navigate = useNavigate();

  const [loading, error] = useScript({
    src: 'https://cdn.payos.vn/payos-checkout/v1/stable/payos-initialize.js',
    checkForExisting: true,
  });

  const handleUpdatePackage = async (status: number) => {
    await updatePackage({
      userID: userInfo.userID,
      amount: PACKAGE_PRO_PRICE,
      // courseTitle: state.courseData.title,
      payment_flg: status,
      // type: PAYMENT_TYPE.COURSE,
    }).unwrap();
    toast.success('Buy course successfully');
  };

  const RETURN_URL = `${window.location.href}result/`;
  const CANCEL_URL = `${window.location.href}result/`;

  const createPaymentLinkHandle = async (
    callbackFunction: any,
    setLoading: any
  ) => {
    setLoading(true);
    try {
      const body = JSON.stringify({
        description: 'Update teacher package',
        productName: 'Teacher package pro',
        // 0 -> 50 => 0 -> 5000đ
        amount: PACKAGE_PRO_PRICE * 1000,
        returnUrl: RETURN_URL,
        cancelUrl: CANCEL_URL,
      });
      let response = await createPaymentLink(body);
      console.log(response);
      if (response.error != 0) throw new Error('Call Api failed: ');
      callbackFunction(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Có lỗi xảy ra');
    }
  };

  const openPaymentDialog = async (checkoutResponse: any) => {
    if (checkoutResponse) {
      let url = checkoutResponse.checkoutUrl;
      if (checkoutResponse.checkoutUrl.startsWith('https://dev.pay.payos.vn')) {
        url = checkoutResponse.checkoutUrl.replace(
          'https://dev.pay.payos.vn',
          'https://dev.pay.payos.vn'
        );
      }
      if (checkoutResponse.checkoutUrl.startsWith('https://pay.payos.vn')) {
        url = checkoutResponse.checkoutUrl.replace(
          'https://pay.payos.vn',
          'https://pay.payos.vn'
        );
      }
      // console.log(url);
      let { open } = (window as any).PayOSCheckout.usePayOS({
        RETURN_URL: RETURN_URL,
        ELEMENT_ID: 'config_root',
        CHECKOUT_URL: url,
        onExit: (eventData: any) => {
          console.log(eventData);
        },
        onSuccess: async (eventData: any) => {
          console.log(eventData);
          await handleUpdatePackage(PAYMENT_STATUS.SUCCESS);
          // window.location.href = `${RETURN_URL}?orderCode=${eventData.orderCode}`;
          navigate(`/teacher/profile`);
        },
        onCancel: async (eventData: any) => {
          console.log(eventData);
          await handleUpdatePackage(PAYMENT_STATUS.CANCEL);
          navigate(`/teacher/profile`);
          // window.location.href = `${CANCEL_URL}?orderCode=${eventData.orderCode}`;
        },
      });
      open();
    }
  };
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
            <strong className="text-xl">
              {numberWithCommas(PACKAGE_PRO_PRICE)}
            </strong>
          </h1>

          {(userInfo?.role as string) ===
          `${ROLE_USER.RGV}#${PACKAGE_TYPE.PRO}` ? (
            <button className="cursor-default mt-3 w-full justify-center rounded-md text-sky-400 font-bold text-md bg-white px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto">
              Actived
            </button>
          ) : (
            <button
              onClick={() =>
                createPaymentLinkHandle(openPaymentDialog, setOpenDialogLoading)
              }
              disabled={openDialogLoading}
              className="mt-3 w-full justify-center rounded-md text-white font-bold text-md bg-sky-400 px-3 py-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-sky-400 hover:ring-sky-400 sm:mt-0 sm:w-auto transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
            >
              Buy Package
            </button>
          )}

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
