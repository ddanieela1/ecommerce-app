// import * as React from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  // Grid,
  Button,
  TextField,
  // Box,
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
import NextLink from 'next/link';
import { Store } from '../utils/Store';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { SettingsSystemDaydreamOutlined } from '@mui/icons-material';

import Cookies from 'js-cookie';
// import { USER_SIGNIN } from '../utils/Store.js';
import Layout from '@/components/Layout';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function SignIn() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;

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
      );

      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || 'An error occurred',

        { variant: error }
      );

      console.log(email, password);
      console.log(error);
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

          {/* <FormControl
            sx={{
              m: 1,
              width: '15ch',
            }}
            variant="outlined"
          ></FormControl>

          <FormControl
            sx={{
              m: 1,
              width: '25ch',
            }}
          > */}

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                id="email"
                label="Email"
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
                  inputprops={{ type: 'password' }}
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
                  label="Password"
                />
              )}
            />
          </FormControl>
          {/* --------------passs------------ */}

          {/* <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="Remember me"
          labelPlacement="end"
        /> */}
          <div>
            <Button
              // onClick={signinHandler}
              // onClick={handleSubmit}
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
