import getAdmin from '../../services/admin/adm.services';
import { comparePassWord, newToken } from '../../helpers/security';

import { SERVER_ERROR_MESSAGE, BAD_EMAIL, NOT_ADMIN } from '../../utils/constant';

const loginAdmin = async (request, response) => {
  try {
    const { email, password } = await request.body;
    const findAdmin = await getAdmin(email);
    if (findAdmin === false) {
      return response.status(404).json({
        status: 'error',
        message: BAD_EMAIL,
      });
    }
    const { id, isAdmin } = findAdmin.rows[0];
    if (findAdmin.rowCount !== 0) {
      const userPassword = await comparePassWord(password, id);
      if (userPassword === false) {
        return response.status(404).json({
          status: 'error',
          message: NOT_ADMIN,
        });
      }
      if (isAdmin === false) {
        return response.status(404).json({
          status: 'error',
          message: NOT_ADMIN,
        });
      }
      if (userPassword) {
        const authToken = newToken({ userId: id, email: findAdmin.rows[0].email });
        return response.status(200).json({
          status: `Welcome ${findAdmin.rows[0].jobrole}`,
          data: {
            userId: findAdmin.rows[0].id,
            token: authToken,
          },
        });
      }
    }
  } catch (error) {
    console.log('>>Error', error);
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export default loginAdmin;
