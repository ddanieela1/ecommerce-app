import { Router, useRouter } from 'next/router';
import React from 'react';

export default function Shipping() {
  const router = useRouter();
  router.push('/signin');
  return <div>shipping</div>;
}
