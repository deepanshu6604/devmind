import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mx-auto max-w-6xl">

        {/* Hero */}

        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-10">

          <h1 className="text-5xl font-bold">
            Welcome to DevMind
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            AI-powered repository understanding platform.
            Upload your project, analyze the architecture,
            inspect the repository, and prepare for
            repository-aware AI chat.
          </p>

          <div className="mt-8 flex gap-4">

            <button
              onClick={() => navigate("/projects")}
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl border border-gray-700 px-8 py-3 font-semibold hover:bg-[#1F2937]"
            >
              Dashboard
            </button>

          </div>

        </div>

        {/* Workflow */}

        <div className="mt-10">

          <h2 className="mb-6 text-3xl font-bold">
            DevMind Workflow
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

              <div className="mb-4 text-4xl">
                📦
              </div>

              <h3 className="text-xl font-semibold">
                Step 1
              </h3>

              <p className="mt-3 text-gray-400">
                Create a repository and upload a ZIP
                containing your source code.
              </p>

            </div>

            <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

              <div className="mb-4 text-4xl">
                🤖
              </div>

              <h3 className="text-xl font-semibold">
                Step 2
              </h3>

              <p className="mt-3 text-gray-400">
                DevMind scans folders, detects the tech
                stack, analyzes entry points and builds
                a project report.
              </p>

            </div>

            <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

              <div className="mb-4 text-4xl">
                📊
              </div>

              <h3 className="text-xl font-semibold">
                Step 3
              </h3>

              <p className="mt-3 text-gray-400">
                Explore project summary, statistics,
                folder tree and previous analyses.
              </p>

            </div>

            <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

              <div className="mb-4 text-4xl">
                💬
              </div>

              <h3 className="text-xl font-semibold">
                Step 4
              </h3>

              <p className="mt-3 text-gray-400">
                Preview repository-aware AI chat.
                Full code understanding arrives in
                DevMind v0.7.
              </p>

            </div>

          </div>

        </div>

        {/* Features */}

        <div className="mt-12 rounded-2xl border border-gray-800 bg-[#111827] p-8">

          <h2 className="text-3xl font-bold">
            What's Included in DevMind v0.5
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <div>✅ Repository Management</div>
            <div>✅ ZIP Upload & Extraction</div>
            <div>✅ Project Summary</div>
            <div>✅ Stack Detection</div>
            <div>✅ Folder Tree</div>
            <div>✅ Entry Point Detection</div>
            <div>✅ Repository Statistics</div>
            <div>✅ Analysis History</div>
            <div>✅ Demo Repository</div>
            <div>✅ Prototype AI Chat</div>

          </div>

        </div>

      </div>
    </Layout>
  );
}