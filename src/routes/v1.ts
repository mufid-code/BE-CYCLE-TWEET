import express, {Request, Response} from 'express';
import { addUser, getUsers } from '../controllers/user.controller';
import { LoginController, registerController } from '../controllers/auth.controller';

export const routerv1 = express.Router();

routerv1.get( '/users', getUsers);
routerv1.post( '/users', addUser);
routerv1.post( '/register', registerController);
routerv1.post( '/login', LoginController);