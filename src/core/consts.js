const CONF = window.APP_CONF;

const DEVELOP = process.env.NODE_ENV !== 'production';

const {
  protocol: PROTOCOL,
  hostname: HOST,
  port,
} = DEVELOP
  ? {
    protocol: 'http:',
    hostname: '1.1.1.1',
    port: '',
  }
  : window.location;


const PORT = port ? `:${port}` : '';

const BASE_URL = `${PROTOCOL}//${HOST}${PORT}`;

export {
  BASE_URL,
  PROTOCOL,
  HOST,
  PORT,
  CONF,
};
