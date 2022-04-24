import supertest from 'supertest';
import app from '../../server';
import { Order } from '../../models/order';
import { JwtPayload, verify } from 'jsonwebtoken';
import { User } from '../../models/user';

const request = supertest(app);
describe('Testing Endpoint: /api/orders', () => {
  const order: Order = { user_id: 0, status: 'active' };
  const user: User = {
    username: 'mezo',
    firstname: 'Mazen',
    lastname: 'Ashraf',
    password: 'pass123',
    role: 'admin',
  };
  let userId: number;
  let token: string;
  beforeAll(async () => {
    await request
      .post('/api/users')
      .send(user)
      .expect(200)
      .then((res) => {
        token = res.body;
        const decodedJWT = verify(
          token as string,
          process.env.TOKEN_SECRET as string
        ) as JwtPayload;
        userId = decodedJWT.user.id;
        order.user_id = userId as unknown as number;
      });
    await request
      .post('/api/products')
      .send({
        name: 'Ps11',
        price: '3000',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the currentUserOrder endpoint with user token', async () => {
    await request
      .get('/api/users/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
