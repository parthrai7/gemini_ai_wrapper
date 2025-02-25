import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setChats((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
const API_BASE_URL = "https://your-backend-service.onrender.com"; // Replace with actual Render backend URL
const res = await axios.post(`${API_BASE_URL}/api/content`, { question: input });
      const botMessage = { role: "bot", text: res.data.result };
      setChats((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error fetching response:", err);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Parth's AI WRapper 🎤</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask something..." 
        />
        <button type="submit">Get Response</button>
      </form>

      <div className="chat-history">
        {chats.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.role}`}>
            <strong>{chat.role === "user" ? "You" : "AI"}:</strong> {chat.text}
          </div>
        ))}
      </div>

      {loading && <p className="loading">Generating response...</p>}
    </div>
  );
}

export default App;
