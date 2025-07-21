require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(cors(
  // {origin: ORIGIN}
));

app.post("/username", (req, res) => {
  //res.set("Content-Type", "text/plain").send("Welt!");
  res.json({username: "Welt!"});
});

// HTTP-Server explizit erstellen und starten
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`API hört auf Port ${PORT}`);
});

