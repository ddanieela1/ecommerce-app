import Layout from '@/components/layout';
import { Store } from '@/utils/Store';
import {
  ListItem,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import NextLink from 'next/link';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Image from 'next/image';
import Select from '@mui/material';
import MenuItem from '@mui/material';
import Button from '@mui/material';

export default function CartView() {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <Layout title="Review Shopping Cart">
      <Typography component="h1">Cart: Checkout</Typography>
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
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <NextLink href={`product/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`product/${item.slug}`}>
                          <Typography>{item.name}</Typography>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <Select align="right" value={item.quantity}>
                          {[...Array(item.countInStock).keys()].map((i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                              {i + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      <TableCell align="right">${item.price}</TableCell>

                      <TableCell>
                        <Button align="right" color="secondary">
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            Cart Items
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem></ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
