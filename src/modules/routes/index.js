import express from 'express';
import authRoute from '../authentication/authentication.route';
import articleRoute from '../articles/articles.route';
import gifRoute from '../gifs/gif.route';
import adminRoute from '../admin/admin.route';

const routes = express.Router();

routes.use(authRoute);
routes.use(articleRoute);
routes.use(gifRoute);
routes.use(adminRoute);

export default routes;
