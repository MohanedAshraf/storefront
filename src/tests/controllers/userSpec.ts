import supertest from 'supertest';
import app from '../../server';
import { JwtPayload, verify } from 'jsonwebtoken';
import { User } from '../../models/user';

const request = supertest(app);

describe('Testing Endpoint: /api/users', () => {
  const user: User = {
    username: 'Mohanedz',
    firstname: 'Mohaned',
    lastname: 'Ashraf',
    password: 'pass123',
    role: 'admin',
  };
  let token: string;
  let userId: string;

  it('Testing the create endpoint', async () => {
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
        userId = decodedJWT.user.userId;
      });
  });

  it('Testing the index endpoint with token', async () => {
    await request
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the show endpoint with token and ID', async () => {
    await request
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the authorization endpoint with valid user', async () => {
    await request.post('/api/users/auth').send(user).expect(200);
  });

  it('Testing the authorization endpoint with invalid user', async () => {
    await request
      .post('/api/users/auth')
      .send({ username: 'snsns', password: 'sskns' })
      .expect(401)
      .then((res) => {
        expect(res.text).toContain('Incorrect user information');
      });
  });
});
