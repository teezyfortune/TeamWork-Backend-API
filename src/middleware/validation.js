import validator from 'validator';

import {
  REQUIRED,
  EMAIL_MESSAGE,
  PASSWORD,
  NO_SPACE,
  PASSWORD_LENGTH,
  USE_STRING_MESSAGE,
  EMPTY_TITLE_MESSAGE,
  EMPTY_ARTICLE_MESSAGE,
  EMPTY_COMMENT_MESSAGE,
  EMPTY_GIF_MESSAGE,
} from './validation_message';
import { SERVER_ERROR_MESSAGE } from '../utils/constant';

export const validateUserInput = (request, response, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address,
    } = request.body;
    const regEx = /[^a-z/d]/i;
    if (!firstName || !lastName || !email || !gender || !jobRole || !department || !address) {
      return response.status(422).json({ status: 'error', message: REQUIRED });
    }

    if (firstName && typeof firstName !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (regEx.test(firstName)) {
      return response
        .status(422)
        .json({ status: 'error', message: `${USE_STRING_MESSAGE} for ${firstName} ` });
    }

    if (regEx.test(lastName)) {
      return response
        .status(422)
        .json({ status: 'error', message: `${USE_STRING_MESSAGE} for ${lastName} ` });
    }

    if (lastName && typeof lastName !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (email && typeof email !== 'string') {
      return response.status(422).json({ status: 'error', message: EMAIL_MESSAGE });
    }

    if (email && !validator.isEmail(email)) {
      return response.status(422).json({ status: 400, message: EMAIL_MESSAGE });
    }

    if (validator.isEmpty(password) === true) {
      return response.status(422).json({ status: 'error', message: PASSWORD });
    }

    if (password && password.includes(' ')) {
      return response
        .status(400)
        .json({ status: 'error', message: `${NO_SPACE}$ for ${password}` });
    }

    if (password.length < 8) {
      return response.status(422).json({ status: 'error', message: PASSWORD_LENGTH });
    }

    if (gender && typeof gender !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (gender && gender.includes(' ')) {
      return response.status(422).json({ status: 'error', message: `${NO_SPACE}$ for ${gender} ` });
    }
    if (regEx.test(gender) === true) {
      return response
        .status(422)
        .json({ status: 'error', message: `${USE_STRING_MESSAGE} for ${gender} ` });
    }

    if (address && typeof address !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (department && typeof department !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (jobRole && typeof jobRole !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }
  } catch (error) {
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return next();
};

export const validateUserProfile = (request, response, next) => {
  try {
    const { firstName, lastName, gender, jobRole, department, address } = request.body;
    const regEx = /[^a-z/d]/i;

    if (firstName && typeof firstName !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (regEx.test(firstName)) {
      return response
        .status(422)
        .json({ status: 'error', message: `${USE_STRING_MESSAGE} for ${firstName} ` });
    }

    if (regEx.test(lastName)) {
      return response
        .status(422)
        .json({ status: 'error', message: `${USE_STRING_MESSAGE} for ${lastName} ` });
    }

    if (lastName && typeof lastName !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (gender && typeof gender !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (gender && gender.includes(' ')) {
      return response.status(422).json({ status: 'error', message: `${NO_SPACE}$ for ${gender} ` });
    }
    if (regEx.test(gender) === true) {
      return response
        .status(422)
        .json({ status: 'error', message: `${USE_STRING_MESSAGE} for ${gender} ` });
    }

    if (address && typeof address !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (department && typeof department !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }

    if (jobRole && typeof jobRole !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }
  } catch (error) {
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return next();
};

export const validateLogin = (request, response, next) => {
  const { username, password } = request.body;

  if (username && !validator.isEmail(username)) {
    return response.status(422).json({ status: 'error', message: EMAIL_MESSAGE });
  }

  if (validator.isEmpty(password) === true) {
    return response.status(422).json({ status: 'error', message: PASSWORD });
  }

  if (password && password.includes(' ')) {
    return response.status(400).json({ status: 'error', message: `${NO_SPACE}$ for ${password}` });
  }

  if (password.length < 8) {
    return response.status(422).json({ status: 'error', message: PASSWORD_LENGTH });
  }
  return next();
};

export const validateArticle = async (request, response, next) => {
  try {
    const { title, article } = request.body;
    if (validator.isEmpty(title) === true) {
      return response.status(422).json({ status: 'error', message: EMPTY_TITLE_MESSAGE });
    }

    if (validator.isEmpty(article) === true) {
      return response.status(422).json({ status: 'error', message: EMPTY_ARTICLE_MESSAGE });
    }
  } catch (error) {
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return next();
};

export const validateComment = async (request, response, next) => {
  try {
    const { comment } = request.body;
    if (validator.isEmpty(comment) === true) {
      return response.status(422).json({ status: 'error', message: EMPTY_COMMENT_MESSAGE });
    }
  } catch (error) {
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return next();
};

export const validateGif = async (request, response, next) => {
  try {
    const { title, gif } = request.body;
    if (validator.isEmpty(title) === true) {
      return response
        .status(422)
        .json({ status: 'error', message: `${EMPTY_GIF_MESSAGE} ${title}` });
    }
    if (title && typeof title !== 'string') {
      return response.status(422).json({ status: 'error', message: USE_STRING_MESSAGE });
    }
    if (validator.isEmpty(gif) === true) {
      return response.status(422).json({ status: 'error', message: `${EMPTY_GIF_MESSAGE} ${gif}` });
    }
  } catch (error) {
    console.log('>>><<>>>', error)
    return response.status(500).json({ status: 'error', message: SERVER_ERROR_MESSAGE });
  }
  return next();
};
