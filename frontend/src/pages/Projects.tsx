import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import RepositoryCard from "../components/repository/RepositoryCard";
import AddRepositoryModal from "../components/repository/AddRepositoryModal";

import {
  getRepositories,
} from "../services/projectService";

import type { Repository } from "../types/repository";

export default function Projects() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadRepositories() {
    try {
      const data = await getRepositories();
      setRepositories(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load repositories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <p className="mt-2 text-gray-400">
          Manage all repositories connected to DevMind.
        </p>
      </div>

      {/* Add Repository */}

      <AddRepositoryModal
        onAdded={loadRepositories}
      />

      {/* Repository List */}

      <div className="mt-10">

        <h2 className="mb-6 text-2xl font-semibold">
          Connected Repositories
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : repositories.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-8 text-center">
            <p className="text-gray-400">
              No repositories added yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {repositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
              />
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}