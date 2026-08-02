import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export interface ChatResponse {
  success: boolean;
  response: string;
}

export async function sendMessage(message: string) {
  const response = await axios.post<ChatResponse>(
    `${API}/chat/`,
    {
      message,
    }
  );

  return response.data;
}