const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const app = express();

// Define Static folder for public assets
app.use(express.static(path.join(__dirname, '../swagger-documentation')));

// swagger definition
const swaggerDefinition = {
  info: {
    title: '',
    version: '1.0.0',
    description: '',
  },
  host: '',
  basePath: '/api/v1',
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['**/**.route.js'], // pass all in array
});

// serve swagger
app.get('/doc', (req, res) => {
  res.send(swaggerSpec);
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../swagger-documentation/index.html'));
});
