import faker from 'faker';

export const User = {
  firstName: 'kola',
  lastName: 'laide',
  email: faker.internet.email(),
  password: faker.internet.password(),
  gender: 'female',
  jobRole: faker.name.jobTitle(),
  department: 'backend',
  address: faker.address.city(),
};

export const emptySpace = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: ' ',
  gender: ' ',
  jobRole: faker.name.jobTitle(),
  department: faker.name.jobArea(),
  address: faker.address.city(),
};

export const unDefined = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: '',
  gender: 'female',
  jobRole: faker.name.jobTitle(),
  department: faker.name.jobArea(),
  address: faker.address.city(),
};

export const invalidEmail = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: 'gaba123#.com',
  password: faker.internet.password(),
  gender: 'male',
  jobRole: faker.name.jobTitle(),
  department: faker.name.jobArea(),
  address: faker.address.city(),
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
export const baseUrl = '/api/v1/signup';
