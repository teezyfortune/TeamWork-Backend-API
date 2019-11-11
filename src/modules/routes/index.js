import express from 'express';
import authRoute from './authentication.route';

const router = express.Router();

router.use(authRoute);

export default router;
