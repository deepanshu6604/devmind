import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import RepositoryCard from "../components/repository/RepositoryCard";

import { getRepositories } from "../services/projectService";

import type { Repository } from "../types/repository";

export default function Dashboard() {
  const navigate = useNavigate();

  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const data = await getRepositories();

        // Always show Demo Repository first
        data.sort((a, b) => b.is_demo - a.is_demo);

        setRepositories(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadRepositories();
  }, []);

  const demoRepository = repositories.find(
    (repo) => repo.is_demo === 1
  );

  const userRepositories = repositories.filter(
    (repo) => repo.is_demo !== 1
  );

  return (
    <Layout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-gray-400">
          Understand any codebase faster with AI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Left Panel */}
        <div className="lg:col-span-2 space-y-6">

          {/* Demo Repository */}
          {demoRepository && (
            <div className="rounded-xl border border-yellow-600 bg-[#111827] p-6">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-2xl font-semibold">
                    ⭐ Featured Demo
                  </h2>

                  <p className="mt-1 text-gray-400">
                    Explore DevMind instantly without uploading a repository.
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(`/repository/${demoRepository.id}`)
                  }
                  className="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Explore Demo
                </button>

              </div>

              <RepositoryCard repository={demoRepository} />

            </div>
          )}

          {/* User Projects */}
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-semibold">
                Your Projects
              </h2>

              <button
                onClick={() => navigate("/projects")}
                className="rounded-lg bg-blue-600 px-4 py-2 transition hover:bg-blue-700"
              >
                + Add Repository
              </button>

            </div>

            {userRepositories.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-700 p-8 text-center">

                <p className="text-lg font-medium">
                  No repositories yet
                </p>

                <p className="mt-2 text-gray-400">
                  Upload your own repository to start analyzing it with AI.
                </p>

              </div>
            ) : (
              <div className="space-y-4">
                {userRepositories.map((repo) => (
                  <RepositoryCard
                    key={repo.id}
                    repository={repo}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Right Panel */}
        <div className="space-y-6">

          {/* Statistics */}
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <h2 className="text-xl font-semibold">
              Statistics
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">
                <span>Total Projects</span>
                <span className="font-bold">
                  {repositories.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Analyzed</span>
                <span className="font-bold">
                  {
                    repositories.filter(
                      (repo) => repo.status === "Analyzed"
                    ).length
                  }
                </span>
              </div>

              <div className="flex justify-between">
                <span>Demo Available</span>
                <span className="text-yellow-400">
                  {demoRepository ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>AI Status</span>
                <span className="text-green-400">
                  Online
                </span>
              </div>

            </div>

          </div>

          {/* Quick Tips */}
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <h2 className="text-xl font-semibold">
              Quick Start
            </h2>

            <ul className="mt-5 space-y-3 text-gray-400">

              <li>⭐ Explore the Demo Repository</li>

              <li>📁 Upload your own project</li>

              <li>🤖 Analyze with AI</li>

              <li>💬 Chat with your repository</li>

            </ul>

          </div>

        </div>

      </div>
    </Layout>
  );
}