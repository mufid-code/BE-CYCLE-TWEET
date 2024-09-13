import { Request, Response } from 'express';

import Joi from 'joi';
import { createUser, getAllUsers } from '../services/user.service';
import { userSchema } from '../utils/user.schema';


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  

  // validation input menggunakan joi
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await createUser(value);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
};
