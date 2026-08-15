export default function Navbar() {
    return (
      <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>
  
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          Upload Repository
        </button>
      </header>
    );
  }