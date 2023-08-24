import React, { title, children, useEffect, useState, useContext } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import IconButton from '@material-ui/core/IconButton';
import {
  CssBaseline,
  Divider,
  InputBase,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

import SearchIcon from '@material-ui/icons/Search';

import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { USER_LOGOUT, USER_SIGNIN } from '../utils/Store';
import MenuIcon from '@material-ui/icons/Menu';

import { ThemeProvider, createTheme } from '@material-ui/core';
import { Form } from 'react-hook-form';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
    h2: {
      fontSize: '1.4rem',
      fontWeight: 404,
      margin: '1rem 0',
    },
  },
});

const navBarButton = {
  color: '#ffffff',
  textTransform: 'initial',
};
export default function Layout({ children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);

  const signinClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const signinMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch({ type: USER_LOGOUT });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/signin');
  };

  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  const sideBarOpenHandler = () => {
    setSideBarVisible(true);
  };

  const sideBarCloseHandler = () => {
    setSideBarVisible(false);
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);

      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), {
        variant: 'error',
      });
    }
  };

  const [query, setQuery] = useState('');
  const queryHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Head>
        <title>{title ? `${title}-Bingo` : 'Bingo'}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar
          position="static"
          sx={{
            backgroundColor: 'green',
            '& a': {
              color: '#ffffff',
              marginLeft: 10,
            },
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sideBarOpenHandler}
              >
                <MenuIcon />
              </IconButton>

              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    Bingo
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sideBarVisible}
              onClose={sideBarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space_between"
                  >
                    <Typography>Shop by category</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sideBarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sideBarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            <div>
              <form onSubmit={submitHandler}>
                <InputBase
                  name="query"
                  placeholder="Search Products"
                  onChange={queryHandler}
                />

                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </form>
            </div>
            <NextLink href="/featured" passHref>
              <Link>
                <Typography>featured</Typography>
              </Link>
            </NextLink>

            <NextLink href="/best-sellers" passHref>
              <Link>
                <Typography>Best Sellers</Typography>
              </Link>
            </NextLink>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Typography>
                </Link>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
                    // sx={{ color: 'white' }}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={signinClickHandler}
                    style={navBarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={signinMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => signinMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        signinMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order History
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/signin" passHref>
                  Sign In
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ minHeight: '80vh' }}>{children}</Container>

        <footer sx={{ marginTop: 10, textAlign: 'center' }}>
          <Typography sx={{ textAlign: 'center' }}>
            All rights reserved. Bingo@2023
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
