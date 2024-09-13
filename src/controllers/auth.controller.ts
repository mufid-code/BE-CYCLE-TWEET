import { Request, Response } from 'express';

import Joi from 'joi';
import { userSchema } from '../utils/user.schema';
import { registerUser } from '../services/auth.service';
import { findUserByEmail } from '../services/user.service';
import { registerSchema } from '../utils/auth.schema';

export const registerController = async (req: Request, res: Response) => {
 
  // validation input menggunakan joi
  const { error, value } = registerSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const existingUser = await findUserByEmail( req.body.email);
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const user = await registerUser(value);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
};
