import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const socket = io.connect("http://localhost:3001");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (name && message)
      socket.emit("send_message", { name: name, message: message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((oldValue) => [...oldValue, data]);
    });
  }, [socket]);

  return (
    <div className='container'>
      <div className='chat-container'>
        <div className='chat-messages'>
          {messages &&
            messages.map((message, index) => (
              <div key={index}>
                <p>Nome: {message?.name}</p>
                <p>Mensagem: {message?.message}</p>
                <hr />
              </div>
            ))}
        </div>
        <div className='chat-buttons'>
          <form action='submit' onSubmit={handleSendMessage}>
            <div className='chat-field'>
              <label htmlFor='name'>Nome</label>
              <br />
              <input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='chat-field'>
              <label htmlFor='message'>Mensagem</label>
              <br />
              <textarea
                id='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type='submit'>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

