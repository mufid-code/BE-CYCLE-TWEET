import { Request, Response } from 'express';

import Joi from 'joi';
import { userSchema } from '../utils/user.schema';
import { LoginUser, registerUser } from '../services/auth.service';
import { findUserByEmail, generateTokens } from '../services/user.service';
import { loginSchema, registerSchema } from '../utils/auth.schema';
import { comparePassword } from '../utils/encryption';
import jwt from 'jsonwebtoken';
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

export const LoginController = async(req: Request, res: Response) =>{
  try {
    const value = await loginSchema.validateAsync(req.body);
    const user = await LoginUser(value);
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isValidPassword = await comparePassword(
      value.password, user.password
    );
    if (!isValidPassword) return res.status(400).json({ error: 'Invalid email or password' });
    const tokens = await generateTokens(user.id);
    // const token = jwt.sign({ id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
    res.json({ tokens });
  } catch (error) {
    res.json(error);
  }
}