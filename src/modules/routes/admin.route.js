import express from 'express';
import { getEmployees, verifyAdmin } from '../admin/admin.controller';
import { verifyMiddleWare } from '../../helpers/security';

const adminRoute = express.Router();

/**
 * @swagger
 *
 * /employees:
 *   get:
 *     tags:
 *       - Get ll employees
 *     description: Admin can conatct us message
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Activated successful
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */

adminRoute.get('/employees', verifyMiddleWare, verifyAdmin, getEmployees);

export default adminRoute;
