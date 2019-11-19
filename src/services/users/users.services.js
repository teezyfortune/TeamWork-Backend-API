import conn from '../../database/index';

export const getOneUserById = async (id) => {
  try {
    const sql = 'SELECT * FROM employees WHERE id = $1 LIMIT 1';
    const values = [id];
    const checkUser = await conn.query(sql, values);
    if (checkUser.rowCount !== 0) {
      return checkUser;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const getOneUserByEmail = async (username) => {
  try {
    const sql = 'SELECT * FROM employees WHERE email = $1 LIMIT 1';
    const values = [username];

    const checkUser = await conn.query(sql, values);
    if (checkUser.rowCount !== 0) {
      return checkUser;
    }
  } catch (error) {
    return error;
  }
  return false;
};


