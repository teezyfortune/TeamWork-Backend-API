import express from 'express';
import validateUserInput from '../../middleware/validation';
import { createUser } from '../authentication/signup_account';

const authRoute = express.Router();
authRoute.post('/signup', validateUserInput, createUser);

export default authRoute;
