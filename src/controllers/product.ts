import { Product, ProductModel } from '../models/product';
import express, { Request, Response } from 'express';
import { Verify, isAdmin } from '../utils/jwt';

const Product = new ProductModel();

export const index = async (req: Request, res: Response) => {
  try {
    const product = await Product.index();
    res.send(product);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the products')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res
        .status(400)
        .send('Error, missing or malformed parameters. id required');
    }
    const product = await Product.show(id);
    res.send(product);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the product')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const userId = Verify(req);

    if (!(await isAdmin(userId))) {
      return res.status(400).send('Error, should be an admin. ');
    }

    const { name, price } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .send('Error, missing or malformed parameters. name, price');
    }

    const product: Product = { name, price };
    const createdProduct = await Product.create(product);
    res.send(createdProduct);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to add the product')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};
