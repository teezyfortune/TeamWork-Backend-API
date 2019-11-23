import { encryptPassWord, newToken } from '../../helpers/security';
import conn from '../../database/index';
import {
  SUCESS_MESSAGE,
  EMAIL_CONFLICT,
  SERVER_ERROR_MESSAGE,
  NO_USER,
  UPDATE_MESSAGE,
} from '../../utils/constant';
import {
  getOneUserByEmail,
  editProfile,
  getOneUserById,
} from '../../services/users/users.services';

export const saveUser = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address,
    } = await request.body;
    const hash = encryptPassWord(password);
    const findUser = await getOneUserByEmail(email);
    if (findUser) {
      return response.status(409).json({ status: 'error', message: EMAIL_CONFLICT });
    }
    const sql =
      'INSERT INTO employees (firstName,lastName,email,password,gender,jobRole,department,address,isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, email';
    const values = [firstName, lastName, email, hash, gender, jobRole, department, address, false];
    const user = await conn.query(sql, values);
    if (user) {
      const { id } = user.rows[0];
      const jwtToken = newToken({ id, email: user.rows.email });
      return response.status(201).json({
        status: 'success',
        message: SUCESS_MESSAGE,
        data: {
          userId: user.rows[0].id,
          token: jwtToken,
        },
      });
    }
  } catch (error) {
    return response.status(500).json({ status: 500, message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.token.payload.userId;
    const find = await getOneUserById(id);
    if (find.rowCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: NO_USER,
      });
    }
    const values = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      department: req.body.department,
      address: req.body.address,
      id,
    };
    const profile = await editProfile(values);
    if (!profile) {
      return res.status(404).json({
        status: 'error',
        message: NO_USER,
      });
    }
    if (profile) {
      return res.status(200).json({
        status: 'success',
        message: UPDATE_MESSAGE,
        data: {
          userId: profile.rows[0].id,
          firstName: profile.rows[0].firstName,
          lastNmae: profile.rows[0].lastName,
          email: profile.rows[0].email,
          address: profile.rows[0].address,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};
