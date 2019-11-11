import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getOneUserById } from '../services/users/users.services';

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

export const verifyToken = async (token) => {
  try {
    const verified = await jwt.verify({ token }, process.env.JWT_SECRET, SIGN_OPTION);
    if (verified) {
      return verified;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const verifyMiddleWare = (req, res, next) => {
  const token = req.headers.authorization;
  const verify = verifyToken(token);
  if (!verify) {
    res.status(401).json({ status: 200, error: 'invalid or missing authorization' });
  }
  return next();
};
