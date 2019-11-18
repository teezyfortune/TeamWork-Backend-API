import express from 'express';
import { createGif, fetchAllGif } from '../gifs/gif.controller';
import { verifyMiddleWare } from '../../helpers/security';
import { validateGif } from '../../middleware/validation';

const gifRoute = express.Router();

/**
 * @swagger
 *
 * /gif:
 *   post:
 *     tags:
 *       - Employees can post a gif.
 *     description: Employees can write or create articls .
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
gifRoute.post('/gif', verifyMiddleWare, validateGif, createGif);

/**
 * @swagger
 *
 * /gif:
 *   post:
 *     tags:
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

// gifRoute.delete('/gif/:id', verifyMiddleWare, destroyGif);

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
 *         description: Gif successfully created
 *       500:
 *         description: Server error
 */
gifRoute.get('/feed', verifyMiddleWare, fetchAllGif);

export default gifRoute;
