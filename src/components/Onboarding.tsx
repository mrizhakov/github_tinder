import { useState } from "react";
import { useStore } from "../store/useStore";

const AVAILABLE_LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "Ruby",
  "Java",
  "C++",
  "Rust",
  "PHP",
  "Swift",
];

export const Onboarding = () => {
  const { selectedLanguages, location, setSelectedLanguages, setLocation } =
    useStore();
  const [tempLocation, setTempLocation] = useState(location);

  const toggleLanguage = (lang: string) => {
    const newLanguages = selectedLanguages.includes(lang)
      ? selectedLanguages.filter((l) => l !== lang)
      : [...selectedLanguages, lang];
    setSelectedLanguages(newLanguages);
  };

  const handleContinue = () => {
    setLocation(tempLocation);
  };

  const canContinue =
    selectedLanguages.length > 0 && tempLocation.trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Tinder for Devs
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Select Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedLanguages.includes(lang)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Location</h2>
          <div className="relative">
            <input
              type="text"
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              placeholder="Enter your location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">📍</span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full py-3 rounded-lg text-white font-medium transition-colors
            ${
              canContinue
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
