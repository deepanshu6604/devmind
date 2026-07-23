import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { repositories } from "../data/repositories";
import { useState } from "react";

export default function Repository() {
  const { id } = useParams();

  const repository = repositories.find((repo) => repo.id === id);

  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  if (!repository) {
    return (
      <Layout>
        <h1>Repository Not Found</h1>
      </Layout>
    );
  }

  const analyzeRepository = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold">
        {repository.name}
      </h1>

      <p className="mt-2 text-gray-400">
        {repository.language}
      </p>

      <div className="mt-8 rounded-xl border border-gray-800 bg-[#111827] p-6">

        <div className="space-y-3">

          <p>📁 Files : {repository.files}</p>

          <p>Status : {repository.status}</p>

        </div>

        {!loading && !showResult && (

          <button
            onClick={analyzeRepository}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700"
          >
            Analyze Repository
          </button>

        )}

        {loading && (

          <div className="mt-8">

            <p>Analyzing Repository...</p>

            <div className="mt-4 h-2 rounded bg-gray-700">

              <div className="h-2 w-full animate-pulse rounded bg-blue-500"></div>

            </div>

          </div>

        )}

        {showResult && (

          <div className="mt-8 rounded-lg border border-green-700 bg-[#0F172A] p-6">

            <h2 className="text-2xl font-semibold">
              Repository Analysis
            </h2>

            <div className="mt-5 space-y-3">

              <p>✅ Backend : FastAPI</p>

              <p>✅ Frontend : React</p>

              <p>✅ Database : MongoDB</p>

              <p>✅ Authentication : JWT</p>

              <p>🧠 Estimated Learning Time : 28 Minutes</p>

            </div>

          </div>

        )}

      </div>

    </Layout>
  );
}