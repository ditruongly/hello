import router from "./router";
import env from "./environment.js";

(async function () {
  const domain = env.AUTH0_DOMAIN;
  const clientId = env.CLIENT_ID;
  const redirect_uri = env.APP_URL;
  const audience = env.AUDIENCE;

  window.auth0Client = await auth0.createAuth0Client({
    domain,
    clientId,
    authorizationParams: {
      redirect_uri,
      audience: audience
    },
  });

  // handle user navigation
  window.addEventListener("hashchange", () => {
    router();
  });
  window.addEventListener("load", () => {
    // avoid calling router twice when handling redirect callback upon sign in
    if (!sessionStorage.getItem("reload")) {
      router();
      sessionStorage.setItem("reload", "true");
    }
  });

  //handle user reload of browser
  if (sessionStorage.getItem("reload")) {
    sessionStorage.setItem("reload", "true");
    await router();
  }
})();