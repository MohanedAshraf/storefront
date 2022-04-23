import express from 'express';
import user from './user';
import product from './product';
import order from './order';

const router = express.Router();

router.use('/users/orders', order);
router.use('/users', user);
router.use('/products', product);

router.get('/', (_req, res) => {
  res.send({ status: 'API is up' });
});

export default router;
