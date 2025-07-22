(function (window) {
  const APP_URL = process.env.APP_URL;
  const API_URL = process.env.API_URL;
  const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
  const CLIENT_ID = process.env.CLIENT_ID;
  const AUDIENCE = process.env.AUDIENCE;

  window.env = {
    APP_URL,
    API_URL,
    AUTH0_DOMAIN,
    CLIENT_ID,
    AUDIENCE
  };
})(window);
