import express from 'express';
import user from './user';
import product from './product';

const router = express.Router();

router.use('/users', user);
router.use('/products', product);

router.get('/', (_req, res) => {
  res.send({ status: 'API is up' });
});

export default router;
