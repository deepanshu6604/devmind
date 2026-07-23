import Layout from "../components/layout/Layout";
import RepositoryCard from "../components/ui/RepositoryCard";
import { repositories } from "../data/repositories";

export default function Dashboard() {
  return (
    <Layout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Welcome back 👋</h1>

        <p className="mt-2 text-gray-400">
          Understand any codebase faster with AI.
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Projects */}
        <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-[#111827] p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Recent Projects
            </h2>

            <button className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700 transition">
              Upload Repository
            </button>
          </div>

          <div className="space-y-4">
            {repositories.map((repo) => (
              <RepositoryCard
                key={repo.id}
                repository={repo}
              />
            ))}
          </div>

        </div>

        {/* Right Panel */}
        <div className="space-y-6">

          {/* Quick Actions */}
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="mt-6 flex flex-col gap-3">

              <button className="rounded-lg bg-blue-600 py-3 hover:bg-blue-700 transition">
                Upload Repository
              </button>

              <button className="rounded-lg border border-gray-700 py-3 hover:bg-[#1F2937] transition">
                Open Demo
              </button>

              <button className="rounded-lg border border-gray-700 py-3 hover:bg-[#1F2937] transition">
                AI Chat
              </button>

            </div>

          </div>

          {/* Activity */}
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <h2 className="text-xl font-semibold">
              Recent Activity
            </h2>

            <ul className="mt-5 space-y-4 text-gray-400">

              <li>✅ DevMind initialized</li>

              <li>✅ Routing configured</li>

              <li>🚀 Dashboard created</li>

              <li>📂 Repository system ready</li>

            </ul>

          </div>

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