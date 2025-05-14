import { useEffect } from "react";
import { Onboarding } from "./components/Onboarding";
import { SwipeCard } from "./components/SwipeCard";
import { useStore } from "./store/useStore";
import { mockProfiles } from "./data/mockProfiles";
import "./App.css";

function App() {
  const { location, profiles, setProfiles, currentProfileIndex, nextProfile } =
    useStore();

  useEffect(() => {
    setProfiles(mockProfiles);
  }, [setProfiles]);

  const handleSwipe = (direction: "left" | "right") => {
    nextProfile();
  };

  if (!location) {
    return <Onboarding />;
  }

  const currentProfile = profiles[currentProfileIndex];

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">No more profiles!</h1>
          <p className="text-gray-600">
            Check back later for more developer matches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm aspect-[3/4]">
        <SwipeCard profile={currentProfile} onSwipe={handleSwipe} />
      </div>
    </div>
  );
}

export default App;
