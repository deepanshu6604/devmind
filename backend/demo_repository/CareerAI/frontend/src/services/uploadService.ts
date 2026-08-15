import axios from "axios";
import type { AnalysisResponse } from "../types/analysis";

const API = import.meta.env.VITE_API_URL;

export async function uploadRepository(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post<AnalysisResponse>(
    `${API}/repository/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}