import { User, UserModel } from '../models/user';
import { Request, Response } from 'express';
import { Verify, Sign, isAdmin } from '../utils/jwt';

const User = new UserModel();

export const index = async (req: Request, res: Response) => {
  try {
    const userId = Verify(req);

    if (!(await isAdmin(userId))) {
      return res.status(400).send('Error, should be an admin. ');
    }

    const users = await User.index();
    res.send(users);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get users')) {
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
    Verify(req, id);
    const user = await User.show(id);
    res.send(user);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the user')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { username, firstname, lastname, password, role } = req.body;
    if (!username || !firstname || !lastname || !password || !role) {
      return res
        .status(400)
        .send(
          'Error, missing or malformed parameters. (username , firstname , lastname ,password) are  required'
        );
    }
    Verify(req);
    const user: User = { username, firstname, lastname, password, role };
    const createduser = await User.create(user);
    res.send(createduser);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to add the user')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send(
        'Error, missing or malformed parameters. (username, password) are required'
      );
  }
  try {
    const user = await User.authenticate(username, password);

    if (user === null) {
      res.status(401);
      res.json('Incorrect user information');
    } else {
      const token = Sign(Number(user.id), user.role);
      res.json(token);
    }
  } catch (error) {
    const e = error as Error;
    res.status(401).send(e.message);
  }
};
