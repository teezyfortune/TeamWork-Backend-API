import { getAllUsers, getOneUserById } from '../../services/users/users.services';
import { SERVER_ERROR_MESSAGE, RETRIEVED, NOT_ADMIN } from '../../utils/constant';

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
