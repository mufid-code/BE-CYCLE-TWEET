import express, {Request, Response} from 'express';

export const routerv1 = express.Router();

routerv1.get( '/', ( _, res) => {

    res.json({
        msg: 'Welcome to Express & TypeScript Server'
    });
  });

routerv1.get( '/users', (req: Request, res: Response) => {

    res.send('Welcome to Express & TypeScript Server');
  });
