import type { TreeItem } from "../../types/analysis";

interface Props {
  tree: TreeItem[];
}

export default function FolderTree({ tree }: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        🌳 Repository Tree
      </h2>

      <ul className="space-y-2">
        {tree.map((item) => (
          <li key={item.name}>
            {item.type === "folder" ? "📁" : "📄"} {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}