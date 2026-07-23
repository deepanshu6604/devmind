export interface Repository {
    id: string;
    name: string;
    language: string;
    files: number;
    status: "Ready" | "Analyzing";
}