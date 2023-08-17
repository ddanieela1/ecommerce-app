import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';

import { Store } from '../utils/Store';
import CheckoutWizard from '../components/CheckoutWizard';
import {
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Button, FormControl } from '@mui/base';
import { useSnackbar } from 'notistack';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     router.push('/shipping');
  //   } else {
  //     setPaymentMethod(Cookies.get('paymentMethod'));
  //   }
  // }, []);
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is missing', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form onSubmit={submitHandler}>
        <Typography>Payment Method</Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>

          <ListItem>
            <Button
              fullwidth="true"
              type="submit"
              variant="contained"
              color="primary"
            >
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullwidth="true"
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                router.push('/shipping');
              }}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
