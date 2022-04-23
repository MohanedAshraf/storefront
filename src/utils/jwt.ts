import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';
import client from '../database';

const secretToken = process.env.TOKEN_SECRET as string;

function Verify(req: Request, userId?: number): string {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(' ')[1];
  const decoded = verify(token as string, secretToken) as JwtPayload;
  if (authorizationHeader && userId && decoded.user.userId != userId) {
    throw new Error('User id does not match!');
  }
  return decoded.user.userId;
}

async function isAdmin(userId: string): Promise<boolean> {
  try {
    const connection = await client.connect();
    const sql = 'SELECT * FROM users WHERE id=($1)';
    const result = await connection.query(sql, [userId]);
    connection.release();

    if (result.rows[0].role != 'admin') return false;
    return true;
  } catch (error) {
    throw new Error(
      `Failed to get a user role with the following error: ${error}`
    );
  }
}

function Sign(userId: number, role: string) {
  return sign({ user: { userId, role } }, secretToken);
}

export { Verify, Sign, isAdmin };
