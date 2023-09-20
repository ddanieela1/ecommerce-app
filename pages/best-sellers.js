import React from 'react';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { styled } from '@mui/system';
import Image from 'next/image';

import NextLink from 'next/link';
import axios from 'axios';
import Layout from '../components/Layout';

import { useContext, useEffect } from 'react';
import db from '../utils/db';
import Product from '../models/Product';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import Box from '@mui/material/Box';
import { users, products } from '../utils/data';

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

// console.log(' bestSellingProductsProducts', bestSellingProducts);
// console.log(' bestSellingProductsProducts length', bestSellingProducts.length);
export default function BestSellers() {
  return (
    <Layout>
      <Box style={{ margin: '20px' }}>
        <Typography variant="h6">Featured Products</Typography>
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

  const allProducts = await Product.find().lean();

  const bestSellingProducts = allProducts.filter(
    (product) => product.rating >= 4
  );
  //   const bestSellingProducts = await Product.find({ rating: true }).lean();

  console.log('Best selling products:', bestSellingProducts);
  await db.disconnect();
  return {
    props: {
      bestSellingProducts: JSON.parse(JSON.stringify(bestSellingProducts)),
    },
  };
}
