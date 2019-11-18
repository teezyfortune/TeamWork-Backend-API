import express from 'express';
import authRoute from './authentication.route';
import articleRoute from './articles.route';
import gifRoute from './gif.route';
import adminRoute from './admin.route';

const router = express.Router();

router.use(authRoute);
router.use(articleRoute);
router.use(gifRoute);
router.use(adminRoute);

export default router;
