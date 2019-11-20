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

export const getOneUserByEmail = async (email) => {
  try {
    const sql = 'SELECT * FROM employees WHERE email = $1 LIMIT 1';
    const values = [email];

    const checkUser = await conn.query(sql, values);
    if (checkUser.rowCount !== 0) {
      return checkUser;
    }
  } catch (error) {
    return error;
  }
  return false;
};


export const editProfile = async (body) => {
  try {
    const sql =
      'UPDATE employess SET firstName = $1, lastName = $2  ,gender = $5, jobRole = $6, department =$7,address =$8 WHERE id = $9 AND isAdmin = $10  RETURNING *';
    const values = [body, false];
    const updated = await conn.query(sql, values);
    if (updated) {
      return updated;
    }
  } catch (error) {
    return error;
  }
  return false;
};
