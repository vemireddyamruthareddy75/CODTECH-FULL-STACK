const socket = io();

function sendMessage(){

    const input =
    document.getElementById("messageInput");

    const message = input.value;

    socket.emit("chat message", message);

    input.value = "";
}

socket.on("chat message", (msg) => {

    const item =
    document.createElement("li");

    item.textContent = msg;

    document
    .getElementById("messages")
    .appendChild(item);

});