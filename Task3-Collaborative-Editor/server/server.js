const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

let documentContent = "";

io.on("connection", (socket) => {

    socket.emit("load-document", documentContent);

    socket.on("send-changes", (data) => {

        documentContent = data;

        socket.broadcast.emit(
            "receive-changes",
            data
        );
    });

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});