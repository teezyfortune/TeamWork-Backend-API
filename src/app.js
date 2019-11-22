import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
import polyfill from '@babel/polyfill';
import bodyParser from 'body-parser';
import path from 'path';
import { getEnv, logger } from './utils/utils';
import router from './modules/routes/index';
// import swaggerSpec from '../documentation/swagger-ui';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define Static folder for public assets
// app.use(express.static(path.join(__dirname, '')));

// swagger definition
// const swaggerDefinition = {
//   info: {
//     title: 'TeamWork',
//     version: '1.0.0',
//     description: 'DevC TeamWork API Documentation',
//   },
//   host: getEnv('HOST_URL'),
//   basePath: '/api/v1',
// };

// // initialize swagger-jsdoc
// const swaggerSpec = swaggerJSDoc({
//   swaggerDefinition,
//   apis: ['routes/**.route.js'], // pass all in array
// });

// serve swagger
// app.get('/doc', (req, res) => {
//   res.send(swaggerSpec);
// });

// app.get('/docs', (req, res) => {
//   res.sendFile(path.join(__dirname, '../swagger-documentation/index.html'));
// });

app.get(`/api/v1/doc`, (req, res) => {
  res.setHeader('content-Type', 'application/json');
  // res.send(swaggerSpec);
});

app.get('/', (req, res) => {
  res.status(200).status({ message: 'Welcome to DevC TeamWork API.' });
});

app.use('/api/v1', router);
// app.use(`/api/v1/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(getEnv('PORT', 5000), () =>
  logger(`server listening on: http://localhost:${getEnv('PORT', 5000)}`)
);

export default app;
