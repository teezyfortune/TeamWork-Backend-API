import articleComment from '../../services/articles/comment';
import { getOneArticleById } from '../../services/articles/article.services';
import { SERVER_ERROR_MESSAGE, ARTICLE_NOT_FOUND, COMMENT_SUCCESS } from '../../utils/constant';

const createComment = async (req, res) => {
  try {
    const { comment } = await req.body;
    const articleId = await req.params.id;
    console.log('>>>userId', articleId);
    const id = await req.token.payload.userId;
    console.log('>>>userId', id);
    const findArticle = await getOneArticleById(articleId, id);
    console.log('>>>article', findArticle);
    if (findArticle.rowCount === 0) {
      return res.status(404).json({ status: 'error', message: ARTICLE_NOT_FOUND });
    }
    const { title, article } = findArticle.rows[0];
    const reply = await articleComment(articleId, id, title, article, comment);
    console.log('>>>reply', reply);
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
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export default createComment;
