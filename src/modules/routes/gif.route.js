import express from 'express';
import { createGif, destroyGif, fetchAllGif } from '../gifs/gif.controller';
import { getSpecificGif } from '../../services/gifs/gif.services';
import { verifyMiddleWare } from '../../helpers/security';
import { multerUploads } from '../../services/gifs/multer';
import gifComment from '../comments/gif_comment';
import { validateComment } from '../../middleware/validation';

const gifRoute = express.Router();

/**
 * @swagger
 *
 * /gif:
 *   post:
 *     tags:
 *       - Employees can post a gif.
 *     description: Employees can upload a gif .
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: gif
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Gif successfully created
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */
gifRoute.post('/gif', verifyMiddleWare, multerUploads, createGif);

/**
 * @swagger
 *
 * /gif:
 *   post:
 *     tags:
 *       - Employees .
 *     description: Employees can delete a gif .
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: request parameter
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Gif successfully created
 *       500:
 *         description: Server error
 */

gifRoute.delete('/gif/:id', verifyMiddleWare, destroyGif);

/**
 * @swagger
 *
 * /gif:
 *   post:
 *     tags:
 *       - Employees
 *     description: Employees can get all gif .
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: Server error
 */
gifRoute.get('/gif', verifyMiddleWare, fetchAllGif);


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

gifRoute.post('/gif/:id/comment', verifyMiddleWare, validateComment, gifComment);



/**
 * @swagger
 *
 * /gif:
 *   post:
 *     tags:
 *       - Employees
 *     description: Employees can get specific gif .
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: Server error
 */
gifRoute.get('/gif/:id', verifyMiddleWare, getSpecificGif);

/**
 * @swagger
 *
 * /article/:id/comment:
 *   post:
 *     tags:
 *       - Employees
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

gifRoute.post('/gif/:id/comment', verifyMiddleWare, validateComment, gifComment);

export default gifRoute;
