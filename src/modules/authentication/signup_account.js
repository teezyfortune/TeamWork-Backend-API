import { encryptPassWord, newToken } from '../../helpers/security';
import conn from '../../database/index';
import { SUCESS_MESSAGE, EMAIL_CONFLICT, SERVER_ERROR_MESSAGE } from '../../utils/constant';
import { getOneUserByEmail } from '../../services/users/users.services';

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
    console.log('>>user', findUser);
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

export const signInUser = async () => {};
