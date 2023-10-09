import React from 'react';
import NextLink from 'next/link';
import axios from 'axios';

import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import { users, products } from '../utils/data';

import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Grid,
  Card,
  Box,
} from '@mui/material';

const addToCartHandler = async (product) => {
  const itemExists = state.cart.cartItems.find((p) => p._id === product._id);
  const quantity = itemExists ? itemExists.quantity + 1 : 1;

  const { data } = await axios.get(`/api/products/${product._id}`);
  if (data.inStock < quantity) {
    window.alert('Product out of stock');
    return;
  }
  dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  router.push('/cart');
};

export default function BestSellers() {
  return (
    <Layout>
      <Box style={{ margin: '20px' }}>
        <Typography variant="h6">Best Sellers</Typography>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                    alt={product.name}
                    sx={{ height: 140 }}
                  >
                    {/* <img src={product.image}></img> */}
                  </CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCartHandler(product)}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  console.log('Fetching best selling products...');
  await db.connect();

  try {
    const allProducts = await Product.find().lean();

    const bestSellingProducts = allProducts.filter(
      (product) => product.rating >= 4
    );

    console.log('Best selling products:', bestSellingProducts);
    await db.disconnect();
    return {
      props: {
        bestSellingProducts: JSON.parse(JSON.stringify(bestSellingProducts)),
      },
    };
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    return {
      props: {
        bestSellingProducts,
      },
    };
  } finally {
    await db.disconnect();
  }
}
