import React, { useEffect } from 'react';

import {
  Button,
  TextField,
  List,
  ListItem,
  Typography,
  Link,
} from '@mui/material';
import NextLink from 'next/link';
import { Store } from '../utils/Store';

import { useRouter } from 'next/router';
import { useState, useContext } from 'react';

import Cookies from 'js-cookie';
// import { USER_SIGNIN } from '../utils/Store.js';
import Layout from '@/components/layout';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/checkoutWizard';

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (!userInfo) {
      router.push('/signin?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, []);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set('saveShippingAddress', {
      fullName,
      address,
      city,
      postalCode,
      country,
    });
    router.push(redirect || '/payment');
  };

  const formStyle = {
    backgroundColor: 'white',

    maxWidth: 800,
    width: '100%',
  };
  const bttnStyle = {
    margin: '10px 0',
  };

  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />
      <form style={formStyle} onSubmit={handleSubmit(submitHandler)}>
        <div>
          <Typography component="h1" variant="h3">
            Shipping
          </Typography>
        </div>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)}
                  helpertext={
                    errors.fullName
                      ? errors.fullName.type === 'pattern'
                        ? 'Full Name is not valid'
                        : 'Full Name required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="address"
                  label="Address"
                  inputProps={{ type: 'address' }}
                  error={Boolean(errors.address)}
                  helpertext={
                    errors.address
                      ? errors.address.type === 'pattern'
                        ? 'Address is not valid'
                        : 'Address required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="city"
                  label="City"
                  inputProps={{ type: 'city' }}
                  error={Boolean(errors.city)}
                  helpertext={
                    errors.city
                      ? errors.city.type === 'pattern'
                        ? 'City is not valid'
                        : 'City required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: 'postalCode' }}
                  error={Boolean(errors.postalCode)}
                  helpertext={
                    errors.postalCode
                      ? errors.postalCode.type === 'pattern'
                        ? 'Postal Code is not valid'
                        : 'Postal Code required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  id="country"
                  label="Country"
                  inputProps={{ type: 'country' }}
                  error={Boolean(errors.country)}
                  helpertext={
                    errors.country
                      ? errors.country.type === 'pattern'
                        ? 'Country is not valid'
                        : 'Country required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <div>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              style={bttnStyle}
              type="submit"
            >
              Continue
            </Button>
          </div>
        </List>
      </form>
    </Layout>
  );
}
