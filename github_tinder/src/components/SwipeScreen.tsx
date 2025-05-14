import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface Developer {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
}

interface SwipeScreenProps {
  searchQuery: string;
  onBack: () => void;
}

const SwipeScreen = ({ searchQuery, onBack }: SwipeScreenProps) => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const users = response.data.items;
        const detailedUsers = await Promise.all(
          users.map(async (user: any) => {
            const userDetails = await axios.get(user.url);
            return userDetails.data;
          })
        );
        setDevelopers(detailedUsers);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    fetchDevelopers();
  }, [searchQuery]);

  const swiped = (direction: string, nameToDelete: string) => {
    if (direction === "right") {
      // Handle match
      console.log("Matched with:", nameToDelete);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Search
      </button>

      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        {developers.length > 0 && currentIndex < developers.length ? (
          <TinderCard
            key={developers[currentIndex].id}
            onSwipe={(dir) => swiped(dir, developers[currentIndex].login)}
            onCardLeftScreen={() => outOfFrame(developers[currentIndex].login)}
            preventSwipe={["up", "down"]}
            className="absolute"
          >
            <div className="relative w-[300px] h-[400px] bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={developers[currentIndex].avatar_url}
                alt={developers[currentIndex].login}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {developers[currentIndex].login}
                </h2>
                {developers[currentIndex].location && (
                  <p className="text-gray-600">
                    {developers[currentIndex].location}
                  </p>
                )}
                {developers[currentIndex].bio && (
                  <p className="mt-2 text-gray-700">
                    {developers[currentIndex].bio}
                  </p>
                )}
                <a
                  href={developers[currentIndex].html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-pink-600 hover:text-pink-700"
                >
                  View Profile
                </a>
              </div>
            </div>
          </TinderCard>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              No more developers to show
            </h2>
            <button
              onClick={onBack}
              className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeScreen;
