import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getOneUserById } from '../services/users/users.services';
import { SERVER_ERROR_MESSAGE } from '../utils/constant';

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
  const bearerHeader = req.headers.authorization;
  // Bearer is not undefined
  const Bearer = await bearerHeader.split(' ');
  const bearerToken = await Bearer[1];
  req.token = await bearerToken;
  const decoded = jwt.verify(req.token, process.env.JWT_SECRET, SIGN_OPTION);
  if (!decoded) {
    res.status(401).json({ code: 401, messgae: 'u are not loggedIn' });
  }
  if (decoded === undefined) {
    res.status(500).json({ code: 500, messg: SERVER_ERROR_MESSAGE });
  } else {
    req.token = await decoded;
    return next();
  }
  return false;
};
