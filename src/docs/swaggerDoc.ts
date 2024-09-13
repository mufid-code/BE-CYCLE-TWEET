import { get } from 'http';
import {name, version} from '../../package.json'
const swaggerDoc ={
    definition: {
        openapi: "3.1.0",
        info: {
            title: `${name} API Document`,
            version,
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
export default swaggerDoc;