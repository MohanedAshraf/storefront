import express from 'express';
import { currentUserOrder } from '../controllers/order';

const router = express.Router();

router.get('/', currentUserOrder);

export default router;
