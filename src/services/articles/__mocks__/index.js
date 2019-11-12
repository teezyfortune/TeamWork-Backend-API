import faker from 'faker';

export const article = {
  title: faker.name.firstName(),
  article: faker.name.jobTitle(),
};

export const emptySpace = {
  title: '',
  article: '',
};

export const signIn = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'teezy123@',
};

export const invalidSignIn = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'eezy123@',
};
export const baseLogin = '/api/v1/login';
export const baseUrl = '/api/v1/article';
