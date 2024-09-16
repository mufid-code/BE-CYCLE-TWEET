import { Request, Response } from 'express';

import { loginSchema, registerSchema } from '../utils/auth.schema';
import { comparePassword } from '../utils/encryption';
import authService from '../services/auth.service';
import userService from '../services/user.service';

class AuthController {
  async register(req: Request, res: Response)  {
    try {
      // validation input menggunakan joi
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const existingUser = await userService.findUserByEmail( req.body.email);
      if (existingUser) return res.status(400).json({ error: 'Email already exists' });
  
      const user = await authService.registerUser(value);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  };
  
  async Login(req: Request, res: Response) {
    try {
      const value = await loginSchema.validateAsync(req.body);
      
      const user = await authService.LoginUser(value);
      if (!user) return res.status(400).json({ error: 'Invalid email or password' });
  
      const isValidPassword = await comparePassword(
        value.password, user.password
      );
      if (!isValidPassword) return res.status(400).json({ error: 'Invalid email or password' });
      const tokens = await userService.generateTokens(user.id);
      // const token = jwt.sign({ id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
      res.json({ tokens });
    } catch (error) {
      res.json(error);
    }
  }
}
export default new AuthController();