import express from 'express';
import { createGif, destroyGif } from '../gifs/gif.controller';
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
gifRoute.post('/gif', verifyMiddleWare, validateGif, createGif);

/**
 * @swagger
 *
 * /gif:
 *   post:
 *     tags:
 *       - Employees .
 *     description: Employees can delete a gif .
 *     responses:
 *       201:
 *         description: Gif successfully created
 *       422:
 *         description: Validation Error
 *       500:
 *         description: Server error
 */

gifRoute.delete('/gif/:id', verifyMiddleWare, destroyGif);

export default gifRoute;
