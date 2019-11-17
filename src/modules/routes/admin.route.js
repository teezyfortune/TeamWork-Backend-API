import express from 'express';
import { getEmployees, verifyAdmin } from '../admin/login_admin.controller';
import { verifyMiddleWare } from '../../helpers/security';

const adminRoute = express.Router();

adminRoute.get('/employees', verifyMiddleWare, verifyAdmin, getEmployees);

export default adminRoute;
