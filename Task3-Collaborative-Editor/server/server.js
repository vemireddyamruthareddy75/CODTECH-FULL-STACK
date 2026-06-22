require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const Document = require("./models/Document");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

io.on("connection", async (socket) => {

    console.log("User Connected");

    let doc = await Document.findOne();

    if (!doc) {

        doc = await Document.create({
            content: ""
        });
    }

    socket.emit(
        "load-document",
        doc.content
    );

    socket.on("send-changes", async (data) => {

        let document = await Document.findOne();

        if (!document) {

            document = await Document.create({
                content: data
            });

        } else {

            document.content = data;

            await document.save();
        }

        socket.broadcast.emit(
            "receive-changes",
            data
        );
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });

});

server.listen(process.env.PORT, () => {
    console.log(
        `Server running on port ${process.env.PORT}`
    );
});