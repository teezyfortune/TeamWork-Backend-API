import express from 'express';
import {
  createArticle,
  updateArticle,
  destroyArticle,
  fetchAllArticle,
  flagArticle,
} from './articles.controller';
import { getSpecificArticle } from '../../services/articles/article.services';
import articleComment from '../comments/article_comment.controller';
import { verifyMiddleWare } from '../../helpers/security';
import { validateArticle, validateComment } from '../../middleware/validation';

const articleRoute = express.Router();

/**
 * @swagger
 *
 * /articles:
 *   post:
 *     tags:
 *       - Employees create an article.
 *     description: Employees can write or create articls .
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: formData
 *         required: true
 *         type: string
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: article
 *         in: formData
 *         required: true
 *         type: string
 *       - name: flag
 *         in: formData
 *         required: true
 *         type: Boolean
 *     responses:
 *       201:
 *         description: Article created successfully.
 *       409:
 *         description: This article already, please create a new article
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */

articleRoute.post('/articles', verifyMiddleWare, validateArticle, createArticle);

/**
 * @swagger
 *
 * /article:
 *   put:
 *     tags:
 *       - Employees update their article.
 *     description: Employees can edit or update their articls .
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: request
 *         required: true
 *         type: integer
 *       - name: articleId
 *         in: request
 *         required: true
 *         type: string
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: article
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Article successfully deleted
 *       404:
 *         description: This article might have been deleted by you
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */

articleRoute.patch('/articles/:id', verifyMiddleWare, validateArticle, updateArticle);

/**
 * @swagger
 *
 * /article/:articleId:
 *   delete:
 *     tags:
 *       - Employees can delete their article
 *     description: Employees can delete their
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: request
 *         required: true
 *         type: integer
 *       - name: id
 *         in: request
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Article updated successfully.
 *       404:
 *       500:
 *         description: Server error
 */

articleRoute.delete('/articles/:id', verifyMiddleWare, destroyArticle);

/**
 * @swagger
 *
 * /article/:id/comment:
 *   post:
 *     tags:
 *       - Employees can comment on articles
 *     description: Employees can comment on other colleague article.
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: request
 *         required: true
 *         type: integer
 *       - name: articleId
 *         in: request
 *         required: true
 *         type: integer
 *       - name: comment
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Article successfully deleted.
 *       404:
 *         description: This article might have been deleted by you
 *       401:
 *         description: invalid authorization or not loggedIn
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */

articleRoute.post('/articles/:id/comment', verifyMiddleWare, validateComment, articleComment);

/**
 * @swagger
 *
 * /feed:
 *   get:
 *     tags:
 *       - Employees can view all article
 *     description: Employees can view all article showing most recently posted articles.
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: request
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: success.
 *       500:
 *         description: Server error
 */

articleRoute.get('/feed', verifyMiddleWare, fetchAllArticle);

/**
 * @swagger
 *
 * /article/:id:
 *   get:
 *     tags:
 *       - Employees can view an article
 *     description: Employees can view a specific article.
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: request
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: success.
 *       500:
 *         description: Server error
 */

articleRoute.get('/article/:id', verifyMiddleWare, getSpecificArticle);

/**
 * @swagger
 *
 * /article/flag/:id:
 *   post:
 *     tags:
 *       - flag an article
 *     description: Employee can flag an article as inappropriate;.
 *       - application/json
 *     parameters:
 *       - name: empid
 *         in: request
 *         required: true
 *         type: integer
 *       - name: articleId
 *         in: request
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: success.
 *       500:
 *         description: Server error
 */

articleRoute.post('/article/flag/:id', verifyMiddleWare, flagArticle);

export default articleRoute;
