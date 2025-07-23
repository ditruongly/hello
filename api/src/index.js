require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const app = express();
const PORT = process.env.PORT;

app.use(cors(
  // {origin: ORIGIN}
));

app.use(auth());

app.post("/username", requiredScopes("read:username"), (req, res) => {
  //res.set("Content-Type", "text/plain").send("Welt!");
  res.json({username: "Welt"});
});

// HTTP-Server explizit erstellen und starten
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`API hört auf Port ${PORT}`);
});

