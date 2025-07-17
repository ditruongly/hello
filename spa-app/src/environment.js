(function (window) {
  const APP_URL = process.env.APP_URL;
  const API_URL = process.env.API_URL;

  window.env = {
    APP_URL,
    API_URL,
  };
})(window);
