import { name, version } from '../../package.json';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
const swaggerDefinition = {
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
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
      },
    ],
    // paths: {
   
    // components: {
    //   schemas: {
    //     Thread: {
    //       type: 'object',
    //       properties: {
    //         id: {
    //           type: 'integer',
    //           example: 1
    //         },
    //         content: {
    //           type: 'string',
    //           example: 'This is a thread content'
    //         },
    //         imageUrl: {
    //           type: 'string',
    //           format: 'uri',
    //           example: 'http://example.com/image.png'
    //         },
    //         userId: {
    //           type: 'integer',
    //           example: 123
    //         },
    //         replies: {
    //           type: 'array',
    //           items: {
    //             $ref: '#/components/schemas/Thread'
    //           }
    //         }
    //       },
    //       required: ['content']
    //     }
    //   }
    // }
  };

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}