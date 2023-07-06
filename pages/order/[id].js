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
  const orderId = params.id;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const router = useRouter();
  const { state } = useContext(Store);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
        dispatch({ type: 'FETCH_ORDER' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
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
  }, [order, successPay]);

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
        // update state in be
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        enqueueSnackbar('Order is paid', { variant: 'success' });
      } catch (err) {
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
      <Typography component="h1" variant="h1">
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
                  <Typography component="h2" variant="h2">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>
                  Status: {isPaid ? `Paid at ${paidAt}` : 'not paid'}
                </ListItem>
                <ListItem>
                  <Typography>{paymentMethod}</Typography>
                </ListItem>
              </List>
            </Card>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
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
                        {orderItems.map((item) => {
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Image
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
                          </TableRow>;
                        })}
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
                  <Typography variant="h2">Order Summary</Typography>
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
                  {!isPaid && (
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
export default dynamic(() => Promise.resolve(Order), { ssr: false });
