import express from 'express';
import authRoute from './authentication.route';
import articleRoute from './articles.route';
import gifRoute from './gif.route';

const router = express.Router();

router.use(authRoute);
router.use(articleRoute);
router.use(gifRoute);

export default router;
