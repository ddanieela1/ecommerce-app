import React, { useContext, useEffect } from 'react';
import { Typography, TextField, Paper, Grid, Button } from '@mui/material';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';

export default function Register() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { redirect } = router.query;
  // const userInfo = state;

  // useEffect(() => {
  //   if (userInfo) {
  //     router.push('/');
  //   }
  // }, [userInfo]);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    console.log('button clicked');
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match. Please try again');

      return;
    }

    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      console.log('submitted data:', name, email, password);
      console.log('response data:', data);

      dispatch({ type: USER_REGISTER, payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');

      console.log(userInfo);
    } catch (error) {
      enqueueSnackbar(getError(err), {
        variant: 'error',
      });
    }
    console.log('error');
    console.log('error.response');
    console.log(' error.response?.data?.message');
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
      <form onSubmit={handleSubmit(submitHandler)}>
        <Paper sx={paperStyle}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
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
                    error={Boolean(errors.name)}
                    helpertext={
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'name is not valid'
                          : 'name required'
                        : ''
                    }
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
                    helpertext={
                      errors.password
                        ? errors.password.type === 'minLength'
                          ? 'Password length meets requirements'
                          : 'Password required'
                        : ''
                    }
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
                    helpertext={
                      errors.password
                        ? errors.password.type === 'minLength'
                          ? 'Password length meets requirements'
                          : 'Password required'
                        : ''
                    }
                    {...field}
                  />
                )}
              />

              <TextField
                align="center"
                variant="filled"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                inputprops={{ type: 'confirmPassword' }}
                helpertext={
                  errors.password
                    ? errors.password.type === 'minLength'
                      ? 'Password length meets requirements'
                      : 'Password required'
                    : ''
                }
                {...field}
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
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Register
              </Button>
              <Typography>Already have an account? &nbsp;</Typography>
              <NextLink
                // href={'/'}
                href={`/login?redirect=${redirect || '/'}`}
                passHref
              >
                <h4>Sign in</h4>
              </NextLink>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}
