import express from 'express';
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
import polyfill from '@babel/polyfill';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getEnv, logger } from './utils/utils';
import router from './modules/routes/index';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // swagger definition
// const swaggerOption = {
//   swaggerDefinition: {
//     info: {
//       title: 'TeamWork  API',
//       description: 'Documentation for TeamWork API',
//       contact: {
//         name: 'Dev',
//       },
//       server: 'http://localhost:7000',
//       basePath: '/api/v1',
//     },
//   },
//   apis: ['**/**/*.route.js'], // pass all in array
// // };

// const swaggerjsDoc = swaggerJSDoc(swaggerOption);

// app.use('/swagger-doc', swaggerUi.serve, swaggerUi.setup(swaggerjsDoc));

app.use('/api/v1', router);

app.listen(getEnv('PORT', 7000), () =>
  logger(`server listening on: http://localhost:${getEnv('PORT', 7000)}`)
);

export default app;
