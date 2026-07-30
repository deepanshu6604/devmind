import axios from "axios";
import type { Repository } from "../types/repository";


const API = `${import.meta.env.VITE_API_URL}/repositories`;

export async function getRepositories() {
  const response = await axios.get<Repository[]>(API);
  return response.data;
}

export async function getRepository(id: number) {
  const response = await axios.get<Repository>(
    `${API}/${id}`
  );

  return response.data;
}

export async function addRepository(
  repository: Omit<Repository, "id">
) {
  const response = await axios.post(API, repository);
  return response.data;
}

export async function deleteRepository(id: number) {
  await axios.delete(`${API}/${id}`);
}