import faker from 'faker';

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
  jobRole: faker.name.jobTitle(),
  department: faker.name.jobArea(),
  address: faker.address.city(),
};

export const signIn = {
  email: User.email,
  password: User.password,
};

export const invalidSignIn = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'bbbbbjbb',
};
export const baseLogin = '/api/v1/auth/signin';
export const baseUrl = '/api/v1/auth/signup';
export const baseUpdate = '/api/v1/auth/profile';
export const baseProfile = '/api/v1/auth/view-profile';

export const updateProfile = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  jobRole: faker.name.jobTitle(),
  gender: 'male',
  department: faker.name.jobArea(),
  address: faker.address.city(),
};
