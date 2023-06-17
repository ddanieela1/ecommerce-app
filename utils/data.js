// import bcrypt from 'bcryptjs';
import { bcrypt } from 'bcryptjs';

const data = {
  users: [
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
  ],
  products: [
    {
      name: 'Pen',
      slug: 'pen',
      category: 'Stationary',
      image: '/../assets/pen_set.jpg',
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
      category: 'Stationary',
      image: '/../assets/pen.webp',
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
      category: 'Stationary',
      image: '/../assets/pen.webp',
      price: '19.99',
      brand: 'Sanrio',
      rating: '5',
      numReviews: '5',
      inStock: '20',
      description: 'Cute sky blue pen',
    },
  ],
};

// export default data;
export default { data };
