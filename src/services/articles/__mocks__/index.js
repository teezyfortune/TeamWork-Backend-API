import faker from 'faker';

export const article = {
  title: faker.name.firstName(),
  article: faker.name.jobTitle(),
};

export const article1 = {
  title: faker.name.firstName(),
  article: faker.name.jobTitle(),
};

export const emptySpace = {
  title: '',
  article: '',
};

export const correctcomment = {
  comment: 'ddbdjsddjdjd',
};

export const emptycomment = {
  comment: '',
};
export const User = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  gender: 'female',
  jobRole: faker.name.jobTitle(),
  department: faker.name.jobArea(),
  address: faker.address.city(),
};

export const signIn = {
  email: User.email,
  password: User.password,
};

export const adminSignIn = {
  email: 'gabteezy14@gmail.com',
  password: 'admin@$123',
};

// export const sign2 = {
//   email: 'devFortune14@gmail.com',
//   password: '@wesQ123bn',
// };

// export const invalidSignIn = {
//   email: 'gabteezy14@gmail.co.uk',
//   password: 'eezy123@',
// };
export const baseLogin = '/api/v1/auth/signin';
export const basesignUp = '/api/v1/auth/create-user';

export const baseUrl = '/api/v1/articles';

export const baseuPdate = '/api/v1/articles/1';
export const basedelete1 = '/api/v1/articles/1';
export const basedelete2 = '/api/v1/articles/200';
export const baseComment = '/api/v1/articles/2/comment';
export const baseFlag = '/api/v1/article/flag/2';

export const baseGeAll = '/api/v1/feed';
