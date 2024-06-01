import {
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { createPaymentLink } from '../utils/payosApi';

import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useScript from 'react-script-hook';
import { useCreatePaymentLinkMutation } from '../redux/orderApi';
import toast from 'react-hot-toast';

export default function Order() {
  const navigate = useNavigate();
  const [openUICustomLoading, setOpenUICustomLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [openDialogLoading, setOpenDialogLoading] = useState(false);
  const productNameRef = useRef('');
  const descriptionRef = useRef('');
  const priceRef = useRef(1000);

  // const [createPaymentLink] = useCreatePaymentLinkMutation();

  const [loading, error] = useScript({
    src: import.meta.env.REACT_APP_PAYOS_SCRIPT as string,
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
        description: descriptionRef.current.value,
        productName: productNameRef.current.value,
        amount: Number(priceRef.current.value),
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
      let { open } = window.PayOSCheckout.usePayOS({
        RETURN_URL: RETURN_URL,
        ELEMENT_ID: 'config_root',
        CHECKOUT_URL: url,
        onExit: (eventData: any) => {
          console.log(eventData);
        },
        onSuccess: (eventData: any) => {
          console.log(eventData);
          window.location.href = `${RETURN_URL}?orderCode=${eventData.orderCode}`;
        },
        onCancel: (eventData: any) => {
          console.log(eventData);
          window.location.href = `${CANCEL_URL}?orderCode=${eventData.orderCode}`;
        },
      });
      open();
    }
  };
  return (
    <Box
      component={'div'}
      className="flex flex-col !content-center flex-wrap gap-5"
    >
      <Header />
      <Box
        component="div"
        className="w-3/4 md:w-1/2"
        sx={{ alignSelf: 'center' }}
      >
        <Typography component="h4" variant="h4" className="!font-bold">
          Tạo mới đơn hàng
        </Typography>
        <Box component="div" sx={{ marginTop: '20px', marginBottom: '20px' }}>
          <Typography>Tên sản phẩm:</Typography>
          <Box component="div" sx={{ width: '100%', marginTop: '10px' }}>
            <TextField
              id="outlined-basic"
              label="Nhập tên sản phẩm"
              variant="outlined"
              defaultValue="Mì tôm Hảo Hảo ly"
              inputRef={productNameRef}
              fullWidth
            />
          </Box>
        </Box>
        <Box component="div" sx={{ marginTop: '20px', marginBottom: '20px' }}>
          <Typography>Đơn giá:</Typography>
          <Box component="div" sx={{ width: '100%', marginTop: '10px' }}>
            <TextField
              id="outlined-basic"
              label="Nhập đơn giá"
              variant="outlined"
              defaultValue="1000"
              inputRef={priceRef}
              fullWidth
            />
          </Box>
        </Box>
        <Box component="div" sx={{ marginBottom: '20px' }}>
          <Typography>Nội dung thanh toán:</Typography>
          <Box component="div" sx={{ width: '100%', marginTop: '10px' }}>
            <TextField
              id="outlined-basic"
              label="Nhập nội dung"
              variant="outlined"
              defaultValue="Thanh toan don hang"
              inputRef={descriptionRef}
              fullWidth
            />
          </Box>
        </Box>
        <Box component="div" className="flex flex-col gap-3 items-center">
          <Button
            variant="contained"
            onClick={() =>
              createPaymentLinkHandle(redirectPaymentLink, setRedirectLoading)
            }
            disabled={redirectLoading}
            className="!bg-[#5D5FEF] !normal-case"
          >
            Đến trang thanh toán
            {redirectLoading ? (
              <>
                {' '}
                &nbsp; <CircularProgress className="!text-white" size={20} />
              </>
            ) : (
              ''
            )}
          </Button>
          <Typography>Hoặc</Typography>
          <Button
            variant="contained"
            onClick={() =>
              createPaymentLinkHandle(openPaymentDialog, setOpenDialogLoading)
            }
            disabled={openDialogLoading}
            className="!bg-[#5D5FEF] !normal-case"
          >
            Mở Dialog thanh toán
            {openDialogLoading ? (
              <>
                {' '}
                &nbsp; <CircularProgress className="!text-white" size={20} />
              </>
            ) : (
              ''
            )}
          </Button>
          <Typography>Hoặc</Typography>
          <Button
            variant="contained"
            onClick={() =>
              createPaymentLinkHandle(openUICustom, setOpenUICustomLoading)
            }
            disabled={openUICustomLoading}
            className="!bg-[#5D5FEF] !normal-case"
          >
            Chuyển trang giao diện tùy chỉnh
            {openUICustomLoading ? (
              <>
                {' '}
                &nbsp; <CircularProgress className="!text-white" size={20} />
              </>
            ) : (
              ''
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
