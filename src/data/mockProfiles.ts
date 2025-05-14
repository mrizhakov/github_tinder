export interface Profile {
  id: string;
  avatarUrl: string;
  username: string;
  followers: number;
  following: number;
  languages: string[];
}

export const mockProfiles: Profile[] = [
  {
    id: "1",
    avatarUrl: "https://avatars.githubusercontent.com/u/583231",
    username: "octocat",
    followers: 150,
    following: 75,
    languages: ["JavaScript", "Ruby"],
  },
  {
    id: "2",
    avatarUrl: "https://avatars.githubusercontent.com/u/1",
    username: "torvalds",
    followers: 150000,
    following: 0,
    languages: ["C", "Assembly"],
  },
  {
    id: "3",
    avatarUrl: "https://avatars.githubusercontent.com/u/2",
    username: "defunkt",
    followers: 12000,
    following: 200,
    languages: ["Ruby", "JavaScript", "Go"],
  },
  {
    id: "4",
    avatarUrl: "https://avatars.githubusercontent.com/u/3",
    username: "pjhyett",
    followers: 8000,
    following: 150,
    languages: ["Ruby", "JavaScript"],
  },
  {
    id: "5",
    avatarUrl: "https://avatars.githubusercontent.com/u/4",
    username: "wycats",
    followers: 10000,
    following: 300,
    languages: ["Ruby", "JavaScript", "TypeScript"],
  },
];
