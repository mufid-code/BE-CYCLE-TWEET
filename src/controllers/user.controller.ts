import { Request, Response } from 'express';

import { userSchema } from '../utils/user.schema';
import UserService from '../services/user.service';

class UserController{
   async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch users' });
    }
  };
  
   async addUser(req: Request, res: Response) {
    // validation input menggunakan joi
    try {
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const user = await UserService.createUser(value);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Unable to create user' });
    }
  };

}
export default new UserController()