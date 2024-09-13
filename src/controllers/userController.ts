import { Request, Response } from 'express';
import { getAllUsers, createUser } from '../services/userService';
import Joi from 'joi';
import { userSchema } from '../utils/userSchema';


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  // validation input menggunakan joi
  const { error, value } = userSchema.validate({ name, email });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await createUser(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
};
