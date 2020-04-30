import {
  saveArticle,
  getOneArticle,
  editArticle,
  deleteArticle,
  getAllArticle,
  updateFlagStatus,
  flagInappropriate,
  flagByOnePerson,
  getOneArticleByUserId,
} from '../../services/articles/article.services';
import {
  ARTICLE_CONFLICTS,
  ARTICLE_SUCCESS,
  SERVER_ERROR_MESSAGE,
  ARTICLE_NOT_FOUND,
  DELETE_ARTICLE_SUCCESS,
  ARTICLE_FETCH_SUCCESS,
  EDIT_NOT_ALLOWED,
  ARTICLE_FLAGGED,
  FLAGGED_EXIST,
  DOES_NOT_EXIST,
  DELETE_NOT_ALLOWED,
} from '../../utils/constant';

export const createArticle = async (req, res) => {
  try {
    const { title, article } = await req.body;
    const id = req.token.payload.userId;
    const find = await getOneArticleByUserId(id, article);
    if (find) {
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
    const { userId } = await req.token.payload;
    const { title, article } = await req.body;

    const find = await getOneArticle(articleId, userId);

    if (!find) {
      return res.status(404).json({ status: 'error', message: ARTICLE_NOT_FOUND });
    }

    const { empid } = find.rows[0];
    if (userId !== empid) {
      return res.status(401).json({ status: 'error', message: EDIT_NOT_ALLOWED });
    }
    const edited = await editArticle(title, article, articleId, userId);
    if (edited) {
      return res.status(200).json({
        status: 'success',
        data: {
          message: ARTICLE_SUCCESS,
          articleId: edited.rows[0].id,
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
    const find = await getOneArticle(articleId, id);
    if (!find) {
      return res.status(404).json({ status: 'error', message: ARTICLE_NOT_FOUND });
    }
    const { empid } = find.rows[0];
    if (id !== empid) {
      return res.status(404).json({ status: 'error', message: DELETE_NOT_ALLOWED });
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

export const flagArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const empId = req.token.payload.userId;
    const find = await getOneArticle(articleId, empId);

    if (!find) {
      return res.status(404).json({
        status: 'error',
        message: DOES_NOT_EXIST,
      });
    }

    // checks if article already exist
    const flagExist = await flagByOnePerson(articleId, empId);
    if (flagExist) {
      return res.status(409).json({
        status: 'error',
        message: FLAGGED_EXIST,
      });
    }

    // Flags an article, i.e change the flag from false to true
    const inappropriate = await flagInappropriate(articleId, empId);
    const updateFlag = await updateFlagStatus(articleId);

    if (inappropriate) {
      if (updateFlag) {
        return res.status(201).json({
          status: ARTICLE_FLAGGED,
          flag: inappropriate.rows[0],
          data: updateFlag.rows[0],
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};
