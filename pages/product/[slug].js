import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import data from '/Users/liliangarcia/Desktop/Projects/ecommerce/ecommerce-app/utils/data.js';
import Layout from '../../components/layout';

export default function ProductView() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((item) => item.slug === slug);
  if (!product) {
    return <div>Product not available</div>;
  }

  return (
    <Layout title={product.name}>
      <div>
        <NextLink href="/" passHref>
          <Link>Back to all products</Link>
        </NextLink>
      </div>
    </Layout>
  );
}
