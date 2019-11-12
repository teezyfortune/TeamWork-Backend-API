import express from 'express';
import authRoute from './authentication.route';
import articleRoute from './articles.route';

const router = express.Router();

router.use(authRoute);
router.use(articleRoute);

export default router;
