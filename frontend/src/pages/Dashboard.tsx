import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import RepositoryCard from "../components/repository/RepositoryCard";

import { getRepositories } from "../services/projectService";

import type { Repository } from "../types/repository";

export default function Dashboard() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const data = await getRepositories();
        setRepositories(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadRepositories();
  }, []);

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-gray-400">
          Understand any codebase faster with AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-[#111827] p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Recent Projects
            </h2>

          </div>

          {repositories.length === 0 ? (
            <p className="text-gray-400">
              No repositories added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {repositories.map((repo) => (
                <RepositoryCard
                  key={repo.id}
                  repository={repo}
                />
              ))}
            </div>
          )}

        </div>

        <div className="space-y-6">

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
                <span>Repositories Analyzed</span>
                <span className="font-bold">
                  0
                </span>
              </div>

              <div className="flex justify-between">
                <span>AI Status</span>
                <span className="text-green-400">
                  Prototype
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}