import React, { children, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Store } from '../utils/Store';
import {
  navBarButton,
  pageBody,
  NavBarButton,
  NavBarButtonHover,
  NavBarMarked,
  appBarStyle,
} from '../utils/styles';
import { USER_LOGOUT, USER_SIGNIN } from '../utils/Store';

import Head from 'next/head';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@material-ui/icons/Search';
import ButtonBase from '@mui/material/ButtonBase';
import { EnqueueSnackbar } from 'notistack';

import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  List,
  Box,
  Badge,
  Drawer,
  CssBaseline,
  Divider,
  InputBase,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  // styled,
  Hidden,
  Grid,
  Button,
} from '@mui/material';

import {
  ThemeProvider,
  createTheme,
  Card,
  Paper,
  MenuList,
} from '@material-ui/core';

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

export default function Layout({ title, children }) {
  const ITEM_HEIGHT = 85;
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const primaryOrange = deepOrange[500];

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
    <div style={pageBody.body}>
      <Head>
        <title>{title ? `${title}-Bingo` : 'Bingo'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Concert+One&family=Luckiest+Guy&family=Major+Mono+Display&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="static" className="nav-link" sx={appBarStyle}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box>
                <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={sideBarOpenHandler}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="left"
                open={sideBarVisible}
                onClose={sideBarCloseHandler}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '10%',
                    backgroundImage: 'url("/images/background2.webp")',
                    backgroundRepeat: 'no-repeat',

                    opacity: 0.7,
                  }}
                >
                  <List
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <ListItem>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space_between"
                      >
                        <Typography
                          sx={{
                            color: 'black',
                            backgroundColor: 'white',
                          }}
                        >
                          Shop by category
                        </Typography>
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
                        sx={{ textDecoration: 'none' }}
                      >
                        <ListItem
                          component="a"
                          onClick={sideBarCloseHandler}
                          sx={{
                            color: 'black',
                          }}
                        >
                          <ListItemText primary={category}></ListItemText>
                        </ListItem>
                      </NextLink>
                    ))}
                  </List>
                </Box>
              </Drawer>

              <NextLink
                style={{ textDecoration: 'none', marginLeft: '30px' }}
                href="/"
                passHref
              >
                <Link style={{ textDecoration: 'none' }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '2.5rem',
                      fontFamily: 'Concert One',
                    }}
                  >
                    Bingo
                  </Typography>
                </Link>
              </NextLink>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <NavBarButtonHover
                focusRipple
                style={{
                  width: 100,
                }}
              >
                <NextLink
                  href="/featured"
                  passHref
                  style={{ textDecoration: 'none' }}
                >
                  <Link
                    style={{ textDecoration: 'none' }}
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 2,
                      pt: 1,
                      pb: (theme) => `calc(${theme.spacing(1)} + 3px)`,
                    }}
                  >
                    Featured
                  </Link>
                </NextLink>

                <NavBarMarked className="MuiImageMarked-root" />
              </NavBarButtonHover>

              <NavBarButtonHover
                focusRipple
                style={{
                  width: 100,
                }}
              >
                <NextLink
                  href="/best-sellers"
                  passHref
                  style={{ textDecoration: 'none' }}
                >
                  <Link
                    style={{ textDecoration: 'none' }}
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 2,
                      pt: 1,
                      pb: (theme) => `calc(${theme.spacing(1)} + 3px)`,
                    }}
                  >
                    Popular
                  </Link>
                </NextLink>

                <NavBarMarked className="MuiImageMarked-root" />
              </NavBarButtonHover>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center', // Align items vertically
              }}
            >
              <form onSubmit={submitHandler}>
                <InputBase
                  name="query"
                  placeholder="Search..."
                  onChange={queryHandler}
                  sx={{
                    padding: '2px',
                    border: '1px solid #ccc',
                    borderRadius: '20px',
                    width: '80%',
                    color: '#004d40',
                    backgroundColor: '#e0f2f1',
                  }}
                />
                <IconButton
                  style={{ color: '#f5f5f5' }}
                  type="submit"
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </Box>
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
                        style={{
                          color: primaryOrange,
                        }}
                        color="warning"
                        badgeContent={cart.cartItems.length}
                      >
                        <ShoppingCartIcon sx={{ color: 'white' }} />
                      </Badge>
                    ) : (
                      <ShoppingCartIcon />
                    )}
                  </Typography>
                </Link>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
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
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '15ch',
                        padding: '5px',
                      },
                    }}
                  >
                    <MenuList>
                      <MenuItem
                        onClick={(e) => signinMenuCloseHandler(e, '/profile')}
                      >
                        Profile
                      </MenuItem>
                      {/* &nbsp; */}
                      <MenuItem
                        onClick={(e) =>
                          signinMenuCloseHandler(e, '/order-history')
                        }
                      >
                        Order History
                      </MenuItem>
                      {/* &nbsp; */}
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      {/* &nbsp; */}
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <NextLink
                  style={{ textDecoration: 'none' }}
                  href="/signin"
                  passHref
                >
                  Sign in
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <div theme={theme.body}>
          <Container
            theme={theme.body}
            sx={{
              minHeight: '80vh',
              backgroundColor: 'white',
              padding: '20px',
            }}
          >
            <Grid>{children}</Grid>
          </Container>
        </div>
        <footer style={pageBody.footer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography sx={{ textAlign: 'center', marginTop: '25px' }}>
              All rights reserved. Bingo@2023
            </Typography>
          </div>
        </footer>
      </ThemeProvider>
    </div>
  );
}
