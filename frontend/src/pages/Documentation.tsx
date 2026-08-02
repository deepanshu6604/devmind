import Layout from "../components/layout/Layout";

export default function Documentation() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl">

        {/* Hero */}

        <div className="mb-10 rounded-2xl border border-blue-700 bg-gradient-to-r from-[#111827] to-[#1E3A8A] p-10">

          <h1 className="text-5xl font-bold">
            DevMind Documentation
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-300">
            DevMind is an AI-powered Repository Intelligence Platform
            that helps developers understand large codebases in
            minutes instead of hours.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <span className="rounded-full bg-blue-600 px-4 py-2">
              Version 0.5
            </span>

            <span className="rounded-full bg-green-600 px-4 py-2">
              Stable Prototype
            </span>

            <span className="rounded-full bg-gray-700 px-4 py-2">
              FastAPI + React
            </span>

          </div>

        </div>

        {/* What is DevMind */}

        <section className="mb-8 rounded-xl border border-gray-800 bg-[#111827] p-8">

          <h2 className="mb-5 text-3xl font-bold">
            What is DevMind?
          </h2>

          <p className="leading-8 text-gray-300">

            DevMind is an intelligent repository analysis platform
            designed to simplify software development.

            <br /><br />

            Instead of manually reading hundreds of files,
            DevMind scans an entire repository, identifies the
            technology stack, builds the project structure,
            summarizes the architecture and prepares the repository
            for AI-powered code understanding.

            <br /><br />

            The long-term vision is to provide a repository-aware AI
            assistant capable of answering technical questions using
            the actual project source code.

          </p>

        </section>

        {/* Workflow */}

        <section className="mb-8 rounded-xl border border-gray-800 bg-[#111827] p-8">

          <h2 className="mb-6 text-3xl font-bold">
            DevMind Workflow
          </h2>

          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-xl bg-[#1F2937] p-6">

              <div className="mb-4 text-5xl">
                📂
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                Upload
              </h3>

              <p className="text-gray-400">
                Upload your repository as a ZIP archive.
              </p>

            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">

              <div className="mb-4 text-5xl">
                🔍
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                Analyze
              </h3>

              <p className="text-gray-400">
                DevMind scans every folder and source file.
              </p>

            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">

              <div className="mb-4 text-5xl">
                🧠
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                Understand
              </h3>

              <p className="text-gray-400">
                Architecture, stack and repository insights are generated.
              </p>

            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">

              <div className="mb-4 text-5xl">
                💬
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                Chat
              </h3>

              <p className="text-gray-400">
                Repository-aware AI chat is planned for v0.7.
              </p>

            </div>

          </div>

        </section>

        {/* Features */}

        <section className="mb-8 rounded-xl border border-gray-800 bg-[#111827] p-8">

          <h2 className="mb-6 text-3xl font-bold">
            Features
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="rounded-xl bg-[#1F2937] p-6">
              ✅ Upload Repository ZIP
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              ✅ Automatic Stack Detection
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              ✅ Repository Tree Generation
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              ✅ Project Summary Generation
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              ✅ Analysis History
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              ✅ Persistent Repository Storage
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              ✅ Demo Repository
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              🚧 Repository-Aware AI Chat
            </div>

          </div>

        </section>

        {/* Architecture */}

        <section className="mb-8 rounded-xl border border-gray-800 bg-[#111827] p-8">

          <h2 className="mb-6 text-3xl font-bold">
            System Architecture
          </h2>

          <div className="rounded-xl bg-[#0B1120] p-8 font-mono text-green-400 leading-8 overflow-x-auto">

{`Repository ZIP
      │
      ▼
Upload Service
      │
      ▼
Repository Scanner
      │
      ├───────────────┐
      ▼               ▼
 Stack Detector    Tree Builder
      │               │
      └──────┬────────┘
             ▼
      Repository Summary
             │
             ▼
      SQLite Database
             │
             ▼
 Repository Dashboard
             │
             ▼
 Repository-aware AI (v0.7)`}

          </div>

        </section>

        {/* Tech Stack */}

        <section className="mb-8 rounded-xl border border-gray-800 bg-[#111827] p-8">

          <h2 className="mb-6 text-3xl font-bold">
            Technology Stack
          </h2>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-[#1F2937] p-6">
              <h3 className="mb-3 text-xl font-semibold">
                Frontend
              </h3>

              <ul className="space-y-2 text-gray-300">
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Axios</li>
              </ul>
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              <h3 className="mb-3 text-xl font-semibold">
                Backend
              </h3>

              <ul className="space-y-2 text-gray-300">
                <li>FastAPI</li>
                <li>SQLAlchemy</li>
                <li>SQLite</li>
                <li>Python</li>
              </ul>
            </div>

            <div className="rounded-xl bg-[#1F2937] p-6">
              <h3 className="mb-3 text-xl font-semibold">
                AI
              </h3>

              <ul className="space-y-2 text-gray-300">
                <li>Repository Scanner</li>
                <li>Stack Detection</li>
                <li>Repository Summarization</li>
                <li>Repository-aware AI (Planned)</li>
              </ul>
            </div>

          </div>

        </section>

        {/* Roadmap */}

        <section className="mb-8 rounded-xl border border-gray-800 bg-[#111827] p-8">

          <h2 className="mb-6 text-3xl font-bold">
            Roadmap
          </h2>

          <div className="space-y-6">

            <div className="rounded-xl border border-green-700 bg-[#1F2937] p-6">

              <h3 className="text-2xl font-bold text-green-400">
                ✅ Version 0.5
              </h3>

              <ul className="mt-4 space-y-2 text-gray-300">

                <li>• Repository Upload</li>

                <li>• Automatic Analysis</li>

                <li>• Repository Reports</li>

                <li>• Analysis History</li>

                <li>• Demo Repository</li>

                <li>• Prototype AI Chat</li>

              </ul>

            </div>

            <div className="rounded-xl border border-yellow-700 bg-[#1F2937] p-6">

              <h3 className="text-2xl font-bold text-yellow-400">
                🚀 Version 0.7
              </h3>

              <ul className="mt-4 space-y-2 text-gray-300">

                <li>• Repository-aware AI</li>

                <li>• Semantic Search</li>

                <li>• Vector Database</li>

                <li>• GitHub Integration</li>

                <li>• Code Explanation</li>

                <li>• Architecture Question Answering</li>

              </ul>

            </div>

          </div>

        </section>

        {/* Footer */}

        <div className="mt-12 border-t border-gray-800 py-8 text-center text-gray-500">

          <p className="text-lg font-semibold">
            DevMind v0.5
          </p>

          <p className="mt-2">
            AI-Powered Repository Intelligence Platform
          </p>

          <p className="mt-4 text-sm">
            Built with ❤️ using React, FastAPI and Python
          </p>

        </div>

      </div>
    </Layout>
  );
}