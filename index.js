const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { serveClient: false });

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/sendPush", (req, res) => {
  io.emit("wdw", req.body);
  setTimeout(() => io.emit("wdw", undefined), 5000);
  res.send();
});


server.listen(process.env.PORT || 4000);
