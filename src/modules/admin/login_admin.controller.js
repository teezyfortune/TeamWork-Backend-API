import getAdmin from '../../services/admin/adm.services';
import { comparePassWord, newToken } from '../../helpers/security';
import { getAllUsers, getOneUserById } from '../../services/users/users.services';
import { SERVER_ERROR_MESSAGE, RETRIEVED, BAD_EMAIL, NOT_ADMIN } from '../../utils/constant';

export const loginAdmin = async (request, response) => {
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
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const adminId = req.token.payload.userId;
    const verify = await getOneUserById(adminId);

    const { isadmin } = verify.rows[0];
    if (isadmin === false) {
      return res.status(404).json({
        status: 'error',
        message: NOT_ADMIN,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: SERVER_ERROR_MESSAGE,
    });
  }
  return next();
};

export const getEmployees = async (req, res) => {
  try {
    const Users = await getAllUsers();
    if (Users) {
      return res.status(200).json({
        status: 'succes',
        message: RETRIEVED,
        data: Users.rows,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: SERVER_ERROR_MESSAGE,
    });
  }
  return false;
};
export default loginAdmin;
