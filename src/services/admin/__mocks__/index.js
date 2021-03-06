import faker from 'faker';

export const Admin = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  gender: 'female',
  jobRole: 'admin',
  department: faker.name.jobArea(),
  address: faker.address.city(),
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
export const adminSignIn = {
  email: 'gabteezy14@gmail.com',
  password: 'admin@$123',
};

export const signIn = {
  email: Admin.email,
  password: Admin.password,
};

export const sign2 = {
  email: 'devFortune14@gmail.com',
  password: 'admin@$123',
};

export const emptyCredentials = {
  email: '',
  password: '',
};

export const baseLogin = '/api/v1/auth/signin';
export const signup = '/api/v1/auth/create-user';

export const baseGet = '/api/v1/employees';
