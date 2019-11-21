import { getOneUserByEmail } from '../../services/users/users.services';
import { comparePassWord, newToken } from '../../helpers/security';

import { BAD_EMAIL, LOGIN_SUCCESS, NO_USER, SERVER_ERROR_MESSAGE } from '../../utils/constant';
import conn from '../../database';

const loginUser = async (request, response) => {
  try {
    const { email, password } = await request.body;
    const findUser = await getOneUserByEmail(email);
    if (findUser === false) {
      return response.status(404).json({
        status: 'error',
        message: BAD_EMAIL,
      });
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
    // console.log('errr', error)
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export default loginUser;
