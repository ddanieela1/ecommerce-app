import React, { useContext, useEffect, useState } from 'react';
import { Typography, Box, TextField, Paper, Grid, Button } from '@mui/material';
import Cookie from 'js-cookie';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export default function Register() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const userInfo = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, [userInfo]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password does not match. Try again');
      return;
    }

    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });

      dispatch({ type: USER_REGISTER, payload: data });
      Cookies.set('userInfo', data);
      // router.push(redirect || '/');

      console.log(data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Invalid email or password. Please try again.');
      } else {
        alert(err.message);
      }
    }
  };

  const paperStyle = {
    padding: 2,
    width: 400,
    margin: '0 auto',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper sx={paperStyle}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ width: '100%' }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  label=" Name"
                  id="name"
                  variant="filled"
                  fullWidth
                  inputprops={{ type: 'first-name' }}
                  onChange={() => setName(e.target.value)}
                  {...field}
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={6} sx={{ width: '100%' }}>
            <TextField
              variant="filled"
              label="Last Name"
              inputprops={{ type: 'last-name' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid> */}

          <Grid item xs={6}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  align="center"
                  variant="filled"
                  label="Password"
                  type="password"
                  id="password"
                  inputprops={{ type: 'password' }}
                  onChange={(e) => setPassword(e.target.value)}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  align="center"
                  variant="filled"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  inputprops={{ type: 'confirmPassword' }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
                  align="center"
                  variant="filled"
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  inputprops={{ type: 'email' }}
                  onChange={(e) => setEmail(e.target.value)}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Register
            </Button>
            <Typography>Already have an account? &nbsp;</Typography>
            {/* <NextLink
              href={`/login?redirect=${redirect || '/'}`}
              passHref
            ></NextLink> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
