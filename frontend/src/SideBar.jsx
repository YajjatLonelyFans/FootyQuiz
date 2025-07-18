
import React, { useState, useEffect } from 'react';
import socket from './socket';
import { FaFutbol, FaUsers, FaHashtag } from 'react-icons/fa';

export default function SideBar({ name, room }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("chatMessage", ({ name, message }) => {
      console.log("Client received chatMessage:", name, message);
      setMessages(prev => [...prev, { name, message }]);
    });

    return () => socket.off("chatMessage");
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { room, name, message });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <aside className="flex flex-col h-full w-full lg:w-[400px] bg-[#14213d] text-white p-6 shadow-2xl border-l border-[#1f2937] rounded-none lg:rounded-l-2xl transition-all duration-300 min-h-0 overflow-hidden">
      <div className="mb-8 flex flex-col items-center gap-2">
        <FaFutbol className="text-3xl text-yellow-400 mb-1" />
        <h2 className="text-2xl font-bold tracking-wide text-white drop-shadow">Match Info</h2>
        <div className="flex items-center gap-2 text-lg text-white/80">
          <FaUsers className="text-blue-300" /> <span className="font-medium">Player:</span> <span>{name}</span>
        </div>
        <div className="flex items-center gap-2 text-lg text-white/80">
          <FaHashtag className="text-yellow-300" /> <span className="font-medium">Room:</span> <span>{room}</span>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400"><FaFutbol className="text-yellow-400" />Room Chat</h2>
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 mb-4 bg-[#1a223a] rounded-xl p-3 border border-[#1f2937]">
        {messages.map((msg, index) => (
          <div key={index} className={`rounded-lg px-4 py-2 flex flex-col max-w-[85%] ${msg.name === name ? 'bg-white text-[#14213d] self-end border border-yellow-400' : 'bg-[#22315a] text-white self-start border border-blue-300/30'} shadow-sm`}>
            <span className="font-semibold text-xs mb-1" style={{ color: msg.name === name ? '#b58900' : '#60a5fa' }}>{msg.name}:</span>
            <span className="text-base">{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg bg-[#22315a] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-[#1f2937] text-base"
        />
        <button
          onClick={handleSend}
          className="px-5 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-[#14213d] font-bold transition shadow text-base"
        >
          Send
        </button>
      </div>
    </aside>
  );
}
