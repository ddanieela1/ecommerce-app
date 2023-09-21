import React, {
  title,
  children,
  useEffect,
  useState,
  useContext,
  createContext,
  useMediaQuery,
} from 'react';

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
  // styled,
  Hidden,
} from '@mui/material';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { teal } from '@mui/material/colors';
import SearchIcon from '@material-ui/icons/Search';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { USER_LOGOUT, USER_SIGNIN } from '../utils/Store';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ThemeProvider, createTheme, Card, Paper } from '@material-ui/core';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { purple, red, deepOrange } from '@mui/material/colors';

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
  color: '#f5f5f5',
  textTransform: 'initial',
};
const pageBody = {
  body: {
    color: 'orange',
    backgroundColor: '#f5f5f5',
    backgroundImage: 'url("/images/opacity2-background2.webp")', // Replace with your image path
    backgroundRepeat: 'repeat',
    // backgroundSize: 'cover',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#004d40',
    color: '#f5f5f5',
    minHeight: '10vh',
  },
};

// const useStyles = makeStyles((theme) => ({
//   borderedText: {
//     WebkitTextFillColor: 'transparent', // For Safari/Chrome
//     WebkitTextStroke: '2px black', // For Safari/Chrome
//     textFillColor: 'transparent', // For Firefox/Edge
//     MozTextStroke: '2px black', // For Firefox
//     fontSize: '24px', // Adjust the font size as needed
//     fontWeight: 'bold', // You can adjust font weight
//   },
// }));

const NavBarButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 90,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 90,
  },
}));

const NavBarButtonHover = styled(NavBarButton)({
  '&:hover': {
    '& .MuiImageMarked-root': {
      width: '100%', // Expand the underline on hover
    },
  },
});

const NavBarMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 0,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: 20,
  left: '50%',
  transition: theme.transitions.create('opacity'),
  // animation: 'underline 0.3s forwards',
  transform: 'translateX(-50%)', // Center the underline
  transition: 'width 0.3s ease',
}));

export default function Layout({ children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const primary = deepOrange[500];

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
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar
          position="static"
          className="nav-link"
          sx={{
            backgroundColor: '#004d40',

            '& a': {
              color: '#f5f5f5',

              //   marginLeft: 10,
              // width: '100%',
            },
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              // borderBottom: '1px solid #f5f5f5',
            }}
          >
            <Box
              sx={
                {
                  // display: 'flex',
                  // alignItems: 'center',
                }
              }
            >
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
                  width: '100%', // Set the width to 100% to cover the Drawer
                  height: '10%',
                  backgroundImage: 'url("/images/background2.webp")', // Replace with your image path
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

            <NextLink style={{ textDecoration: 'none' }} href="/" passHref>
              <Link style={{ textDecoration: 'none' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  Bingo
                </Typography>
              </Link>
            </NextLink>

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
                  Popular
                </Link>
              </NextLink>

              <NavBarMarked className="MuiImageMarked-root" />
            </NavBarButtonHover>

            <Box
              sx={
                {
                  // display: 'flex',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  // gap: '1rem',
                }
              }
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <form
                  onSubmit={submitHandler}
                  // style={{ display: 'flex', alignItems: 'center' }}
                >
                  <InputBase
                    name="query"
                    placeholder="Search Products"
                    onChange={queryHandler}
                    sx={{
                      padding: '2px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      width: '60%',
                    }}
                  />
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </form>
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
                            sx={{ color: '#ff5722' }}
                            color="primary"
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
                    <NextLink
                      style={{ textDecoration: 'none' }}
                      href="/signin"
                      passHref
                    >
                      Sign In
                    </NextLink>
                  )}
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <div theme={theme.body}>
          <Container theme={theme.body} sx={{ minHeight: '80vh' }}>
            {children}
          </Container>
        </div>
        <footer style={pageBody.footer}>
          <Typography sx={{ textAlign: 'center' }}>
            All rights reserved. Bingo@2023
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
