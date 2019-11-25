import faker from 'faker';

export const Admin = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  gender: 'female',
  jobRole: faker.name.jobTitle(),
  department: faker.name.jobArea(),
  address: faker.address.city(),
  isAdmin: true,
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
  isAdmin: false,
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
export const signup = '/api/v1/auth/signup';

export const baseGet = '/api/v1/emloyees';
