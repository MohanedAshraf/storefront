import { Order, OrderModel } from '../models/order';
import { Request, Response } from 'express';
import { Verify } from '../utils/jwt';

const Order = new OrderModel();

export const currentUserOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Order.currentUserOrder(Verify(req));
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};
