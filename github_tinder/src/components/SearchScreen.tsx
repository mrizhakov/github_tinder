import { useState } from "react";

interface SearchScreenProps {
  onSearch: (query: string) => void;
}

const SearchScreen = ({ onSearch }: SearchScreenProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-pink-600">Tinder for Devs</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., top C developers in Berlin"
            className="p-4 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white p-4 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Find Developers
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchScreen;
