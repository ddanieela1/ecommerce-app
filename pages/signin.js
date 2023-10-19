import React, { useEffect } from 'react';
import axios from 'axios';
import NextLink from 'next/link';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { useRouter } from 'next/router.js';

import {
  Card,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputLabel,
  Typography,
  Paper,
  Link,
} from '@mui/material';

import { USER_SIGNIN } from '../utils/Store.js';
import { Store } from '../utils/Store';
import { getError } from '@/utils/error';
import Layout from '../components/Layout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';
import { SettingsSystemDaydreamOutlined } from '@mui/icons-material';

export default function Signin() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { redirect } = router.query;
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    // check user & pass match
    try {
      // const token = Cookies.get('userInfo')?.token;
      const { data } = await axios.post(
        'api/users/signin',

        {
          email,
          password,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      dispatch({ type: 'USER_SIGNIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: err });

      console.log(email, password);
      console.log(err);
    }
  };

  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 300,
    margin: '80px auto',
  };

  const bttnStyle = {
    margin: '10px 0',
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Paper style={paperStyle} elevation={10} align="center">
          <LockPersonTwoToneIcon />
          <div>
            <Typography component="h1" variant="h3">
              Sign in
            </Typography>
          </div>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
            render={({ field }) => (
              <OutlinedInput
                placeholder="Enter email"
                id="email"
                name="email"
                sx={{ margin: '9px' }}
                inputProps={{ type: 'email' }}
                error={Boolean(errors.email)}
                helpertext={
                  errors.email
                    ? errors.email.type === 'pattern'
                      ? 'Email is not valid'
                      : 'Email required'
                    : ''
                }
                {...field}
              />
            )}
          />

          <FormControl
            sx={{
              m: 1,
              width: '25ch',
            }}
            variant="outlined"
          >
            {/* --------------email------------ */}

            {/* --------------passs------------ */}
            {/* <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel> */}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <OutlinedInput
                  placeholder="Enter password"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helpertext={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length meets requirements'
                        : 'Password required'
                      : ''
                  }
                  {...field}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        onChange={(e) => setPassword(e.target.value)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  // label="Password"
                />
              )}
            />
          </FormControl>
          {/* --------------passs------------ */}

          <div>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              style={bttnStyle}
              type="submit"
            >
              Sign In
            </Button>
          </div>

          <Typography>
            Need an an account? &nbsp;
            <NextLink
              href={`/register?redirect=${redirect || '/'}`}
              passHref
              underline="none"
            >
              <Link>Sign Up</Link>
            </NextLink>
          </Typography>
        </Paper>
      </form>
    </Layout>
  );
}
