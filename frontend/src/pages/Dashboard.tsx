import Layout from "../components/layout/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Welcome back 👋</h1>
        <p className="mt-2 text-gray-400">
          Analyze repositories and understand codebases faster.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Projects */}
        <div className="rounded-xl bg-[#111827] border border-gray-800 p-6">
          <h2 className="text-lg font-semibold">Recent Projects</h2>

          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-[#1F2937] p-3">
              📁 CareerAI
            </div>

            <div className="rounded-lg bg-[#1F2937] p-3">
              📁 VECCA
            </div>

            <div className="rounded-lg bg-[#1F2937] p-3">
              📁 DevMind Demo
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-[#111827] border border-gray-800 p-6">
          <h2 className="text-lg font-semibold">Quick Actions</h2>

          <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 hover:bg-blue-700 transition">
            Upload Repository
          </button>

          <button className="mt-3 w-full rounded-lg border border-gray-700 px-4 py-3 hover:bg-[#1F2937] transition">
            Open Demo Project
          </button>
        </div>

        {/* Activity */}
        <div className="rounded-xl bg-[#111827] border border-gray-800 p-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>

          <ul className="mt-4 space-y-3 text-gray-400">
            <li>✅ DevMind initialized</li>
            <li>✅ Routing configured</li>
            <li>⏳ Repository upload coming next</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}