import Layout from '@/components/layout';
import { Store } from '@/utils/Store';
import { TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useContext } from 'react';
import NextLink from 'next/link ';

export default function CartView() {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <Layout title="Review Shopping Cart">
      <Typography component="h1 ">Cart: Checkout</Typography>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty! <NextLink href="/">Lets go shopping</NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">quantity</TableCell>
                    <TableCell align="right">Button</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            Cart Items
          </Grid>
          <Grid md={3} xs={12}>
            Cart buttons
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
