import { encryptPassWord, newToken } from '../../helpers/security';
import conn from '../../database/index';
import { Response } from '../../utils/utils';
import { SUCESS_MESSAGE, EMAIL_CONFLICT, SERVER_ERROR_MESSAGE } from '../../utils/constant';

export const getOneUsersByEmail = async (email) => {
  try {
    const sql = 'SELECT * FROM employees WHERE email = $1 LIMIT 1';
    const values = [email];

    const checkUser = await conn.query(sql, values);
    if (checkUser.rowCount !== 0) {
      return true;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const getOneUsersById = async (id) => {
  try {
    const searCh = {
      name: 'find',
      sql: 'SELECT * FROM employees WHERE email = $1 LIMIT 1',
      values: [id],
    };
    const checkUser = await conn.query(searCh);
    if (checkUser.rowCount !== 0) {
      return true;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const saveUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, jobRole, department, address } = req.body;
    const hash = encryptPassWord(password);
    const findUser = await getOneUsersByEmail(email);
    if (findUser) {
      return Response(res, { status: 404, message: EMAIL_CONFLICT });
    }
    const sql =
      'INSERT INTO employees (firstName,lastName,email,password,gender,jobRole,department,address) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING firstName,lastName,email,gender,jobRole,department,address, createdOn';
    const values = [firstName, lastName, email, hash, gender, jobRole, department, address];
    const user = await conn.query(sql, values);
    if (user) {
      const { id } = user.rows[0];
      const jwtToken = newToken({ id, email: user.rows.email });
      return Response(res, {
        status: 201,
        message: SUCESS_MESSAGE,
        data: {
          user: user.rows,
          token: jwtToken,
        },
      });
    }
  } catch (error) {
    return Response(res, { status: 500, message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export const signInUser = async () => {};
