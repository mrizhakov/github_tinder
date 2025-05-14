import { create } from "zustand";
import type { Profile } from "../data/mockProfiles";

interface AppState {
  selectedLanguages: string[];
  location: string;
  currentProfileIndex: number;
  profiles: Profile[];
  setSelectedLanguages: (languages: string[]) => void;
  setLocation: (location: string) => void;
  setProfiles: (profiles: Profile[]) => void;
  nextProfile: () => void;
  resetProfiles: () => void;
}

export const useStore = create<AppState>((set) => ({
  selectedLanguages: [],
  location: "",
  currentProfileIndex: 0,
  profiles: [],
  setSelectedLanguages: (languages) => set({ selectedLanguages: languages }),
  setLocation: (location) => set({ location }),
  setProfiles: (profiles) => set({ profiles }),
  nextProfile: () =>
    set((state) => ({
      currentProfileIndex: state.currentProfileIndex + 1,
    })),
  resetProfiles: () => set({ currentProfileIndex: 0 }),
}));
