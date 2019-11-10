import 'dotenv/config';

export const logger = (params) => {
  const log = console;
  log.table(params);
};

export const getEnv = (variables, defaultVlaues) => {
  const value = process.env[variables] || defaultVlaues;
  return value;
};

export const Response = (response, resObject) => {
  const { status, message, data } = resObject;
  if (status >= 300) {
    return response.status(status).json({ status, message });
  }
  return response.status(status).json({ status, message, data });
};
