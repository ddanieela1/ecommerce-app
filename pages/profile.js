import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import { getError } from '@/utils/error';

import {
  Typography,
  TextField,
  Paper,
  Grid,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function Profile() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      router.push('/signin');
    }
    setValue('name', userInfo.name);
    setValue('email', userInfo.email);
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    console.log('button clicked');

    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match. Please try again', {
        variant: 'error',
      });

      return;
    }

    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );

      dispatch({ type: USER_SIGNIN, payload: data });
      Cookies.set('userInfo', data);

      console.log(userInfo);
      enqueueSnackbar('Profile updated', {
        variant: 'success',
      });
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
    <Layout title="Profile">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>

              <NextLink href="/order-history" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>

        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" varitant="h1">
                  Profile
                </Typography>
              </ListItem>

              <ListItem>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <List>
                    <ListItem>
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
                            variant="outlined"
                            label=" Name"
                            id="name"
                            fullWidth
                            inputprops={{ type: 'name' }}
                            error={Boolean(errors.name)}
                            helpertext={
                              errors.name
                                ? errors.name.type === 'minLength'
                                  ? 'name is not valid'
                                  : 'name required'
                                : ''
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
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
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>

                    <ListItem>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === '' ||
                            value.length > 5 ||
                            'Password length is more than 5',
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
                                ? 'Password length more than 5'
                                : ''
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>

                    <ListItem>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === '' ||
                            value.length > 5 ||
                            'Password length is more than 5',
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
                                ? 'Confirm Password length more than 5'
                                : ''
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>

                    <ListItem>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                      >
                        Update
                      </Button>
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(Profile), { ssr: false });
