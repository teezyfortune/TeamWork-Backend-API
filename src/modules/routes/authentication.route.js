import express from 'express';
import validateUserInput from '../../middleware/validation';
import { saveUser } from '../authentication/signup_account';

const authRoute = express.Router();
authRoute.post('/signup', validateUserInput, saveUser);

export default authRoute;
