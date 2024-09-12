
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { routerv1 } from './routes/v1';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use("/api/v1", routerv1);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});