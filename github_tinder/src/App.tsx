import { useState } from "react";
import SearchScreen from "./components/SearchScreen";
import SwipeScreen from "./components/SwipeScreen";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSwipeScreen, setShowSwipeScreen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSwipeScreen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!showSwipeScreen ? (
        <SearchScreen onSearch={handleSearch} />
      ) : (
        <SwipeScreen
          searchQuery={searchQuery}
          onBack={() => setShowSwipeScreen(false)}
        />
      )}
    </div>
  );
}

export default App;
