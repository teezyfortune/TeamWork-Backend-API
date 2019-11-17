import express from 'express';
import loginAdmin from '../admin/login_admin.controller';
import { validateLogin } from '../../middleware/validation';

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

export default adminRoute;
