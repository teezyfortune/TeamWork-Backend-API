import express from 'express';
import { getEmployees, verifyAdmin, loginAdmin } from '../admin/login_admin.controller';
import { validateLogin } from '../../middleware/validation';
import { verifyMiddleWare } from '../../helpers/security';

const adminRoute = express.Router();

/**
 * @swagger
 *
 * /login:
 *   post:
 *     tags:
 *       - Admin can sigin.
 *     description: Admin sigin into his account.
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *     description: Admin's email.
 *         required: true
 *         type: string
 *       - name: password
 *         description: Admin's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User account successfully created
 *       404:
 *         description: This email already been taken, please enter a new mail
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */
adminRoute.post('/admin', validateLogin, loginAdmin);

/**
 * @swagger
 *
 * /Employees:
 *   get:
 *     tags:
 *       - Admin
 *     description: Amin can view all emplyees.
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: request
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: success.
 *       500:
 *         description: Server error
 */

adminRoute.get('/employees', verifyMiddleWare, verifyAdmin, getEmployees);

export default adminRoute;
