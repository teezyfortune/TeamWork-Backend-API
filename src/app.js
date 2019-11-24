import express from 'express';
// import swaggerJSDoc from 'swagger-jsdoc';
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

// const swaggerOption = {
//   swaggerDefinition: {
//     iInfo: {
//       Title: 'TeamWork API',
//       Description: 'TeamWork API information',
//       contact: {
//         name: 'DevFortune',
//       },
//       server: ['http://localhost:7000'],
//     },
//   },
// ['.routes/*.js']
//   apis: ['app.js'],
// };
// const swaggerDocs = swaggerJsDoc(swaggerOption);

app.use('/api/v1', router);
// app.use(`/api/v1/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(getEnv('PORT', 5000), () =>
  logger(`server listening on: http://localhost:${getEnv('PORT', 5000)}`)
);

export default app;
