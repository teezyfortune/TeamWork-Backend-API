import conn from '../../database/index';

const getAdmin = async (email, admin) => {
  try {
    const sql = 'SELECT * FROM employees WHERE email = $1  AND  jobRole = $2 LIMIT 1';
    const values = [email, admin];
    const checkUser = await conn.query(sql, values);
    if (checkUser.rowCount !== 0) {
      return checkUser;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export default getAdmin;
