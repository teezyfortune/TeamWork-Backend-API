const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SIGN_OPTION = {
  issuer: 'Authorization/Resource/TeamWork',
  subject: 'Authentication Bearer (devFortune)',
  expiresIn: '30d',
};

export default class Helper {
  static async encryptPassWor(password) {
    const hash = await bcrypt.hashSync(password, 10);
    return hash;
  }

  static async comparePassWord(password, id) {
    return bcrypt.compareSync(password, id);
  }

  static async newToke(payload) {
    const token = await jwt.sign({ payload }, process.env.JWT_SECRET, SIGN_OPTION);
    return token;
  }

  static async verifyToken(token) {
    try {
      const verified = await jwt.verify({ token }, process.env.JWT_SECRET, SIGN_OPTION);
      if (verified) {
        return verified;
      }
    } catch (error) {
      return error;
    }
    return false;
  }

  static async verifyMiddleWare(req, res, next) {
    const token = req.headers.authorization;
    const verify = this.verifyToken(token);
    if (!verify) {
      res.status(401).json({ status: 200, error: 'invalid or missing authorization' });
    }
    return next();
  }
}
