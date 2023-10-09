import React from 'react';
import { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import axios from 'axios';

import { CarouselContainer } from '../utils/styles';
import Product from '../models/Product';
import Layout from '../components/Layout';
import db from '../utils/db';

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

export default function Featured(featuredProducts) {
  console.log('Featured Products Type in Component:', typeof featuredProducts);
  console.log('Featured Products in Component:', featuredProducts);

  const filterFeaturedProducts = featuredProducts.featuredProducts;
  return (
    <Layout>
      <Box style={{ margin: '20px' }}>
        <Typography variant="h6">Featured Products</Typography>
      </Box>

      <Grid container spacing={3}>
        {Array.isArray(filterFeaturedProducts) &&
        filterFeaturedProducts.length > 0 ? (
          filterFeaturedProducts.map((product) => (
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
          ))
        ) : (
          <Typography>No products</Typography>
        )}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  console.log('Fetching featured products...');
  await db.connect();

  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    const featuredProductsArray = Array.from(featuredProducts)
      ? featuredProducts
      : [];

    console.log('Featured Products:', featuredProducts);
    await db.disconnect();
    return {
      props: {
        featuredProducts: JSON.parse(JSON.stringify(featuredProductsArray)),
      },
    };
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return {
      props: {
        featuredProducts,
      },
    };
  } finally {
    await db.disconnect();
  }
}
