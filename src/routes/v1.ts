import express, {Request, Response} from 'express';
import authController from '../controllers/auth.controller';
import { authentication, authorize } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';

export const routerv1 = express.Router();

// AUTH
routerv1.post( '/register', authController.register);
routerv1.post( '/login', authController.Login);

// USER
routerv1.get("/users", userController.findAll);
routerv1.get("/users/:id", userController.findById);
routerv1.post("/users", userController.create);
routerv1.patch("/users", userController.update);
routerv1.delete("/users/:id", userController.delete);
// ADMIN
routerv1.get( '/admin/users',authentication,authorize(['ADMIN']), userController.getUsers);