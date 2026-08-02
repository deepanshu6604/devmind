export interface Summary {
  project_name: string;
  project_type: string;
  frontend: string | null;
  backend: string | null;
  estimated_size: string;
  entry_points: {
    frontend?: string;
    backend?: string;
  };
}

export interface Scan {
  files: number;
  extensions: Record<string, number>;
}

export interface TreeItem {
  name: string;
  type: "file" | "folder";
  children?: TreeItem[];
}

export interface AnalysisResponse {
  success: boolean;
  summary: Summary;
  scan: Scan;
  stack: string[];
  tree: TreeItem[];
}