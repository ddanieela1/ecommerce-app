import NextLink from 'next/link';
import Image from 'next/image';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ListItem,
  Select,
  MenuItem,
  TableBody,
  Link,
  Button,
  Grid,
  Table,
  TableCell,
  Card,
  List,
} from '@mui/material';

export default function CartView() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const checkoutHandler = () => {
    router.push('/shipping');
  };

  const updateItemHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.inStock < quantity) {
      window.alert('item out of stock');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  return (
    <Layout title="Review Shopping Cart">
      <Typography component="h1" variant="h1">
        Cart: Checkout
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty!{' '}
          <NextLink href="/">
            <Link>Lets go shopping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Typography>Cart Items:</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`product/${item.slug}`} passHref>
                          <Link>
                            <img src={item.image} width={50} height={50} />
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`product/${item.slug}`}>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateItemHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                              {i + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      <TableCell align="right">${item.price}</TableCell>

                      <TableCell>
                        <Button
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography align="right">
                    {/* a= accumulator, b =current item */}
                    Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)}
                    {''} items : ${''}
                    {cartItems.reduce((a, b) => a + b.quantity * b.price, 0)})
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={checkoutHandler}
                    color="primary"
                    variant="contained"
                  >
                    Checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
