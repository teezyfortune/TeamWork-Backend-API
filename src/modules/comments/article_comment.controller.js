import conn from '../../database/index';
import { SERVER_ERROR_MESSAGE, ARTICLE_NOT_FOUND, COMMENT_SUCCESS } from '../../utils/constant';

const articleComment = async (req, res) => {
  try {
    const { comment } = await req.body;
    const articleId = await req.params.id;
    const empid = await req.token.payload.userId;
    const sql = 'SELECT * FROM articles WHERE id = $1  LIMIT 1';
    const values = [articleId];
    const find = await conn.query(sql, values);
    if (find.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: ARTICLE_NOT_FOUND });
    }
    const { title, article } = find.rows[0];
    const query =
      'INSERT INTO article_comments (articleid, empid, title, article, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const value = [articleId, empid, title, article, comment];
    const reply = await conn.query(query, value);
    if (reply) {
      return res.status(201).json({
        status: 'success',
        data: {
          message: COMMENT_SUCCESS,
          created: reply.rows[0].createdon,
          articleId: reply.rows[0].id,
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

export default articleComment;
