import { useRouter } from 'next/router';
import React from 'react';
import data from '../utils/data.js';

export default function ProductView() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((item) => item.slug === slug);
  if (!product) {
    return <div>Product not available</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
}
