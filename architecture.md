# GitHub Tinder Architecture

This document describes the architecture of the GitHub Tinder application. This is a matching application that helps developers find potential collaborators based on GitHub profile similarities.

## Project Structure

```
github_tinder/
├── __init__.py
├── client.py       # GitHub API client
├── models.py       # Data models
├── matching.py     # Matching algorithm
├── interface.py    # CLI interface
├── logging_config.py # Logging setup
└── utils.py        # Helper functions
examples/
├── github_tinder_demo.ipynb # Notebook demonstration
tests/
└── test_*.py       # Test modules
logs/               # Log files directory
architecture.md     # This file
cli.py              # Command line interface
```

## Core Components

### client.py

Contains the GitHub API client for interacting with GitHub's REST API.

```python
# Example usage
from github_tinder.client import GitHubClient

client = GitHubClient(token="your_github_token")
user_data = client.get_user("octocat")
user_repos = client.get_user_repos("octocat")
```

### models.py

Defines the data structures for GitHub users and their interactions.

```python
# Example usage
from github_tinder.models import UserProfile

profile = UserProfile(username="octocat", repos=repos_data)
languages = profile.get_primary_languages()
```

### matching.py

Implements the matching algorithm to find compatible GitHub users.

```python
# Example usage
from github_tinder.matching import MatchingEngine

engine = MatchingEngine()
matches = engine.find_matches(current_user, potential_matches, limit=10)
```

### interface.py

Provides the command-line interface functions for interacting with the application.

```python
# Example usage
from github_tinder.interface import SwipeInterface

ui = SwipeInterface()
ui.display_profile(user_profile)
response = ui.get_swipe_input()
```

### logging_config.py

Sets up logging configuration for the entire application.

```python
# Example usage
from github_tinder.logging_config import setup_logging

logger = setup_logging(log_file="logs/github_tinder.log", level="INFO")
logger.info("Application started")
```

### utils.py

Contains utility functions used across the application.

```python
# Example usage
from github_tinder.utils import calculate_similarity

similarity_score = calculate_similarity(user1_languages, user2_languages)
```

## CLI Interface (cli.py)

Command-line interface for the application.

```python
# Example usage
$ python cli.py --token YOUR_GITHUB_TOKEN --find-matches --limit 10
```

## Data Flow

1. User authenticates with GitHub credentials
2. Application fetches user's GitHub profile and repositories
3. Matching engine identifies potential matches based on:
   - Programming languages
   - Repository topics
   - Contribution activity
4. User is presented with potential matches one at a time
5. User swipes right (like) or left (pass)
6. When two users match, a notification is generated

## API Authentication and Rate Limiting

- GitHub API authentication is handled via personal access tokens
- Rate limiting is managed with exponential backoff and retry mechanisms
- API call logs track remaining rate limits
- Cache implemented to reduce API calls for frequently accessed data

---

This document will be updated throughout development with additional implementation details.
