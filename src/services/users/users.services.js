import conn from '../../database/index';

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

export const signInUser = async () => {};
