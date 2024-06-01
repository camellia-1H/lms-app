import axios from 'axios';

export async function createPaymentLink(formData: any) {
  try {
    const res = await axios({
      method: 'POST',
      url: `https://a50crcnry3.execute-api.us-east-1.amazonaws.com/Dev/order/create`,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getListBank() {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://api.vietqr.io/v2/banks`,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}
export async function getOrder(orderId: any) {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://a50crcnry3.execute-api.us-east-1.amazonaws.com/Dev/order/${orderId}`,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}
export async function cancelOrder(orderId: any) {
  try {
    const res = await axios({
      method: 'POST',
      url: `https://a50crcnry3.execute-api.us-east-1.amazonaws.com/Dev/order/${orderId}`,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}
