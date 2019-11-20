import express from 'express';
import { validateUserInput, validateLogin } from '../../middleware/validation';
import { saveUser } from '../authentication/signup_account';
import loginUser from '../authentication/login';

const authRoute = express.Router();

/**
 * @swagger
 *
 * /auth/signup:
 *   post:
 *     tags:
 *       - User can create an employee account.
 *     description: User can create an employee user account.
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: gender
 *         description: User's gender
 *         in: formData
 *         required: false
 *         type: string
 *       - name: jobRole
 *         in: formData
 *         required: false
 *         type: string
 *       - name: type
 *         description: An employees job role in the team
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       201:
 *         description: User account successfully created
 *       409:
 *         description: This email already been taken, please enter a new mail
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */
authRoute.post('/auth/signup', validateUserInput, saveUser);

/**
 * @swagger
 *
 * /auth/siginin:
 *   post:
 *     tags:
 *       - User can create an employee user account.
 *     description: Admin can create an employee user account.
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *     description: User's password.
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User account successfully created
 *       400:
 *         description: This email already been taken, please enter a new mail
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */
authRoute.post('/auth/signin', validateLogin, loginUser);

export default authRoute;
