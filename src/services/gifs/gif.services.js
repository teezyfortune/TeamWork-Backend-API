import conn from '../../database/index';

export const getOneGifById = async (id) => {
  try {
    const sql = 'SELECT * FROM Gifs WHERE id = $1 LIMIT 1';
    const values = [id];
    const articleRows = await conn.query(sql, values);
    if (articleRows.rowCount !== 0) {
      return articleRows;
    }
  } catch (error) {
    return error;
  }
  return false;
};




export const saveGifs = async (empid, title, cloudUrl) => {
  try {
    const sql = 'INSERT INTO gifs(empid, title, imageurl) VALUES ($1, $2, $3) RETURNING *';
    const values = [empid, title, cloudUrl];
    const postGif = await conn.query(sql, values);
    if (postGif) {
      return postGif;
    }
  } catch (error) {
    return error;
  }
  return false;
};
