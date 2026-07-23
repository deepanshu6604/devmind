export interface Repository {
    id: number;
    name: string;
    language: string;
    files: number;
    status: string;
  }
  
  export const repositories: Repository[] = [
    {
      id: 1,
      name: "CareerAI",
      language: "Python + React",
      files: 154,
      status: "Ready",
    },
  ];