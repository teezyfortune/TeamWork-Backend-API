import { saveGifs } from '../../services/gifs/gif.services';
import { SERVER_ERROR_MESSAGE, ERROR_MESSAGE, GIF_SUCCESS } from '../../utils/constant';
import upload from '../../services/gifs/cloudinary';
import { dUrl } from '../../services/gifs/multer';

const createGif = async (req, res) => {
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

export default createGif;
