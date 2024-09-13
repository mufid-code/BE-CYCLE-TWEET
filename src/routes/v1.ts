import express, {Request, Response} from 'express';
import { addUser, getUsers } from '../controllers/user.controller';

export const routerv1 = express.Router();

routerv1.get( '/users', getUsers);
routerv1.post( '/users', addUser);