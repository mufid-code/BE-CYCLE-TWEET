
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { routerv1 } from './routes/v1';
import swaggerDoc from './docs/swaggerDoc';
var cors = require('cors')
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
//For env File 
dotenv.config();

const app: Application = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors())


const specs = swaggerJsdoc(swaggerDoc);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup());

app.use("/api/v1", routerv1);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

