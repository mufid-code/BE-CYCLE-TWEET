import express, {Request, Response} from 'express';
import authController from '../controllers/auth.controller';
import { authentication, authorize } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import threadController from '../controllers/thread.controller';
import likeController from '../controllers/like.controller';

export const routerv1 = express.Router();

// AUTH
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with name, email, and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
routerv1.post( '/register', authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user and return tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens returned
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
routerv1.post( '/login', authController.Login);

// USER
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
routerv1.get("/users/:id", userController.findById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with name, email, and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
routerv1.post("/users", userController.create);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user details
 *     description: Update user information by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
routerv1.put("/users/:id", userController.update);
// ADMIN

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */
routerv1.get("/users",authentication,authorize(['ADMIN']), userController.findAll);
/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: DELETE users
 *     description: Retrieve a list of all users (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: delete of users byId
 *       500:
 *         description: Internal server error
 */
routerv1.delete("/users/:id",authentication,authorize(['ADMIN']), userController.delete);
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */
routerv1.get( '/admin/users',authentication,authorize(['ADMIN']), userController.getUsers);
// THREADS
/** 
 * @swagger
 * '/threads': 
 *       get: 
 *         summary: 'Retrieve all threads'
 *         responses: 
 *           200: 
 *             description: 'A list of threads'
 *           500: 
 *             description: 'Internal server error'          
 * 
 */ 
routerv1.get("/threads", threadController.findAllThreads);
/** 
 * @swagger
 * '/threads/{id}': 
 *       get: 
 *         summary: 'find threads by id'
 *         responses: 
 *           200: 
 *             description: 'A list of threads'
 *           500: 
 *             description: 'Internal server error'          
 * 
 */ 
routerv1.get("/threads/:id", authentication, threadController.findByIdThread);
/** 
 * @swagger
 * '/threads/{userId}': 
 *       post: 
 *         summary: 'create threads'
 *         responses: 
 *           200: 
 *             description: 'A list of threads'
 *           500: 
 *             description: 'Internal server error'          
 * 
 */ 
routerv1.post("/threads/:userId",authentication, threadController.create);
/** 
 * @swagger
 * '/threads/{id}': 
 *       put: 
 *         summary: 'update threads by id'
 *         responses: 
 *           200: 
 *             description: 'A list of threads'
 *           500: 
 *             description: 'Internal server error'          
 * 
 */ 
routerv1.put("/threads/:id",authentication, threadController.update);
/** 
 * @swagger
 * '/threads/{id}': 
 *       delete: 
 *         summary: 'delete threads'
 *         responses: 
 *           200: 
 *             description: 'A list of threads'
 *           500: 
 *             description: 'Internal server error'          
 * 
 */ 
routerv1.delete("/threads/:id",authentication, threadController.delete);
/** 
 * @swagger
 * '/threads/{id}/reply': 
 *       post: 
 *         summary: 'reply threads'
 *         responses: 
 *           200: 
 *             description: 'A list of threads'
 *           500: 
 *             description: 'Internal server error'          
 * 
 */ 
routerv1.post("/threads/:id/reply",authentication, threadController.reply);
// Like
/**
 * @swagger
 * /threads/{threadId}/like:
 *   post:
 *     summary: Like a thread
 *     description: Like a thread by the authenticated user
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: threadId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The thread ID
 *     responses:
 *       200:
 *         description: Thread liked
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerv1.post('/threads/:threadId/like',authentication, likeController.addLike);

/**
 * @swagger
 * /threads/{threadId}/like:
 *   delete:
 *     summary: Remove like from thread
 *     description: Remove like from thread by the authenticated user
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: threadId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The thread ID
 *     responses:
 *       204:
 *         description: Like removed
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerv1.delete('/threads/:threadId/like',authentication, likeController.removeLike);
/**
 * @swagger
 * /threads/{threadId}/like:
 *   get:
 *     summary: likes from threads
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: threadId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The thread ID
 *     responses:
 *       204:
 *         description: get Likes 
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
routerv1.get('/threads/:threadId/likes',authentication, likeController.getLikesByThread);
