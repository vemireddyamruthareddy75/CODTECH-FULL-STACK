 import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {

  const [text, setText] = useState("");

  useEffect(() => {

    socket.on("load-document", (data) => {
      setText(data);
    });

    socket.on("receive-changes", (data) => {
      setText(data);
    });

  }, []);

  const handleChange = (e) => {

    setText(e.target.value);

    socket.emit(
      "send-changes",
      e.target.value
    );
  };

  return (
    <div style={{padding:"20px"}}>

      <h1>Collaborative Notes Editor</h1>

      <textarea
        rows="20"
        cols="80"
        value={text}
        onChange={handleChange}
      />

    </div>
  );
}

export default App;