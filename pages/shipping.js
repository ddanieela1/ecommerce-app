import { Store } from '@/utils/Store';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function Shipping() {
  const { userInfo } = state;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!userInfo) {
    router.push('/login?redirect=/shipping');
  }
  return <Typography>Shipping</Typography>;
}
