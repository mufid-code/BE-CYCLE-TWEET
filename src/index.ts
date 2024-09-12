
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { routerv1 } from './routes/v1';
var cors = require('cors')
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use("/api/v1", routerv1);

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

