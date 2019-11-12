import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import polyfill from '@babel/polyfill';
import bodyParser from 'body-parser';
import { getEnv, logger } from './utils/utils';
import router from './modules/routes/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const swaggerOption = {
  swaggerDefinition: {
    iInfo: {
      Title: 'TeamWork API',
      Description: 'TeamWork API information',
      contact: {
        name: 'DevFortune',
      },
      server: ['http://localhost:7000'],
    },
  },
  // ['.routes/*.js']
  apis: ['app.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOption);

app.use('/api/v1', router);

app.listen(getEnv('PORT', 6000), () =>
  logger(`server listening on: http://localhost:${getEnv('PORT', 7000)}`)
);

export default app;
