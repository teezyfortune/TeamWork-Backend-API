import faker from 'faker';

export const correctGif = {
  title: faker.name.title(),
  article: faker.name.image(),
};

export const emptySpace = {
  title: '',
  gif: '',
};

export const correctcomment = {
  comment: 'ddbdjsddjdjd',
};

export const emptycomment = {
  comment: '',
};

export const gifSignIn = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'teezy123@',
};

export const signComment = {
  email: 'devFortune14@gmail.com',
  password: '@wesQ123bn',
};

export const invalidUser = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'eezy123@',
};
export const gifLogin = '/api/v1/login';
export const gifUrl = '/api/v1/gif';

export const basedelete1 = '/api/v1/gif/5';
export const basedelete2 = '/api/v1/gf/200';
export const baseComment = '/api/v1/article/8/comment';
