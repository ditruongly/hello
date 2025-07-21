require ("dotenv").config();
const express = require("express");
const path = require("path");
const { createServer } = require("http");
const usernameApi = require("./usernameApi");
const { auth, requiresAuth } = require("express-openid-connect");

const {
    APP_URL,
    ISSUER_BASE_URL,
    CLIENT_ID,
    SESSION_SECRET,
    PORT
} = require("./env-config");

const app = express();

app.use(
  auth({
    issuerBaseURL: ISSUER_BASE_URL,
    clientID: CLIENT_ID,
    baseURL: APP_URL,
    secret: SESSION_SECRET,
    auth0Logout: true,
    authRequired: false
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
    const json = await usernameApi.getUsername();
    res.render("welcome", { data: json });
  } catch (err) {
    console.error("Fehler in /welcome:", err);
    res.status(500).send("Fehler beim Rendern der Seite");
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

createServer(app).listen(PORT, () => {
    console.log(`WEB-APP hört auf Port ${PORT}`);
});
