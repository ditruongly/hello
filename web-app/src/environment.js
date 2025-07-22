const APP_URL = process.env.APP_URL;
const API_URL = process.env.API_URL;
const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT;
const AUDIENCE = process.env.AUDIENCE;

const env = {
  APP_URL,
  API_URL,
  ISSUER_BASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET,
  PORT,
  AUDIENCE
};

module.exports = env;