import NextLink from 'next/link';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';
import CheckoutWizard from '../components/CheckoutWizard';

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

export default function PlaceOrder() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round(itemsPrice * 0.15);
  const totalPrice = round(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/signin?redirect=/shipping');
    }
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        'api/orders',
        {
          orderItems: cartItems,
          shipping: shippingPrice,
          shippingAddress: {
            fullName: shippingAddress.fullName,
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CLEAR_CART' });
      Cookies.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data._id}`);
      console.log(shippingAddress);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), {
        variant: 'error',
      });
    }
  };

  return (
    <Layout title="Review Order">
      <CheckoutWizard activeStep={4}></CheckoutWizard>
      <Typography component="h1" variant="h3">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card sx={{ margin: '20px' }}>
            <List>
              <ListItem>
                <Typography component="h5" variant="h5">
                  Shipping Address:
                </Typography>
              </ListItem>

              <ListItem>
                {shippingAddress ? (
                  <>
                    <Typography
                      component="div"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      <p>{shippingAddress.fullName} </p>

                      <p> {shippingAddress.address} </p>

                      <p> {shippingAddress.city}, </p>

                      <p> {shippingAddress.postalCode} </p>

                      <p> {shippingAddress.country} </p>
                    </Typography>
                  </>
                ) : (
                  <Typography>No Address added</Typography>
                )}
              </ListItem>
            </List>
          </Card>
          <Card sx={{ margin: '20px' }}>
            <List>
              <ListItem>
                <Typography component="h5" variant="h5">
                  Payment Method:
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>{paymentMethod}</Typography>
              </ListItem>
            </List>
          </Card>
          <Card sx={{ margin: '20px' }}>
            <List>
              <ListItem>
                <Typography component="h5" variant="h5">
                  Order Items:
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
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              {/* <Link> */}
                              <img
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              />
                              {/* </Link> */}
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              {/* <Link> */}
                              <Typography>{item.name}</Typography>
                              {/* </Link> */}
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
          <Card sx={{ margin: '20px' }}>
            <List>
              <ListItem>
                <Typography variant="h5">Order Summary:</Typography>
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
              </ListItem>
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

// export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
