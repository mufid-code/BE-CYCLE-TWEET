import express, {Request, Response} from 'express';

export const routerv1 = express.Router();

routerv1.get( '/', (req: Request, res: Response) => {

    res.send('Welcome to Express & TypeScript Server');
  });

routerv1.get( '/', (req: Request, res: Response) => {

    res.send('Welcome to Express & TypeScript Server');
  });
