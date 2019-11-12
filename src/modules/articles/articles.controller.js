import { saveArticle, getOneArticle } from '../../services/articles/article.services';
import { ARTICLE_CONFLICTS, ARTICLE_SUCCESS, SERVER_ERROR_MESSAGE } from '../../utils/constant';

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

export const updateArticle = async () => {};
