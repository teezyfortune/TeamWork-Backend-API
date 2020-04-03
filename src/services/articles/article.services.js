import conn from '../../database/index';
import { SERVER_ERROR_MESSAGE } from '../../utils/constant';

export const getOneArticle = async (id, empid) => {
  try {
    const sql = 'SELECT * FROM articles WHERE id = $1 AND empid =$2  LIMIT 1';
    const values = [id, empid];
    const articles = await conn.query(sql, values);
    if (articles.rowCount !== 0) {
      return articles;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const getOneArticleByUserId = async (id, articles) => {
  try {
    const sql = 'SELECT * FROM articles WHERE empid = $1  AND article = $2 LIMIT 1';
    const values = [id, articles];
    const articleRows = await conn.query(sql, values);
    if (articleRows.rowCount !== 0) {
      return articleRows;
    }
  } catch (error) {
    return error;
  }
  return false;
};

// get a single article by id
export const getArticleById = async (id) => {
  try {
    const sql = 'SELECT * FROM articles WHERE id = $1 LIMIT 1';
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

// returns all article
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

// gets a specific article and comments from that article
export const getSpecificArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await conn.query(`SELECT * FROM articles WHERE id = ${[id]}`);

    const comments = await conn.query(
      `SELECT id as commendId, comment, empid as authorId FROM article_comments WHERE  article_comments.id =  ${article.rows[0].id}`
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

// checks if an article as already been flagged
export const flagByOnePerson = async (articleId, empId) => {
  try {
    const query = 'SELECT * FROM flagArticle WHERE articleid = $1 AND  empid = $2 LIMIT 1';
    const value = [articleId, empId];
    const result = await conn.query(query, value);
    if (result.rowCount !== 0) {
      return result;
    }
  } catch (error) {
    return error;
  }
  return false;
};

// gets user who flagged an article
export const flagInappropriate = async (articleId, empId) => {
  try {
    const sql = 'INSERT INTO flagArticle (articleId, empid) VALUES ($1,$2) RETURNING *';
    const values = [articleId, empId];
    const flag = await conn.query(sql, values);

    if (flag) {
      return flag;
    }
  } catch (error) {
    return error;
  }
  return false;
};

// change flagged status from false to true
export const updateFlagStatus = async (articleId) => {
  try {
    const squery = 'UPDATE articles SET flag = $1 WHERE id = $2 RETURNING *';
    const value = [true, articleId];
    const flag = await conn.query(squery, value);

    if (flag) {
      return flag;
    }
  } catch (error) {
    return error;
  }
  return false;
};
