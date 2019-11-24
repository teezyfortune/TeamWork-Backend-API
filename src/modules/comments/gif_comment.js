import conn from '../../database/index';
import { SERVER_ERROR_MESSAGE, GIF_NOT_FOUND, COMMENT_SUCCESS } from '../../utils/constant';

const gifComment = async (req, res) => {
  try {
    const { comment } = await req.body;
    const gifId = await req.params.id;
    const empid = await req.token.payload.userId;
    const sql = 'SELECT * FROM gifs WHERE id = $1  LIMIT 1';
    const values = [gifId];
    const find = await conn.query(sql, values);
    if (find.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: GIF_NOT_FOUND });
    }
    const { title } = find.rows[0];
    const query =
      'INSERT INTO gifs_comments (gifid, empid, title, comment) VALUES ($1, $2, $3, $4) RETURNING *';
    const value = [gifId, empid, title, comment];
    const reply = await conn.query(query, value);
    if (reply) {
      return res.status(201).json({
        status: 'success',
        data: {
          message: COMMENT_SUCCESS,
          created: reply.rows[0].createdon,
          gifId: reply.rows[0].id,
          title: reply.rows[0].title,
          commnet: reply.rows[0].comment,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export default gifComment;
