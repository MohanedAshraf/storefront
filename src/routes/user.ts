import express from 'express';
import { index, show, create, authenticate } from '../controllers/user';

const router = express.Router();
router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.post('/auth', authenticate);

export default router;
