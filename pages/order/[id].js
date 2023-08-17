import NextLink from 'next/link';
import Image from 'next/image';
import React, { useContext, useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError, onError } from '../../utils/error';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import dynamic from 'next/dynamic';

import axios from 'axios';
import {
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ListItem,
  TableBody,
  Link,
  Button,
  Grid,
  Table,
  TableCell,
  Card,
  List,
  CircularProgress,
} from '@mui/material';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { get } from 'mongoose';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, error: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: true, error: '' };
    default:
      return state;
  }
}

// line 343 -344
function Order({ params }) {
  // id=[id]
  const orderId = params?.id;
  if (!orderId) {
    enqueueSnackbar('Invalid order id, orderid not found', {
      variant: 'error',
    });
  }
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, order, successPay }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: '',
    }
  );

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    updatedOrder,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  useEffect(() => {
    if (!userInfo) {
      router.push('/signin');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        // convert data to clientid
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        // set clientId for paypal
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: ' USD',
          },
        });
        // load paypal from paypal site
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [successPay]);

  // const fetchOrderAndPaypal = async () => {
  //   try {
  //     dispatch({ type: 'FETCH_REQUEST' });
  //     const { data } = await axios.get(`/api/orders/${orderId}`, {
  //       headers: {
  //         authorization: `Bearer ${userInfo.token}`,
  //       },
  //     });
  //     console.log('Order is paid', data.isPaid);
  //     dispatch({ type: 'FETCH_SUCCESS', payload: data });

  //     if (!order._id || successPay || (order._id && order._id !== orderId)) {
  //       if (successPay) {
  //         dispatch({ type: 'PAY_RESET' });
  //       }
  //     } else {
  //       const { data: clientId } = await axios.get('/api/keys/paypal', {
  //         headers: {
  //           authorization: `Bearer ${userInfo.token}`,
  //         },
  //       });
  //       paypalDispatch({
  //         type: 'resetOptions',
  //         value: {
  //           'client-id': clientId,
  //           currency: ' USD',
  //         },
  //       });

  //       paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
  //     }
  //   } catch (error) {
  //     dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
  //   }
  // };

  // // Call the fetch function when component mounts
  // useEffect(() => {
  //   fetchOrderAndPaypal();
  // }, [order, successPay]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/orders/${orderId}`, {
  //         headers: {
  //           authorization: `Bearer ${userInfo.token}`,
  //         },
  //       });

  //       const updatedOrder = data;

  //       if (
  //         !updatedOrder._id ||
  //         successPay ||
  //         (updatedOrder._id && updatedOrder._id !== orderId)
  //       ) {
  //         if (successPay) {
  //           dispatch({ type: 'PAY_RESET' });
  //         }
  //       } else {
  //         const { data: clientId } = await axios.get('/api/keys/paypal', {
  //           headers: {
  //             authorization: `Bearer ${userInfo.token}`,
  //           },
  //         });
  //         paypalDispatch({
  //           type: 'resetOptions',
  //           value: {
  //             'client-id': clientId,
  //             currency: ' USD',
  //           },
  //         });
  //         paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
  //       }

  //       dispatch({ type: 'FETCH_SUCCESS', payload: updatedOrder });
  //     } catch (error) {
  //       dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
  //     }
  //   };

  //   fetchData();
  // }, [order, successPay]);

  const { enqueueSnackbar } = useSnackbar();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  //  update to paid on be
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        // uextract updated order from response
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        console.log('Order is paid', order.isPaid);

        dispatch({ type: 'PAY_SUCCESS', payload: data });
        enqueueSnackbar('Order is paid', { variant: 'success' });
      } catch (err) {
        console.log('pay error', err);
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    });
  }

  function onError(data, actions) {
    enqueueSnackbar(getError(err), { variant: 'error' });
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography component="h5" variant="h5">
        Order {orderId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card>
              <List>
                <ListItem>
                  {shippingAddress.fullName},{shippingAddress.address},{''}
                  {shippingAddress.city},{shippingAddress.postalCode},{''}
                  {shippingAddress.country}
                </ListItem>
                <ListItem>
                  Status:{' '}
                  {isDelivered
                    ? `delivered at ${deliveredAt}`
                    : 'Not delivered'}
                </ListItem>
              </List>
            </Card>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>
                  Status: {order.isPaid ? `Paid at ${paidAt}` : 'not paid'}
                </ListItem>
                <ListItem>
                  <Typography>{paymentMethod}</Typography>
                </ListItem>
              </List>
            </Card>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Order Items
                  </Typography>
                </ListItem>

                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {orderItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  />
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>${item.price}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h5">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${taxPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>${shippingPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Total:</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>${totalPrice}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>

                  {!order.isPaid && (
                    <ListItem>
                      {isPending ? (
                        <CircularProgress />
                      ) : (
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      )}
                    </ListItem>
                  )}
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

//  pass id from server to url - /api/orders/${orderId}
export async function getServerSideProps({ params }) {
  return { props: { params } };
}
export default dynamic(() => Promise.resolve(Order));
