import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getOneUserById } from '../services/users/users.services';
import { AUTHORIZATION_FAILURE } from '../utils/constant';

export const SIGN_OPTION = {
  issuer: 'Authorization/Resource/TeamWork',
  subject: 'Authentication Bearer (devFortune)',
  expiresIn: '30d',
};

export const encryptPassWord = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

export const comparePassWord = async (password, id) => {
  try {
    const savedpassword = await getOneUserById(id);
    const compare = bcrypt.compareSync(password, savedpassword.rows[0].password);
    if (compare) {
      return compare;
    }
  } catch (err) {
    return err;
  }
  return false;
};

export const newToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, SIGN_OPTION);
  return token;
};

export const verifyMiddleWare = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    // Bearer is not undefined
    const Bearer = await bearerHeader.split(' ');
    const bearerToken = await Bearer[1];
    req.token = await bearerToken;
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET, SIGN_OPTION);
    if (decoded) {
      req.token = await decoded;
    }
    return next();
  } catch (error) {
    res.status(401).json({ code: 'error', messgae: AUTHORIZATION_FAILURE });
  }
  return false;
};
