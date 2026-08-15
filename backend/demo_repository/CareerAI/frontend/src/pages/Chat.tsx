import { useState } from "react";
import Layout from "../components/layout/Layout";
import { sendMessage } from "../services/chatService";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "👋 Welcome to DevMind AI!\n\nI'm currently running in Demo Mode.\nAsk me anything to try the chat.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const result = await sendMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: result.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to connect to DevMind AI.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div className="mx-auto flex h-[80vh] max-w-4xl flex-col">

        <h1 className="mb-6 text-4xl font-bold">
          DevMind AI
        </h1>

        <div className="flex-1 overflow-y-auto rounded-xl border border-gray-800 bg-[#111827] p-6">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 whitespace-pre-wrap ${
                  message.sender === "user"
                    ? "bg-blue-600"
                    : "bg-gray-700"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-gray-400">
              DevMind is typing...
            </p>
          )}

        </div>

        <div className="mt-4 flex gap-3">

          <input
            type="text"
            value={input}
            placeholder="Ask DevMind..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 rounded-lg border border-gray-700 bg-[#111827] p-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 hover:bg-blue-700 disabled:bg-gray-600"
          >
            Send
          </button>

        </div>

      </div>
    </Layout>
  );
}