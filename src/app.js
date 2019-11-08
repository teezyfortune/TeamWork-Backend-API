import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv/config';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const swaggerOption = {
  iInfo: {
    Title: 'TeamWork API',
    Description: 'TeamWork API information',
  },
  contact: {
    name: 'DevFortune',
  },
  server: ['http://localhost:5000'],
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOption)
app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs));