import faker from 'faker';

export const correctGif = {
  title: faker.name.title(),
  gif: faker.image.avatar(),
};

export const correctGif1 = {
  title: faker.name.title(),
  gif: faker.image.avatar(),
};

export const emptySpace = {
  title: 'jbjbbfjf jf',
  gif: '',
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


export const invalidUser = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'eezy123@',
};
export const gifLogin = '/api/v1/auth/signin';
export const gifUrl = '/api/v1/gifs';
export const basesignUp = '/api/v1/auth/create-user';

export const basedelete1 = '/api/v1/gifs/1';
export const basedelete2 = '/api/v1/gifs/200';
export const baseComment = '/api/v1/gifs/2/comment';
