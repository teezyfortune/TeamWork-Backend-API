import cloudinary from 'cloudinary';
import { saveGifs } from '../../services/gifs/gif.services';
import { SERVER_ERROR_MESSAGE, ERROR_MESSAGE, GIF_SUCCESS } from '../../utils/constant';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  secret_key: process.env.SECRET_KEY,
});

const createGif = async (req, res) => {
  try {
    const { title, gif } = req.body;
    const empid = req.token.payload.userId;
    const cloudGifUrl = await cloudinary.v2.uploader.upload(gif);
    const imageUrl = cloudGifUrl.url;
    const save = await saveGifs(empid, title, imageUrl);
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
  } catch (error) {
    return res.status(500).json({ status: ERROR_MESSAGE, message: SERVER_ERROR_MESSAGE });
  }
  return false;
};

export default createGif;
