const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//this is server side 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    io.emit("connection", function () { });
    //3. waiting !on! action "chat message" and emit(call)
    //action with "chat message" on client
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("disconnected", function () {});
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
