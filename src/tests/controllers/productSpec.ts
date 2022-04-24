import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Product } from '../../models/product';

const request = supertest(app);

describe('Testing Endpoint: /api/products', () => {
  const user: User = {
    username: 'Ahmedz',
    firstname: 'Ahmed',
    lastname: 'Ashraf',
    password: 'pass123',
    role: 'admin',
  };
  let token: string;

  const product: Product = {
    name: 'Ps10',
    price: 6000,
  };
  let productId: string;

  beforeAll(async () => {
    await request
      .post('/api/users')
      .send(user)
      .expect(200)
      .then((res) => {
        token = res.body;
      });
  });

  it('Testing the create endpoint with an token', async () => {
    await request
      .post('/api/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toEqual('Ps10');
        productId = res.body.id;
      });
  });

  it('Testing the index endpoint', async () => {
    await request
      .get('/api/products')
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Ps10');
      });
  });

  it('Testing the show endpoint with product ID', async () => {
    await request
      .get(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.text).toContain('Ps10');
      });
  });
});
