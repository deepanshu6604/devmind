import axios from "axios";
import type { AnalysisResponse } from "../types/analysis";

const API = import.meta.env.VITE_API_URL;

export async function uploadRepository(
  repositoryId: number,
  file: File
) {
  const formData = new FormData();

  formData.append("repository_id", repositoryId.toString());
  formData.append("file", file);

  const response = await axios.post<AnalysisResponse>(
    `${API}/repository/upload`,
    formData
  );

  return response.data;
}