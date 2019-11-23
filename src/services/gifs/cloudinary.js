import cloudinary from 'cloudinary';
// import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = (gif) => cloudinary.uploader.upload(gif);
export default upload;
