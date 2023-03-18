import Head from 'next/head';
import Image from 'next/image';
// import styles from '@/styles/Home.module.css';
import Layout from '../components/Layout.js';

// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <div>
        <h1 color="white">Products</h1>
        <ul>
          <li>
            <p>test</p>
            <p>Product</p>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
