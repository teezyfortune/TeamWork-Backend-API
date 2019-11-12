import express from 'express';
import { createArticle } from '../articles/articles.controller';
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

export default articleRoute;
