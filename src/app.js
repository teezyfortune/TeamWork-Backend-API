import express from 'express';
import polyfill from '@babel/polyfill';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressUpload from 'express-fileupload';
import swaggerJSDocs from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from './modules/routes/index';

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
app.use(expressUpload({ useTempFiles: true }));

const PORT = process.env.PORT || 8000;

const server = `http://localhost:${PORT}`;
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'TEAM WORK API ',
      description:
        'This application connects organization together and to share useful information among the team members',
      contact: {
        name: 'Fortune',
      },
      servers: `${server}`,
    },
    basePath: '/api/v1',
  },
  // loop on all route
  apis: ['**/**.route.js'], // pass all in array
};

app.use('/api/v1', routes);
// serve swagger to all routes

// app.get('/', (req, res) => {
//   res.status(200).send({ status: 200, message: 'Welcome to the TeamWork App.' });
// });

const swaggerDOCS = swaggerJSDocs(swaggerOptions);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDOCS));

app.listen(PORT, () => console.log(`server listening on: ${server}`));


export default app;
