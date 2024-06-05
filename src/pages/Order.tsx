import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useScript from 'react-script-hook';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { createPaymentLink } from '../utils/payosApi';
import Loader from '../components/Loader';
import { useBuyCourseMutation } from '../redux/coursesApi';
import { PAYMENT_STATUS, PAYMENT_TYPE } from '../constants/common';
import { numberWithCommas } from '../utils/common';

export default function Order() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const [openUICustomLoading, setOpenUICustomLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [openDialogLoading, setOpenDialogLoading] = useState(false);
  const [descriptionRef, setDescription] = useState<string>('Payment course');

  // const priceRef = useRef(2000);

  const [buyCourse, { isLoading }] = useBuyCourseMutation();

  const handleBuyCourse = async (status: number) => {
    await buyCourse({
      userID: state?.userID,
      authorID: state?.authorID,
      courseID: state?.courseID,
      amount: Number(state.courseData.price),
      // courseTitle: state.courseData.title,
      description: descriptionRef,
      payment_flg: status,
      // type: PAYMENT_TYPE.COURSE,
    }).unwrap();
    toast.success('Buy course successfully');
  };

  // const [createPaymentLink] = useCreatePaymentLinkMutation();

  const [loading, error] = useScript({
    src: 'https://cdn.payos.vn/payos-checkout/v1/stable/payos-initialize.js',
    checkForExisting: true,
  });
  const RETURN_URL = `${window.location.href}result/`;
  const CANCEL_URL = `${window.location.href}result/`;

  const createPaymentLinkHandle = async (
    callbackFunction: any,
    setLoading: any
  ) => {
    setLoading(true);
    try {
      const body = JSON.stringify({
        description: descriptionRef,
        productName: state.courseData.title,
        // 0 -> 50 => 0 -> 5000đ
        amount: Number(state.courseData.price) * 1000,
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
  const openUICustom = (checkoutResponse: any) => {
    const {
      accountName,
      accountNumber,
      amount,
      description,
      orderCode,
      qrCode,
      bin,
    } = checkoutResponse;
    navigate('/payment', {
      state: {
        accountName,
        accountNumber,
        amount,
        description,
        orderCode,
        qrCode,
        bin,
      },
    });
  };
  const redirectPaymentLink = async function (checkoutResponse: any) {
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
      window.location.href = url;
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
          await handleBuyCourse(PAYMENT_STATUS.SUCCESS);
          // window.location.href = `${RETURN_URL}?orderCode=${eventData.orderCode}`;
          navigate(`/courses/${state?.courseID}`);
        },
        onCancel: async (eventData: any) => {
          console.log(eventData);
          await handleBuyCourse(PAYMENT_STATUS.CANCEL);
          navigate(`/courses/${state?.courseID}`);
          // window.location.href = `${CANCEL_URL}?orderCode=${eventData.orderCode}`;
        },
      });
      open();
    }
  };
  return (
    <>
      {(redirectLoading || openDialogLoading || isLoading) && <Loader />}
      <div className="bg-[#111827] h-32">
        <div className="flex items-center h-full lg:px-32 md:px-20 sm:px-6">
          <h1 className="text-white font-bold text-4xl hover:underline hover:cursor-pointer">
            Payment
          </h1>
        </div>
      </div>
      <div className="lg:px-32 md:px-20 sm:px-6 mt-6">
        <div className="flex flex-col gap-y-10">
          <h1 className="font-bold text-xl">New Order</h1>
          <div className="flex">
            <div className="flex flex-col gap-y-4 w-6/12">
              <div className="flex gap-x-10">
                <div className="w-3/12">
                  <img
                    src={state.courseData.imageUrl}
                    alt=""
                    className="block w-full rounded-lg"
                  />
                </div>
                <div className="w-9/12">
                  <h1 className="text-xl font-bold">
                    {state.courseData.title}
                  </h1>
                  <div className="flex flex-col gap-y-3 mt-3">
                    <div className="flex">
                      <p className="justify-items-start w-4 mr-2">
                        <FontAwesomeIcon
                          icon={faVideo}
                          className="w-full text-gray-800/80 text-md"
                        />
                      </p>
                      <span>27 hours on-demand video</span>
                    </div>
                    <div className="flex">
                      <p className="justify-items-start w-4 mr-[6px]">
                        <FontAwesomeIcon
                          icon={faFile}
                          className="w-max text-gray-800/80 text-md"
                        />
                      </p>
                      <span>{state.courseData.totalChapters} chapters</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt">
                <h1 className="">
                  Amount :{' '}
                  <span className="font-bold">
                    {numberWithCommas(state.courseData.price)}
                  </span>
                </h1>
                <p>Billing content:</p>
                <textarea
                  value={descriptionRef}
                  onChange={(event) => setDescription(event.target.value)}
                  className="max-w-[200px] h-10 mt-3 outline-none outline-gray-950/60 focus:outline-blue-300 rounded-md p-2 text-black"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-3">Choose Payment</h1>
              <div className="flex flex-col items-center gap-y-3">
                <button
                  className="text-sm block ml-4 bg-blue-500 hover:bg-blue-950/90 font-medium text-white rounded-md px-3 py-2 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  disabled={redirectLoading}
                  onClick={() =>
                    createPaymentLinkHandle(
                      redirectPaymentLink,
                      setRedirectLoading
                    )
                  }
                >
                  Go to payment Page
                </button>
                <p>OR</p>
                <button
                  className="text-sm block ml-4 bg-blue-500 hover:bg-blue-950/90 font-medium text-white rounded-md px-3 py-2 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
                  onClick={() =>
                    createPaymentLinkHandle(
                      openPaymentDialog,
                      setOpenDialogLoading
                    )
                  }
                  disabled={openDialogLoading}
                >
                  Open dialog payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
