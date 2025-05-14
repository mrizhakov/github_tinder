// Function to fetch GitHub profiles based on language and location
export async function fetchGitHubProfiles(languages, location) {
  try {
    // Create search query for each language
    const searchPromises = Array.from(languages).map(async (lang) => {
      const query = `language:${lang}+location:${location}+type:user`;
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&sort=followers&order=desc&per_page=10`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items;
    });

    // Wait for all searches to complete
    const results = await Promise.all(searchPromises);

    // Flatten and deduplicate results
    const uniqueUsers = new Map();
    results.flat().forEach((user) => {
      if (!uniqueUsers.has(user.login)) {
        uniqueUsers.set(user.login, user);
      }
    });

    // Fetch additional user details for each unique user
    const userDetailsPromises = Array.from(uniqueUsers.values()).map(
      async (user) => {
        const response = await fetch(
          `https://api.github.com/users/${user.login}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const userData = await response.json();

        // Fetch user's repositories to get languages
        const reposResponse = await fetch(
          `https://api.github.com/users/${user.login}/repos?per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!reposResponse.ok) {
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }

        const repos = await reposResponse.json();

        // Get unique languages from repositories
        const languages = new Set();
        repos.forEach((repo) => {
          if (repo.language) {
            languages.add(repo.language);
          }
        });

        return {
          id: user.id.toString(),
          avatarUrl: user.avatar_url,
          username: user.login,
          followers: userData.followers,
          following: userData.following,
          languages: Array.from(languages),
        };
      }
    );

    return await Promise.all(userDetailsPromises);
  } catch (error) {
    console.error("Error fetching GitHub profiles:", error);
    throw error;
  }
}
