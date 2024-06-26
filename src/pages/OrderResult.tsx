import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Toolbar } from '@mui/material';
import PaymentFieldsTableDemo from '../components/Payment/PaymentFieldsTableDemo';
import OrderTableDemo from '../components/Payment/OrderTableDemo';
import { useLocation } from 'react-router-dom';
import { getOrder } from '../utils/payosApi';
import Header from '../components/Header';
import toast from 'react-hot-toast';
export default function OrderResult() {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  let orderCode = null;
  let paramsValue = new URLSearchParams(location.search);
  if (paramsValue.size === 0) {
    orderCode = location.state?.orderCode;
  } else {
    orderCode = paramsValue.get('orderCode');
  }

  useEffect(() => {
    if (orderCode !== null) {
      getOrder(orderCode)
        .then((data) => {
          console.log(data);
          if (data.error == 0) {
            setOrder(data.data);
          } else if (data.error == -1) {
            toast.error('Not found payment');
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Something is error');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <Box>
      <Header />
      {loading ? (
        <LinearProgress />
      ) : (
        <Box>
          <OrderTableDemo data={order} />
          {/* <PaymentFieldsTableDemo data={order?.webhook_snapshot} /> */}
        </Box>
      )}
    </Box>
  );
}
