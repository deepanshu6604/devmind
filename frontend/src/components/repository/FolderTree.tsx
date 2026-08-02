import type { TreeItem } from "../../types/analysis";
// 1. Create a local type that extends your existing TreeItem

interface Props {
  tree?: TreeItem[];
}

function renderTree(
  items: TreeItem[],
  level = 0
) {
  return items.map((item) => (
    <div
      key={`${level}-${item.name}`}
      style={{
        paddingLeft: `${level * 18}px`,
      }}
      className="py-1"
    >
      <div>
        {item.type === "folder"
          ? "📁"
          : "📄"}{" "}
        {item.name}
      </div>

      {item.children &&
        item.children.length > 0 &&
        renderTree(
          item.children,
          level + 1
        )}
    </div>
  ));
}

export default function FolderTree({
  tree,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">

      <h2 className="mb-6 text-xl font-semibold">
        🌳 Repository Tree
      </h2>

      {!tree || tree.length === 0 ? (

        <p className="text-gray-500">
          Repository tree not available.
        </p>

      ) : (

        <div className="overflow-auto rounded-lg bg-[#0B1220] p-4 font-mono text-sm">
          {renderTree(tree)}
        </div>

      )}

    </div>
  );
}