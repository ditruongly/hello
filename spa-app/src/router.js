import Error404 from "./error404.js";
import Home from "./home.js";
import Welcome from "./welcome.js";

const routes = {
  "/": Home,
  welcome: Welcome,
};

const content = document.getElementById("content");

const router = async () => {
  if (new URLSearchParams(window.location.search).has("code")) {
    await window.auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "#welcome");
  }

  if (await window.auth0Client.isAuthenticated()) {
    window.user = await window.auth0Client.getUser();
  }

  const request = location.hash.slice(1).toLowerCase() || "/";
  const page = routes[request] || Error404;

  if (await page.allowAccess()) {
    content.innerHTML = await page.render();
    await page.postRender();
  } else {
    window.history.replaceState({}, document.title, "/");
  }
};

export default router;
