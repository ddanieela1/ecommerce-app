// import bcrypt from 'bcryptjs';
import bcrypt from 'bcryptjs';

// const data = {
const users = [
  {
    name: 'John Doe',
    email: 'test@admin.com',
    password: bcrypt.hashSync('password1'),
    isAdmin: true,
  },
  {
    name: 'Emily Doe',
    email: 'test@test.com',
    password: bcrypt.hashSync('password2'),
    isAdmin: false,
  },
  {
    name: 'Tomato Joe',
    email: 'tomatoj@mail.com',
    password: bcrypt.hashSync('password3'),
    isAdmin: false,
  },
  {
    name: 'Loca Poka',
    email: 'lokap@mail.com',
    password: bcrypt.hashSync('password4'),
    isAdmin: false,
  },
];
const products = [
  {
    name: 'Pen',
    slug: 'pen',
    category: 'Pens',
    image: '/images/pen_set.jpg',
    price: '19.99',
    brand: 'Sanrio',
    rating: '5',
    numReviews: '5',
    inStock: '20',
    description: 'Cute sky blue pen',
  },
  {
    name: 'Another Pen',
    slug: 'another-pen',
    category: 'Pens',
    image: '/images/pen.webp',
    price: '19.99',
    brand: 'Sanrio',
    rating: '5',
    numReviews: '5',
    inStock: '20',
    description: 'Cute sky blue pen',
  },
  {
    name: 'Cute Pen',
    slug: 'cute-pen',
    category: 'Pens',
    image: '/images/pen.webp',
    price: '19.99',
    brand: 'Sanrio',
    rating: '5',
    numReviews: '5',
    inStock: '20',
    description: 'Cute sky blue pen',
  },
  {
    name: 'Sticker',
    slug: 'sticker',
    category: 'Sticker',
    image: '/images/stickers.webp',
    price: '19.99',
    brand: 'Paper',
    rating: '5',
    numReviews: '5',
    inStock: '20',
    description: 'Variety stickers',
    isFeatured: true,
    banner: '/images/stickers.webp',
  },
  {
    name: 'Custom Paper',
    slug: 'paper',
    category: 'Paper',
    image: '/images/custom_paper.jpeg',
    price: '19.99',
    brand: 'Paper',
    rating: '5',
    numReviews: '5',
    inStock: '20',
    description: 'Variety paper',
    isFeatured: true,
    banner: '/images/custom_paper.jpeg',
  },
  {
    name: 'Stationery',
    slug: 'Stationery',
    category: 'Paper',
    image: '/images/sationery.png',
    price: '19.99',
    brand: 'Saty',
    rating: '5',
    numReviews: '5',
    inStock: '20',
    description: 'Office supplies',
    isFeatured: true,
    banner: '/images/sationery.png',
  },
];
// };

// export default data;
export { users, products };
