import { mockProfiles } from "./mockProfiles.js";

// DOM Elements
const onboardingScreen = document.getElementById("onboarding");
const swipeDeckScreen = document.getElementById("swipe-deck");
const languagePills = document.querySelectorAll(".language-pill");
const locationInput = document.getElementById("location");
const continueBtn = document.getElementById("continue-btn");
const profileCard = document.getElementById("profile-card");
const noMoreProfiles = document.getElementById("no-more-profiles");
const resetDeckBtn = document.getElementById("reset-deck");
const skipBtn = document.getElementById("skip-btn");
const likeBtn = document.getElementById("like-btn");

// State
let selectedLanguages = new Set();
let currentProfileIndex = 0;
let filteredProfiles = [];

// Onboarding Logic
languagePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const lang = pill.dataset.lang;
    if (selectedLanguages.has(lang)) {
      selectedLanguages.delete(lang);
      pill.classList.remove("selected");
    } else {
      selectedLanguages.add(lang);
      pill.classList.add("selected");
    }
    updateContinueButton();
  });
});

locationInput.addEventListener("input", updateContinueButton);

function updateContinueButton() {
  continueBtn.disabled =
    selectedLanguages.size === 0 || !locationInput.value.trim();
}

continueBtn.addEventListener("click", () => {
  // Filter profiles based on selected languages
  filteredProfiles = mockProfiles.filter((profile) =>
    profile.languages.some((lang) => selectedLanguages.has(lang))
  );

  if (filteredProfiles.length === 0) {
    showNoMoreProfiles();
    return;
  }

  // Show first profile
  showProfile(0);

  // Switch screens
  onboardingScreen.classList.add("hidden");
  swipeDeckScreen.classList.remove("hidden");
});

// Swipe Deck Logic
function showProfile(index) {
  if (index >= filteredProfiles.length) {
    showNoMoreProfiles();
    return;
  }

  const profile = filteredProfiles[index];

  // Update profile card
  document.getElementById("avatar").src = profile.avatarUrl;
  document.getElementById("username").textContent = profile.username;
  document.getElementById("followers").textContent = profile.followers;
  document.getElementById("following").textContent = profile.following;

  // Update language badges
  const languagesContainer = document.getElementById("languages");
  languagesContainer.innerHTML = "";
  profile.languages.forEach((lang) => {
    const badge = document.createElement("span");
    badge.className = "language-badge";
    badge.textContent = lang;
    languagesContainer.appendChild(badge);
  });

  currentProfileIndex = index;
}

function showNoMoreProfiles() {
  profileCard.classList.add("hidden");
  noMoreProfiles.classList.remove("hidden");
}

function nextProfile() {
  showProfile(currentProfileIndex + 1);
}

// Action Buttons
skipBtn.addEventListener("click", nextProfile);
likeBtn.addEventListener("click", nextProfile);

resetDeckBtn.addEventListener("click", () => {
  // Reset state
  currentProfileIndex = 0;
  selectedLanguages.clear();
  locationInput.value = "";

  // Reset UI
  languagePills.forEach((pill) => pill.classList.remove("selected"));
  profileCard.classList.remove("hidden");
  noMoreProfiles.classList.add("hidden");

  // Show first profile
  showProfile(0);

  // Switch back to onboarding
  swipeDeckScreen.classList.add("hidden");
  onboardingScreen.classList.remove("hidden");
});
