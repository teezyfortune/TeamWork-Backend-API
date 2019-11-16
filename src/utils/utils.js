import 'dotenv/config';

export const logger = (params) => {
  const log = console;
  log.table(params);
};

export const getEnv = (variables, defaultVlaues) => {
  const value = process.env[variables] || defaultVlaues;
  return value;
};
