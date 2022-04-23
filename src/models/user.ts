import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string;
};

const { PEPPER, SALT_ROUNDS } = process.env;

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the users with the following error: ${error}`
      );
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to get a user with the following error: ${error}`
      );
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(user.password + PEPPER, Number(SALT_ROUNDS));
      const result = await connection.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        hash,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add the user with the following error: ${error}`
      );
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const result = await conn.query(sql, [username]);
      const user = result.rows[0];

      if (user) {
        if (bcrypt.compareSync(password + PEPPER, user.password)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to sign in  with the following error: ${error}`);
    }
  }
}
