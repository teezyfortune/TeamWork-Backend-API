import conn from '../../database/index';

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

export const getSpecificArticle = async (id) => {
  try {
    const sql =
      'SELECT articles.id, articles.createdon as createdAt, articles.title, articles.article, articles.empid as authorId, article_comments.id as commenId, article_comments.comment as comments  FROM articles JOIN article_comments ON articles.id = article_comments.articleid WHERE articleid = $1';
    const value = [id];
    const findOne = conn.query(sql, value);
    if (findOne.rowCount !== 0) {
      return findOne;
    }
  } catch (error) {
    return error;
  }
  return false;
};
