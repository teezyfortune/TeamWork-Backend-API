import conn from '../../database/index';

export const getOneArticle = async (id, article) => {
  try {
    const sql = 'SELECT * FROM articles WHERE empid = $1 AND article =$2  LIMIT 1';
    const values = [id, article];
    const articleArticle = await conn.query(sql, values);
    if (articleArticle.rowCount !== 0) {
      return articleArticle;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const saveArticle = async (userId, title, article) => {
  try {
    const sql =
      'INSERT INTO articles (empid, title, article)VALUES ($1,$2,$3) RETURNING id, title, article, createdOn';
    const values = [userId, title, article];

    const postArticle = await conn.query(sql, values);
    if (postArticle) {
      return postArticle;
    }
  } catch (error) {
    return error;
  }
  return false;
};
