import express from 'express';
import { validateUserInput } from '../../middleware/validation';
import { saveUser } from '../../services/users/users.services';

const authRoute = express.Router();
authRoute.post('/signup', validateUserInput, saveUser);

export default authRoute;
