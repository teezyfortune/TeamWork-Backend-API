import faker from 'faker';

export const correctGif = {
  title: faker.name.title(),
  gif: 'C:/Users/HP/baby.jfif',
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

export const sign2 = {
  email: 'devFortune14@gmail.com',
<<<<<<< HEAD
  password: '@wesQ123bn',
=======
  password: 'teezy123@',
>>>>>>> fb725fdb41236ea1fdc5bca970ea12cd11c01238
};

export const invalidUser = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'eezy123@',
};
export const gifLogin = '/api/v1/login';
export const gifUrl = '/api/v1/gif';

<<<<<<< HEAD
export const basedelete1 = '/api/v1/gif/5';
export const basedelete2 = '/api/v1/gf/200';
export const baseComment = '/api/v1/article/8/comment';
=======
export const basedelete1 = '/api/v1/gif/1';
export const basedelete2 = '/api/v1/gf/200';
export const baseComment = '/api/v1/article/1/comment';
>>>>>>> fb725fdb41236ea1fdc5bca970ea12cd11c01238
