let auth0Client = null;

async function configureClient() {
  const { createAuth0Client } = window;

  auth0Client =  await auth0.createAuth0Client ({
    domain: "dev-mg0ex140z8dtk6rb.eu.auth0.com",
    client_id: "r0drMyNlgYLx39YR8FQvX4z5GsE8Ka5Hg0cNk5Pk_5SnFt_dKWsJFw-QVEJiP_g4",
    authorizationParams: {
      redirect_uri: window.env.APP_URL,
    },
  });
}

function getClient() {
  return auth0Client;
}

async function login() {
  await auth0Client.loginWithRedirect();
}

async function logout() {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.env.APP_URL,
    },
  });
}

async function handleRedirect() {
  if (
    window.location.search.includes("code=") &&
    window.location.search.includes("state=")
  ) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.env.APP_URL);
  }
}

async function isAuthenticated() {
  return await auth0Client.isAuthenticated();
}

async function getUser() {
  return await auth0Client.getUser();
}

export {
  configureClient,
  getClient,
  login,
  logout,
  handleRedirect,
  isAuthenticated,
  getUser,
};