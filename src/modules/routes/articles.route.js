import express from 'express';
import { createArticle, updateArticle, destroyArticle } from '../articles/articles.controller';
import createComment from '../comments/article_comment.controller';
import { verifyMiddleWare } from '../../helpers/security';
import { validateArticle } from '../../middleware/validation';

const articleRoute = express.Router();

/**
 * @swagger
 *
 * /article:
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

articleRoute.post('/article', verifyMiddleWare, validateArticle, createArticle);

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
 *         description: Article successfully deleted.
 *       404:
 *         description: This article might have been deleted by you
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */

articleRoute.put('/article/:id', verifyMiddleWare, validateArticle, updateArticle);

/**
 * @swagger
 *
 * /article:
 *   delete:
 *     tags:
 *       - Employees can delete their article
 *     description: Employees can delete their
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: request
 *         required: true
 *         type: integr
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

articleRoute.delete('/article/:id', verifyMiddleWare, destroyArticle);

/**
 * @swagger
 *
 * /article:
 *   delete:
 *     tags:
 *       - Employees can delete their article
 *     description: Employees can delete their
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: request
 *         required: true
 *         type: integr
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

articleRoute.post('/article/:id/comment', verifyMiddleWare, createComment);

export default articleRoute;
