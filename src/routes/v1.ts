import express, {Request, Response} from 'express';
import authController from '../controllers/auth.controller';
import { authentication, authorize } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';

export const routerv1 = express.Router();

routerv1.get( '/users',authentication,authorize(['ADMIN']), userController.getUsers);
routerv1.post( '/users', userController.addUser);
routerv1.post( '/register', authController.register);
routerv1.post( '/login', authController.Login);