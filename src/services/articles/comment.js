import conn from '../../database/index';

const articleComment = async (articleId, empid, title, article, comment) => {
  try {
    const sql =
      'INSERT INTO article_comments (articleid, empid, title, article, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [articleId, empid, title, article, comment];
    const reply = await conn.query(sql, values);
    if (reply) {
      return reply;
    }
  } catch (error) {
    console.log('>>>Error', error);
    return error;
  }
  return false;
};

export default articleComment;
