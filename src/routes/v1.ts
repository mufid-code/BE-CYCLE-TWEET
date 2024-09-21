import express, {Request, Response} from 'express';
import authController from '../controllers/auth.controller';
import { authentication, authorize } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import threadController from '../controllers/thread.controller';

export const routerv1 = express.Router();

// AUTH
routerv1.post( '/register', authController.register);
routerv1.post( '/login', authController.Login);

// USER
routerv1.get("/users/:id", userController.findById);
routerv1.post("/users", userController.create);
routerv1.patch("/users", userController.update);
// ADMIN
routerv1.delete("/users/:id",authentication,authorize(['ADMIN']), userController.delete);
routerv1.get("/users",authentication,authorize(['ADMIN']), userController.findAll);
routerv1.get( '/admin/users',authentication,authorize(['ADMIN']), userController.getUsers);
// THREADS
routerv1.get("/threads/:id", authentication, threadController.findByIdThread);
routerv1.get("/threads", threadController.findAllThreads);
routerv1.post("/threads/:userId", threadController.create);
routerv1.put("/threads/:id", threadController.update);
routerv1.delete("/threads/:id", threadController.delete);
routerv1.post("/threads/:id/reply", threadController.reply);
