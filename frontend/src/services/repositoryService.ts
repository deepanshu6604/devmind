import axios from "axios";
import type { AnalysisResponse } from "../types/analysis";

const API = import.meta.env.VITE_API_URL;

// ------------------------------------
// Analyze Existing Local Repository
// ------------------------------------

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

// ------------------------------------
// Analysis History
// ------------------------------------

export async function getHistory(
  repositoryId: number
) {
  const response = await axios.get(
    `${API}/repository/${repositoryId}/history`
  );

  return response.data;
}

// ------------------------------------
// Latest Saved Analysis
// ------------------------------------

export async function getLatestAnalysis(
  repositoryId: number
) {
  const response = await axios.get<AnalysisResponse>(
    `${API}/repository/${repositoryId}/latest-analysis`
  );

  return response.data;
}