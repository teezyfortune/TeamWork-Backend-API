import faker from 'faker';

export const article = {
  title: faker.name.firstName(),
  article: faker.name.jobTitle(),
};

export const emptySpace = {
  title: '',
  article: '',
};

export const correctcomment = {
  comment: 'ddbdjdjdjd',
};

export const emptycomment = {
  comment: '',
};

export const signIn = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'teezy123@',
};

export const signComment = {
  email: 'devFortune14@gmail.com',
  password: '@wesQ123bn',
};

export const invalidSignIn = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'eezy123@',
};
export const baseLogin = '/api/v1/login';
export const baseUrl = '/api/v1/article';

export const baseuPdate = '/api/v1/article/40';
export const basedelete1 = '/api/v1/article/36';
export const basedelete2 = '/api/v1/article/200';
export const baseComment = '/api/v1/article/40/comment';
