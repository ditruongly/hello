require ("dotenv").config();
const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { auth, requiresAuth } = require("express-openid-connect");
const env = require("./environment");
const usernameApi = require("./usernameApi");

const app = express();

app.use(
  auth({
    issuerBaseURL: env.ISSUER_BASE_URL,
    clientID: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    baseURL: env.APP_URL,
    secret: env.SESSION_SECRET,
    auth0Logout: true,
    authRequired: false,
    authorizationParams: {
      response_type: 'code',
      audience: env.AUDIENCE,
      scope: 'openid profile email read:username'
    }
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/welcome", requiresAuth(), async (req, res) => {
  try {
    const accessToken = req.oidc?.accessToken?.access_token;
    if (!accessToken) {
      throw new Error("Access Token fehlt – API-Zugriff nicht möglich.");
    }

    const orgId = req.oidc.idTokenClaims?.org_id;
    console.log(`Organisation: ${orgId}`);

    const userData = await usernameApi.getUsername(accessToken);

    res.render("welcome", {
      data: userData
    });
  } catch (error) {
    console.error("Fehler in /welcome:", error.message);
    res.status(500).send("Es gab ein Problem beim Laden der Willkommensseite.");
  }
});


app.get("/user", requiresAuth(), async (req, res) => {
  res.render("user", {
    user: req.oidc?.user,
    id_token: req.oidc?.idToken,
    access_token: req.oidc?.accessToken,
    refresh_token: req.oidc?.refreshToken,
  });
});

createServer(app).listen(env.PORT, () => {
    console.log(`WEB-APP hört auf Port ${env.PORT}`);
});
