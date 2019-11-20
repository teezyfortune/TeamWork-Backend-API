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
  email: 'gabteezy14@gmail.co.uk',
  password: 'teezy123@',
};

export const invalidSignIn = {
  email: 'gabteezy14@gmail.co.uk',
  password: 'eezy123@',
};
export const baseLogin = '/api/v1/login';
export const baseUrl = '/api/v1/signup';

export const usertoken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6NSwiZW1haWwiOiJGb3J0dW5lMTRAZ21haWwuY29tIn0sImlhdCI6MTU3NDIzNDU0MCwiZXhwIjoxNTc2ODI2NTQwLCJpc3MiOiJBdXRob3JpemF0aW9uL1Jlc291cmNlL1RlYW1Xb3JrIiwic3ViIjoiQXV0aGVudGljYXRpb24gQmVhcmVyIChkZXZGb3J0dW5lKSJ9.ds5A2ZdgYHT_exkmqzZNPnVwR2T-jVbSiHNoc2EVXDk';

export const adminToken =
  ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6MSwiZW1haWwiOiJnYWJ0ZWV6eTE0QGdtYWlsLmNvLnVrIn0sImlhdCI6MTU3NDI0ODIwNywiZXhwIjoxNTc2ODQwMjA3LCJpc3MiOiJBdXRob3JpemF0aW9uL1Jlc291cmNlL1RlYW1Xb3JrIiwic3ViIjoiQXV0aGVudGljYXRpb24gQmVhcmVyIChkZXZGb3J0dW5lKSJ9.5jjx-ywtKjARB7lMzt5OEvZIGDLGKN3UHQOqGbBF_g8';

export const invAlidSignIn =
  'Bearer I1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6NSwiZW1haWwiOiJGb3J0dW5lMTRAZ21haWwuY29tIn0sImlhdCI6MTU3NDIzNDU0MCwiZXhwIjoxNTc2ODI2NTQwLCJpc3MiOiJBdXRob3JpemF0aW9uL1Jlc291cmNlL1RlYW1Xb3JrIiwic3ViIjoiQXV0aGVudGljYXRpb24gQmVhcmVyIChkZXZGb3J0dW5lKSJ9.ds5A2ZdgYHT_exkmqzZNPnVwR2T-jVbSiHNoc2EVXDk';

export const updateProfile = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  jobRole: faker.name.jobTitle(),
  department: faker.name.jobArea(),
  address: faker.address.city(),
};
