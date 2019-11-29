import {
  saveArticle,
  getOneArticle,
  editArticle,
  getOneArticleById,
  deleteArticle,
  getAllArticle,
} from '../../services/articles/article.services';
import {
  ARTICLE_CONFLICTS,
  ARTICLE_SUCCESS,
  SERVER_ERROR_MESSAGE,
  ARTICLE_NOT_FOUND,
  DELETE_ARTICLE_SUCCESS,
  ARTICLE_FETCH_SUCCESS,
} from '../../utils/constant';

export const createArticle = async (req, res) => {
  try {
    const { title, article } = await req.body;
    const id = req.token.payload.userId;
    const findArticle = await getOneArticle(id, article);
    if (findArticle) {
      return res.status(409).json({ status: 'error', message: ARTICLE_CONFLICTS });
    }
    const newArticle = await saveArticle(id, title, article);
    if (newArticle) {
      return res.status(201).json({
        status: 'success',
        data: {
          articleId: newArticle.rows[0].id,
          message: ARTICLE_SUCCESS,
          created: newArticle.rows[0].createdon,
          title: newArticle.rows[0].title,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export const updateArticle = async (req, res) => {
  try {
    const articleId = await req.params.id;
    const id = await req.token.payload.userId;
    const { title, article } = await req.body;

    const findArticle = await getOneArticleById(articleId, id);
    console.log('>>>>>', findArticle);
    if (findArticle === false) {
      return res.status(404).json({ status: 'error', message: ARTICLE_NOT_FOUND });
    }
    const edited = await editArticle(title, article, articleId, id);
    if (edited) {
      return res.status(200).json({
        status: 'success',
        data: {
          articleId: edited.rows[0].id,
          message: ARTICLE_SUCCESS,
          title: edited.rows[0].title,
          article: edited.rows[0].article,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export const destroyArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const id = req.token.payload.userId;
    const findArticle = await getOneArticleById(articleId, id);
    if (findArticle === false) {
      return res.status(404).json({ status: 'error', message: ARTICLE_NOT_FOUND });
    }
    const destroyed = await deleteArticle(articleId);
    if (destroyed) {
      return res.status(200).json({ status: 'success', message: DELETE_ARTICLE_SUCCESS });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export const fetchAllArticle = async (req, res) => {
  try {
    const findArticle = await getAllArticle();
    if (findArticle) {
      return res.status(200).json({
        status: ARTICLE_FETCH_SUCCESS,
        data: findArticle.rows,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};
