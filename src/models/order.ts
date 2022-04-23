import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type Orders_products = {
  id?: number;
  product_id: number;
  quantity: number;
  order_id: number;
};

export class OrderModel {
  async currentUserOrder(uid: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [uid]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `There was an error with finding orders for user ID=${uid}. Error: ${err}`
      );
    }
  }

  async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders ORDER BY id ASC;';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`There was an error finding orders: ${err}`);
    }
  }

  async show(id: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `There was an error with order with ID=${id}. Erro: ${err}`
      );
    }
  }

  async create(id: number | undefined, status: string): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ( (SELECT users.id FROM users WHERE id = $1) , $2) RETURNING *;';
      const conn = await client.connect();
      const result = await conn.query(sql, [id, status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `There was an error with creating order for User ID = ${id}. Error: ${err}`
      );
    }
  }
}
