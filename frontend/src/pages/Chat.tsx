import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { getRepositories } from "../services/projectService";

import type { Repository } from "../types/repository";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chat() {

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const repositoryId =
    searchParams.get("repository");

  const [repositories, setRepositories] =
    useState<Repository[]>([]);

  const [selectedRepository, setSelectedRepository] =
    useState<Repository | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    async function loadRepositories() {

      try {

        const repos =
          await getRepositories();

        const analyzed =
          repos.filter(
            (repo) =>
              repo.status === "Analyzed"
          );

        setRepositories(analyzed);

        if (
          repositoryId &&
          analyzed.length
        ) {

          const repo =
            analyzed.find(
              (r) =>
                r.id === Number(repositoryId)
            );

          if (repo) {

            setSelectedRepository(repo);

          } else {

            setSelectedRepository(
              analyzed[0]
            );

          }

        } else if (analyzed.length) {

          setSelectedRepository(
            analyzed[0]
          );

        }

      } catch (err) {

        console.error(err);

      }

    }

    loadRepositories();

  }, [repositoryId]);

  useEffect(() => {

    if (!selectedRepository)
      return;

    setMessages([
      {
        sender: "bot",
        text:
`👋 Welcome to DevMind AI

Repository:
${selectedRepository.name}

Repository-aware AI is currently running in Prototype Mode.

Ask any question to preview the future workflow.`,
      },
    ]);

  }, [selectedRepository]);

  function handleSend() {

    if (
      !input.trim() ||
      !selectedRepository
    )
      return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    setInput("");

    setLoading(true);

    setTimeout(() => {

      setMessages((prev) => [

        ...prev,

        {

          sender: "bot",

          text:
`🚧 Repository-aware AI is coming in DevMind v0.7.

Selected Repository

${selectedRepository.name}

Your Question

"${question}"

Future versions will answer using:

• Repository source code

• Project architecture

• Folder structure

• Dependencies

• Documentation

• Semantic Search

Stay tuned! 🚀`,

        },

      ]);

      setLoading(false);

    }, 700);

  }

  return (
    <Layout>

      <div className="flex h-[82vh] gap-6">

        {/* Repository Sidebar */}

        <div className="w-80 rounded-xl border border-gray-800 bg-[#111827]">

          <div className="border-b border-gray-800 p-5">

            <h2 className="text-xl font-bold">
              Repositories
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Select an analyzed repository
            </p>

          </div>

          <div className="overflow-y-auto">

            {repositories.length === 0 ? (

              <div className="p-6 text-gray-400">

                No analyzed repositories.

                <button
                  onClick={() => navigate("/projects")}
                  className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
                >
                  Upload Repository
                </button>

              </div>

            ) : (

              repositories.map((repo) => (

                <button
                  key={repo.id}
                  onClick={() =>
                    setSelectedRepository(repo)
                  }
                  className={`flex w-full items-center justify-between border-b border-gray-800 px-5 py-4 text-left transition ${
                    selectedRepository?.id === repo.id
                      ? "bg-blue-600"
                      : "hover:bg-[#1F2937]"
                  }`}
                >

                  <div>

                    <p className="font-semibold">
                      {repo.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-300">
                      {repo.language}
                    </p>

                  </div>

                  <span className="text-green-400">
                    ●
                  </span>

                </button>

              ))

            )}

          </div>

        </div>

        {/* Chat */}

        <div className="flex flex-1 flex-col rounded-xl border border-gray-800 bg-[#111827]">

          <div className="border-b border-gray-800 p-5">

            <h1 className="text-2xl font-bold">
              DevMind AI
            </h1>

            <p className="mt-1 text-gray-400">

              Repository :

              {" "}

              {selectedRepository
                ? selectedRepository.name
                : "None"}

            </p>

          </div>

          <div className="flex-1 overflow-y-auto p-6">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`mb-5 flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] whitespace-pre-wrap rounded-xl px-5 py-4 ${
                    message.sender === "user"
                      ? "bg-blue-600"
                      : "bg-gray-700"
                  }`}
                >

                  {message.text}

                </div>

              </div>

            ))}

            {loading && (

              <div className="text-gray-400">

                DevMind is thinking...

              </div>

            )}

          </div>

          <div className="border-t border-gray-800 p-5">

            <div className="flex gap-3">

              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    handleSend();

                  }

                }}
                disabled={!selectedRepository}
                placeholder={
                  selectedRepository
                    ? "Ask about this repository..."
                    : "Select a repository first..."
                }
                className="flex-1 rounded-lg border border-gray-700 bg-[#0B0F19] px-4 py-3 outline-none focus:border-blue-500"
              />

              <button
                onClick={handleSend}
                disabled={
                  loading ||
                  !selectedRepository
                }
                className="rounded-lg bg-blue-600 px-7 hover:bg-blue-700 disabled:bg-gray-600"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );

}