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
}
