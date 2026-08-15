import Layout from "../components/layout/Layout";

export default function Repository() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold">
        CareerAI
      </h1>

      <p className="mt-3 text-gray-400">
        Python + React
      </p>

      <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3">
        Analyze Repository
      </button>
    </Layout>
  );
}