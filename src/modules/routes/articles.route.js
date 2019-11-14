import express from 'express';
import { createArticle, updateArticle, destroyArticle } from '../articles/articles.controller';
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
 *       200:
 *         description: Article updated successfully.
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
 *       - Employees can delete an article.
 *     description: Employees can delete an article .
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
 *     responses:
 *       200:
 *         description: Article updated successfully.
 *       404:
 *         description: This article might have been deleted by you
 *       500:
 *         description: Server error
 */
articleRoute.delete('/article/:id', verifyMiddleWare, destroyArticle);

export default articleRoute;
