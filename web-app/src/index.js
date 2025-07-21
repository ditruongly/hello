require ("dotenv").config();
const express = require("express");
const path = require("path");
const { createServer } = require("http");
const usernameApi = require("./usernameApi");

const {
    HOST,
    PORT
} = require("./env-config");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/welcome", async (req, res) => {
  try {
    const json = await usernameApi.getUsername();
    res.render("welcome", { data: json });
  } catch (err) {
    console.error("Fehler in /welcome:", err);
    res.status(500).send("Fehler beim Rendern der Seite");
  }
});

createServer(app).listen(PORT, () => {
    console.log(`WEB APP läuft auf: ${HOST}:${PORT}`);
});
