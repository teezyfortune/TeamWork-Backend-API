import { NOTFOUND } from 'dns';
import conn from '../../database/index';
import { SERVER_ERROR_MESSAGE } from '../../utils/constant';

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




export const deleteGif = async (id) => {
  try {
    const sql = 'DELETE FROM  Gifs  WHERE id = $1';
    const values = [id];
    const deleted = await conn.query(sql, values);
    if (deleted) {
      return true;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const getAllGif = async () => {
  try {
    const sql =
      'SELECT id, createdon as createdOn, title, gif, empid as authorId  FROM gifs ORDER BY createdOn DESC';
    const allGifs = await conn.query(sql);
    if (allGifs) {
      return allGifs;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const getSpecificGif = async (req, res) => {
  try {
    const { id } = req.params;
    const gif = await conn.query(`SELECT * FROM gifs WHERE id = ${[id]}`);
    const comments = await conn.query(
      `SELECT id as commendId, comment, empid as authorId FROM gifs_comments WHERE  gifs_comments.id =  ${gif.rows[0].id}`
    );
    if (gif === false) {
      return res.status(404).json({ status: 'error', message: NOTFOUND });
    }
    if (gif) {
      return res.status(200).json({
        status: 'success',
        data: {
          id: gif.rows[0].id,
          createdOn: gif.rows[0].createdon,
          title: gif.rows[0].title,
          article: gif.rows[0].article,
          comments: [
            {
              comments: comments.rows[0],
            },
          ],
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};
