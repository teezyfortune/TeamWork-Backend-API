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

export const getAllUsers = async () => {
  try {
    const sql = 'SELECT id as userId, firstname, lastname, email, address FROM employees ';

    const checkUser = await conn.query(sql);
    if (checkUser) {
      return checkUser;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const editProfile = async (body) => {
  const { firstName, lastName, gender, jobRole, address, department, id } = body;
  try {
    const sql =
      'UPDATE employees SET firstName = $1, lastName = $2  ,gender = $3, jobRole = $4, department =$5, address =$6 WHERE id = $7 RETURNING *';
    const values = [firstName, lastName, gender, jobRole, department, address, id];
    const updated = await conn.query(sql, values);
    if (updated) {
      return updated;
    }
  } catch (error) {
    return error;
  }
  return false;
};
