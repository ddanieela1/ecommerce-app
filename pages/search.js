import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import axios from 'axios';

import Layout from '../components/Layout';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';

import { MenuItem } from '@mui/base';
import {
  Grid,
  Typography,
  Select,
  Button,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  FormControl,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
  Rating,
  Pagination,
} from '@mui/material';

const PAGE_SIZE = 5;

const prices = [
  {
    name: '$1 to $10',
    value: '1-10',
  },
  {
    name: '$10 to $20',
    value: '10-20',
  },
  {
    name: '$20 to $30',
    value: '20-30',
  },
];

const ratings = [1, 2, 3, 4, 5];
export default function Search(props) {
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    sort = 'all',
    rating = 'all',
  } = router.query || {};

  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    selectedRating,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;

    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (selectedCategory) => {
    filterSearch({ category: selectedCategory });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };

  const brandHandler = (selectedBrand) => {
    console.log('Brand selected:', selectedBrand);
    console.log('Brand :', brand);
    filterSearch({ brand: selectedBrand });
  };

  const sortHandler = (selectedSort) => {
    // if (e.target && e.target.value) {
    console.log('Sort Clicked :', selectedSort);
    filterSearch({ sort: selectedSort });
    // }
  };

  const priceHandler = (selectedPrice) => {
    console.log('Price selected:', selectedPrice);
    console.log('Price :', price);
    filterSearch({ price: selectedPrice });
  };

  const ratingHandler = (selectedRating) => {
    console.log('Rating selected:', selectedRating);
    console.log('Rating :', rating);
    filterSearch({ rating: selectedRating });
  };

  const { state, dispatch } = useContext(Store);

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
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Layout title="Search">
      <FormControl fullWidth>
        <Grid container spacing={1}>
          <Grid item md={2}>
            <List style={{ display: 'block' }}>
              <Box fullWidth>
                <ListItemButton onClick={() => handleClick()}>
                  <ListItemText
                    style={{ display: 'block' }}
                    primary="Categories"
                  />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {categories &&
                      categories.map((category) => (
                        <div
                          key={category}
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <ListItemButton
                            sx={{ pl: 4, display: 'block' }}
                            onClick={() => categoryHandler(category)}
                          >
                            <ListItemText
                              primary={category}
                              key={category}
                              value={category}
                            >
                              {category}
                            </ListItemText>
                          </ListItemButton>
                        </div>
                      ))}
                  </List>
                </Collapse>
              </Box>

              <Box fullWidth>
                <ListItemButton onClick={handleClick}>
                  <ListItemText primary="Brand" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {brands &&
                      brands.map((brand) => (
                        <div
                          key={brand}
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <ListItemButton
                            key={brand}
                            sx={{
                              pl: 4,
                            }}
                            onClick={() => brandHandler(brand)}
                          >
                            <ListItemText
                              primary={brand}
                              key={brand}
                              value={brand}
                            >
                              {brand}
                            </ListItemText>
                          </ListItemButton>
                        </div>
                      ))}
                  </List>
                </Collapse>
              </Box>

              <Box fullWidth>
                <ListItemButton onClick={handleClick}>
                  <ListItemText primary="Price" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {prices.map((priceOption, index) => (
                      // <div
                      //   key={price}
                      //   style={{ display: 'flex', flexDirection: 'column' }}
                      // >
                      <ListItemButton
                        key={index}
                        onClick={() => priceHandler(priceOption.value)}
                        style={{ display: 'flex', flexDirection: 'column' }}
                      >
                        {priceOption.name}
                      </ListItemButton>
                      // </div>
                    ))}
                  </List>
                </Collapse>
              </Box>

              <Box fullWidth>
                <ListItemButton onClick={handleClick}>
                  <ListItemText primary="Rating" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {ratings.map((rating) => (
                      <ListItemButton
                        key={rating}
                        sx={{ pl: 4 }}
                        onClick={() => ratingHandler(rating)}
                      >
                        <ListItemText name={rating} value={rating}>
                          <Rating value={rating} readOnly />
                        </ListItemText>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            </List>
            <Box fullWidth>
              <ListItemButton onClick={handleClick}>
                <ListItemText primary="Sort By" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {[
                    { label: 'Featured', value: 'featured' },
                    { label: 'Price: High to Low', value: 'price-desc' },
                    { label: 'Price: Low to High', value: 'price-asc' },
                    { label: 'Costumer Reviews', value: 'toprated' },
                    { label: 'Newest Arrivals', value: 'newest' },
                  ].map((sortOption) => (
                    <ListItemButton
                      key={sortOption.value}
                      sx={{ pl: 4, display: 'block' }}
                      onClick={() => sortHandler(sortOption.value)}
                    >
                      <ListItemText
                        name={sortOption.value}
                        value={sortOption.value}
                      >
                        {sortOption.label}
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          </Grid>

          <Grid item md={9}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {products.length === 0 ? 'No' : countProducts} Results
                {query !== 'all' && query !== '' && ':' + query}
                {category !== 'all' && ':' + category}
                {brand !== 'all' && ':' + brand}
                {price !== 'all' && ':Price' + price}
                {rating !== 'all' && ': Rating ' + rating + ' & up'}
                {(query !== 'all' && query !== '') ||
                category !== 'all' ||
                brand !== 'all' ||
                rating !== 'all' ||
                price !== 'all' ? (
                  <Button onClick={() => router.push('/search')}>
                    <CancelIcon />
                  </Button>
                ) : null}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {/* <Grid item maxWidth={6}> */}
              {products.map((product) => (
                <Grid
                  item
                  md={4}
                  key={product.name}
                  sx={{ marginBottom: '20px', marginTop: '20px' }}
                >
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
                    <CardActions
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <Typography>${product.price}</Typography>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => addToCartHandler(product)}
                        sx={{ marginLeft: 'auto' }}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Pagination
              defaultPage={parseInt(query.page || '1')}
              count={pages}
              onChange={pageHandler}
              sx={{ marginTop: '20px' }}
            ></Pagination>
          </Grid>
        </Grid>
      </FormControl>
    </Layout>
  );
}
export async function getServerSideProps({ query }) {
  await db.connect();

  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.searchQuery || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};

  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  // const ratingFilter =
  //   rating && rating !== 'all' ? { rating: { $gte: Number(rating) } } : {};

  // const ratingFilter =
  //   rating && rating !== 'all' ? { rating: { $gt: Number(rating) } } : {};
  // console.log('Rating:', rating);
  // console.log('Rating Filter:', ratingFilter);

  const ratingFilter =
    rating && rating !== 'all' ? { rating: Number(rating) } : {};

  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();
  console.log('Database Query:', productDocs);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
