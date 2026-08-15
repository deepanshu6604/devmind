import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import RepositoryReport from "../components/repository/RepositoryReport";
import AnalysisHistory from "../components/repository/AnalysisHistory";

import { getHistory } from "../services/repositoryService";
import { uploadRepository } from "../services/uploadService";

import { getRepository } from "../services/projectService";

import type { AnalysisResponse } from "../types/analysis";
import type { Repository as RepositoryType } from "../types/repository";

export default function Repository() {
  const { id } = useParams();

  const [repository, setRepository] =
    useState<RepositoryType | null>(null);

  const [analysis, setAnalysis] =
    useState<AnalysisResponse | null>(null);

  const [history, setHistory] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [selectedFile, setSelectedFile] =
  useState<File | null>(null);

  useEffect(() => {
    async function loadRepository() {
      if (!id) return;

      try {
        const repo = await getRepository(Number(id));

        setRepository(repo);

        const previousHistory =
          await getHistory(Number(id));

        setHistory(previousHistory);
      } catch (error) {
        console.error(error);
        alert("Failed to load repository.");
      }
    }

    loadRepository();
  }, [id]);


  const handleAnalyze = async () => {

    if (!selectedFile) {
      alert("Please select a ZIP file.");
      return;
    }

    setLoading(true);

    try {

      const result =
        await uploadRepository(selectedFile);

      setAnalysis(result);

      if (id) {
        const previousHistory =
          await getHistory(Number(id));

        setHistory(previousHistory);
      }

    } catch (error) {

      console.error(error);

      alert("Repository upload failed.");

    } finally {

      setLoading(false);

    }
  };



  return (
    <Layout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          {repository?.name ?? "Repository"}
        </h1>

        <p className="mt-2 text-gray-400">
          {repository?.description}
        </p>

        {repository && (
          <div className="mt-4 flex gap-3">

            <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
              {repository.language}
            </span>

            <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
              {repository.status}
            </span>

          </div>
        )}

      </div>

      {/* Analyze Button */}

      
      <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

        <label className="mb-4 block text-lg font-semibold">
          Upload Repository ZIP
        </label>

        <input
          type="file"
          accept=".zip"
          onChange={(e) => {

            if (!e.target.files?.length) return;

            setSelectedFile(
              e.target.files[0]
            );

          }}
          className="mb-5 block w-full rounded border border-gray-700 p-3"
        />

        {selectedFile && (

          <p className="mb-5 text-green-400">

            Selected:

            {" "}

            {selectedFile.name}

          </p>

        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`rounded-lg px-6 py-3 font-semibold transition-all duration-300 ${
            loading
              ? "cursor-not-allowed bg-gray-600"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
          }`}
        >
          {loading
            ? "Analyzing..."
            : "Analyze ZIP"}
        </button>

      </div>


      {/* Loading */}

      {loading && (

        <div className="mt-6 rounded-xl border border-blue-700 bg-[#111827] p-6">

          <div className="flex items-center gap-4">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

            <div>

              <p className="text-lg font-semibold text-blue-400">
                Analyzing Repository...
              </p>

              <p className="text-gray-400">
                Scanning folders...
              </p>

            </div>

          </div>

        </div>

      )}

      {/* Analysis Report */}

      {analysis && (

        <div className="mt-8">

          <RepositoryReport
            analysis={analysis}
          />

        </div>

      )}

      {/* Analysis History */}

      <div className="mt-8">

        <AnalysisHistory
          history={history}
        />

      </div>

    </Layout>
  );
}