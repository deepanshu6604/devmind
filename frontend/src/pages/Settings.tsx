import Layout from "../components/layout/Layout";

export default function Settings() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-4xl font-bold">
          Settings
        </h1>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Application */}

          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <h2 className="mb-6 text-2xl font-semibold">
              Application
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Version
                </span>

                <span className="font-semibold">
                  DevMind v0.5
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Frontend
                </span>

                <span className="text-green-400">
                  Running
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Backend
                </span>

                <span className="text-green-400">
                  Connected
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Repository Scanner
                </span>

                <span className="text-green-400">
                  Enabled
                </span>
              </div>

            </div>

          </div>

          {/* AI */}

          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <h2 className="mb-6 text-2xl font-semibold">
              AI Features
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Repository Chat
                </span>

                <span className="text-yellow-400">
                  Prototype
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Semantic Search
                </span>

                <span className="text-red-400">
                  Upcoming
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Code Understanding
                </span>

                <span className="text-red-400">
                  v0.7
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  RAG Pipeline
                </span>

                <span className="text-red-400">
                  Planned
                </span>

              </div>

            </div>

          </div>

          {/* Repository */}

          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <h2 className="mb-6 text-2xl font-semibold">
              Repository
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  ZIP Upload
                </span>

                <span className="text-green-400">
                  Supported
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Stack Detection
                </span>

                <span className="text-green-400">
                  Enabled
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Repository History
                </span>

                <span className="text-green-400">
                  Enabled
                </span>

              </div>

            </div>

          </div>

          {/* Upcoming */}

          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

            <h2 className="mb-6 text-2xl font-semibold">
              Roadmap
            </h2>

            <div className="space-y-3">

              <div>✅ DevMind v0.5</div>

              <div>🔄 Repository AI Chat</div>

              <div>🔄 Semantic Search</div>

              <div>🔄 Documentation Generator</div>

              <div>🔄 Architecture Visualization</div>

              <div>🔄 Code Explanation</div>

            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
}