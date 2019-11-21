import express from 'express';
import { verifyMiddleWare } from '../../helpers/security';
import { multerUploads } from '../../services/gifs/multer';
import { createGif, destroyGif, fetchAllGif } from '../gifs/gif.controller';

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
 *       - Employees can delete a gif.
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
gifRoute.get('/feeds', verifyMiddleWare, fetchAllGif);

export default gifRoute;
