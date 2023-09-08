import Layout from '../components/Layout';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
// import { ProductItem } from '../components/ProductItem';
import { MenuItem } from '@mui/base';
import {
  Grid,
  Typography,
  // List,
  Select,
  Button,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  FormControl,
} from '@mui/material';
// import { ListItem } from '@mui/material';
import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import NextLink from 'next/link';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
// import ListItemButton from '@mui/material/ListItemButton';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const PAGE_SIZE = 2;

const prices = [
  {
    name: '$1 to $10',
    value: '1-10',
  },
  {
    name: '$10 to $20',
    value: '10-20',
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
    if (selectedRating) query.rating = selectedRating;
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

  const sortHandler = (e) => {
    if (e.target && e.target.value) {
      filterSearch({ sort: e.target.value });
    }
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
          <Grid item md={3}>
            <List style={{ display: 'block' }}>
              <Box fullWidth>
                <ListItemButton onClick={handleClick}>
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
                        <ListItemButton
                          sx={{ pl: 4 }}
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
                        <ListItemButton
                          key={brand}
                          sx={{ pl: 4 }}
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
                      <ListItemButton
                        key={index}
                        sx={{ pl: 4 }}
                        onClick={() => priceHandler(priceOption.value)}
                      >
                        {priceOption.name}
                      </ListItemButton>
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

              <Box fullWidth>
                <ListItemButton onClick={handleClick}>
                  <ListItemText primary="Sort By" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {[
                      'Featured',
                      'Price: High to Low',
                      'Price: High to Low',
                      'Costumer Reviews',
                      'Newest Arrivals',
                    ].map((sort) => (
                      <ListItemButton
                        key={sort}
                        sx={{ pl: 4, display: 'block' }}
                        onChange={() => sortHandler(sort)}
                      >
                        <ListItemText name={sort} value={sort}>
                          {sort}
                        </ListItemText>

                        {/* <ListItemText name={sort} value="Lowest">
                        Price: Low to High
                      </ListItemText>

                      <ListItemText name={sort} value="Highest">
                        Price: High to Low
                      </ListItemText>

                      <ListItemText name={sort} value="toprated">
                        Costumer Reviews
                      </ListItemText>

                      <ListItemText name={sort} value="Newest">
                        Newest Arrivals
                      </ListItemText> */}
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            </Grid>

            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item md={4} key={product.name}>
                  {/* <ProductItem
                  product={product}
                  addToCartHandler={addToCartHandler}
                /> */}
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
            <Pagination
              defaultPage={parseInt(query.page || '1')}
              count={pages}
              onChange={pageHandler}
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
  const ratingFilter =
    rating && rating !== 'all' ? { rating: { $gte: Number(rating) } } : {};

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
