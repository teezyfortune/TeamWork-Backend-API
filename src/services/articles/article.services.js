import conn from '../../database/index';
import { SERVER_ERROR_MESSAGE, ARTICLE_FETCH_SUCCESS } from '../../utils/constant';

export const getOneArticle = async (id, article) => {
  try {
    const sql = 'SELECT * FROM articles WHERE empid = $1 AND article =$2  LIMIT 1';
    const values = [id, article];
    const articleArticle = await conn.query(sql, values);
    if (articleArticle.rowCount !== 0) {
      return true;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const getOneArticleById = async (id, empid) => {
  try {
    const sql = 'SELECT * FROM articles WHERE id = $1 AND empid =$2  LIMIT 1';
    const values = [id, empid];
    const articleRows = await conn.query(sql, values);
    if (articleRows.rowCount !== 0) {
      return articleRows;
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

export const editArticle = async (title, article, articleId, empid) => {
  try {
    const sql =
      'UPDATE articles SET title = $1, article = $2 WHERE id = $3 AND empid = $4 RETURNING *';
    const values = [title, article, articleId, empid];
    const updated = await conn.query(sql, values);
    if (updated) {
      return updated;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const deleteArticle = async (id) => {
  try {
    const sql = 'DELETE FROM  articles  WHERE id = $1';
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

export const getAllArticle = async () => {
  try {
    const sql =
      'SELECT id, createdon as createdOn, title, article, empid as authorId  FROM articles ORDER BY createdOn DESC';
    const allArticles = await conn.query(sql);
    if (allArticles) {
      return allArticles;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const getSpecificArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await conn.query(`SELECT * FROM articles WHERE id = ${[id]}`);

    const comments = await conn.query(
      `SELECT id as commendId, comment, empid as authorId FROM articles_comments WHERE  articles_comments.id =  ${article.rows[0].id}`
    );
    if (article) {
      return res.status(200).json({
        status: 'success',
        data: {
          id: article.rows[0].id,
          createdOn: article.rows[0].createdon,
          title: article.rows[0].title,
          article: article.rows[0].article,
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
