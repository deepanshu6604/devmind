import type { Repository } from "../types/repository";

export const repositories: Repository[] = [
  {
    id: 1,
    name: "CareerAI",
    description: "AI-powered career assistant platform",
    language: "Python + React",
    status: "Ready",
    upload_path: "c:\\projects\\careerAI",
    is_demo: 0,
    created_at: new Date().toISOString(),
  },
];