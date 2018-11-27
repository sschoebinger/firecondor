const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, { serveClient: false });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/asdf.html");
});

app.post("/sendPush", (req, res) => {
  io.emit("wdw", true);
  setTimeout(() => io.emit("wdw", false), 5000);
  res.send();
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(
    `The server is running: http://localhost:${process.env.PORT || 4000}`
  );
});
