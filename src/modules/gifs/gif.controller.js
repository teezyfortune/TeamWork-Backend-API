import { saveGifs, getOneGifById, deleteGif, getAllGif } from '../../services/gifs/gif.services';
import {
  SERVER_ERROR_MESSAGE,
  ERROR_MESSAGE,
  GIF_SUCCESS,
  GIF_FETCHED,
  GIF_NOT_FOUND,
  DELETED_GIF_SUCCESS,
} from '../../utils/constant';
import upload from '../../services/gifs/cloudinary';
import { dUrl } from '../../services/gifs/multer';

export const createGif = async (req, res) => {
  try {
    if (req.file) {
      const file = dUrl(req).content;
      const cloudUri = await upload(file);
      const gif = cloudUri.url;
      const { title } = req.body;
      const empid = req.token.payload.userId;
      const save = await saveGifs(empid, title, gif);
      if (save) {
        return res.status(201).json({
          status: 'success',
          data: {
            articleId: save.rows[0].id,
            message: GIF_SUCCESS,
            created: save.rows[0].createdon,
            title: save.rows[0].title,
            imageUrl: save.rows[0].imageurl,
          },
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: ERROR_MESSAGE, message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export const destroyGif = async (req, res) => {
  try {
    const gifId = req.params.id;
    const findGif = await getOneGifById(gifId);
    if (findGif === false) {
      return res.status(404).json({ status: 'success', message: GIF_NOT_FOUND });
    }
    const destroyed = await deleteGif(gifId);
    if (destroyed) {
      return res.status(200).json({ status: 'success', message: DELETED_GIF_SUCCESS });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export const fetchAllGif = async (req, res) => {
  try {
    const findGif = await getAllGif();
    if (findGif) {
      return res.status(200).json({
        status: GIF_FETCHED,
        data: findGif.rows[0],
      });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return false;
};
