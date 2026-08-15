import axios from "axios";
import type { AnalysisResponse } from "../types/analysis";

const API = import.meta.env.VITE_API_URL;

export async function analyzeRepository(
  path: string,
  repositoryId: number
) {
  const response = await axios.get<AnalysisResponse>(
    `${API}/repository/analyze`,
    {
      params: {
        path,
        repository_id: repositoryId,
      },
    }
  );

  return response.data;
}

export async function getHistory(
  repositoryId: number
) {
  const response = await axios.get(
    `${API}/repository/${repositoryId}/history`
  );

  return response.data;
}