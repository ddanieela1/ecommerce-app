import {
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { TableHead } from '@mui/material';
import React, { useEffect, useContext, useReducer } from 'react';
import NextLink from 'next/link';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import Layout from '../components/Layout';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    console.log('Use effect for OrderHistory component');
    if (!userInfo) {
      router.push('/signin');
    }

    const fetchOrders = async () => {
      try {
        console.log('Data from API:', data);
        dispatch({ type: 'FETCH_REQUEST', payload: data });

        console.log('Fetching orders...');
        console.log('Authorization token:', userInfo.token);
        console.log('User ID:', userInfo._id);
        const { data } = await axios.get(
          `/api/orders/history?_id=${userInfo._id}`,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        console.log('API Response:', data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        console.error('API Error:', err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title={'Order History'}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a">
                  {' '}
                </ListItem>
                <ListItemText primary="User Profile"></ListItemText>
              </NextLink>

              <NextLink href="/order-history" passHref>
                <ListItem selected button component="a">
                  {' '}
                </ListItem>
                <ListItemText primary="Order History"></ListItemText>
              </NextLink>
            </List>
          </Card>
        </Grid>

        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" varitant="h1">
                  Order History
                </Typography>
              </ListItem>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography>{error}</Typography>
                ) : orders.length === 0 ? (
                  <Typography>No orders found</Typography>
                ) : (
                  <TableContainer>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Delivered</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id.substring(20, 24)}</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          <TableCell>${order.totalPrice}</TableCell>
                          <TableCell>
                            {order.isPaid
                              ? ` Paid at ${order.paidAt}`
                              : 'Order not paid'}
                          </TableCell>
                          <TableCell>{order.isDelivered}</TableCell>
                          <TableCell>
                            <NextLink href={`/order/${order._id}`} passHref>
                              <Button variant="contained">Details</Button>
                            </NextLink>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
