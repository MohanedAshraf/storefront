import express from 'express';
import user from './user';

const router = express.Router();

router.use('/users', user);

router.get('/', (_req, res) => {
  res.send({ status: 'API is up' });
});

export default router;
