import { getOneUserByEmail } from '../../services/users/users.services';
import { comparePassWord, newToken } from '../../helpers/security';

import { BAD_EMAIL, LOGIN_SUCCESS, NO_USER, SERVER_ERROR_MESSAGE } from '../../utils/constant';
import conn from '../../database';

const loginUser = async (request, response) => {
  try {
<<<<<<< HEAD
    const { username, password } = await request.body;
    const findUser = await getOneUserByEmail(username);
    if (findUser.rowCount !== 0) {
      const { id } = findUser.rows[0];
      const userPassword = await comparePassWord(password, id);
      if (findUser === false) {
        return response.status(404).json({
          status: 'error',
          message: BAD_EMAIL,
        });
      }
      if (userPassword === false) {
        return response.status(404).json({
          status: 'error',
          message: NO_USER,
        });
      }
      if (userPassword) {
        const authToken = newToken({ userId: id, email: findUser.rows[0].email });
        return response.status(200).json({
          status: LOGIN_SUCCESS,
          data: {
            userId: findUser.rows[0].id,
            token: authToken,
          },
        });
      }
=======
    const { email, password } = await request.body;
    const findUser = await getOneUserByEmail(email);
    if (findUser === false) {
      return response.status(404).json({
        status: 'error',
        message: BAD_EMAIL,
      });
>>>>>>> 75829b867b9f05290c16388e5d85cf5e6c02a289
    }

    const { id } = findUser.rows[0];
    const userPassword = await comparePassWord(password, id);
    if (userPassword === false) {
      return response.status(404).json({
        status: 'error',
        message: NO_USER,
      });
    }
    if (userPassword) {
      const authToken = newToken({ userId: id, email: findUser.rows[0].email });
      return response.status(200).json({
        status: LOGIN_SUCCESS,
        data: {
          userId: findUser.rows[0].id,
          token: authToken,
        },
      });
    }

    conn.end();
  } catch (error) {
<<<<<<< HEAD
    console.log('>>>>', error);
=======
    // console.log('errr', error)
>>>>>>> 75829b867b9f05290c16388e5d85cf5e6c02a289
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export default loginUser;
