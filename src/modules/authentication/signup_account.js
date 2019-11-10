import { saveUser } from '../../services/users/users.services';
import { Response } from '../../utils/utils';
import { SUCESS_MESSAGE, SERVER_ERROR_MESSAGE } from '../../utils/constant';
import { newToken } from '../../helpers/security';

// export const creatUser = async (req, res) => {
//   try {
//     const user = await saveUser(req.body);
//     if (user) {
//       const { id } = user.rows[0];
//       const jwtToken = newToken({ id, email: user.rows.email });
//       return Response(res, {
//         status: 201,
//         message: SUCESS_MESSAGE,
//         data: {
//           user: user.rows,
//           token: jwtToken,
//         },
//       });
//     }
//   } catch (error) {
//       console.log(error);
//     return Response(res, { status: 500, message: SERVER_ERROR_MESSAGE });
//   }
//   return false;
// };

export const UpdateUser = async () => {};
