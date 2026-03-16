# MoodQueue

This is a music playlist generator that uses intelligence to create playlists based on MoodQueue. It does not use genres or artists to make the playlists.

## What MoodQueue does

You can tell MoodQueue how you are feeling in your words. For example "I am feeling nostalgic about summer 2016" or "I need energy for the gym”. And then MoodQueue uses this information to make a playlist. You can save this playlist in your Spotify account.

## Tech used to make MoodQueue

- Next.js 16 and TypeScript are used to make the full stack framework for MoodQueue

- Claude API from Anthropic is used to make the artificial intelligence that generates the playlists for MoodQueue

- Spotify Web API is used to search for tracks and make playlists for MoodQueue

- OAuth 2.0 is used to authenticate with Spotify for MoodQueue

- Tailwind CSS is used to style MoodQueue

## Running MoodQueue

1. Clone the repository for MoodQueue

2. Install the dependencies for MoodQueue

```bash

npm install

```

3. Make a file called.env.local with your keys for MoodQueue

```

ANTHROPIC_API_KEY=...

SPOTIFY_CLIENT_ID=...

SPOTIFY_CLIENT_SECRET=...

SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback

```

4. Run the development server for MoodQueue

```bash

npm run dev

```

5. Open http://localhost:3000 in your web browser to use MoodQueue

## Features of MoodQueue

- You can use language to describe how you are feeling to MoodQueue

- MoodQueue uses artificial intelligence to understand the emotional and cultural context of your words

- MoodQueue can export playlists to your Spotify account

- MoodQueue has a fun retro disco user interface with animated disco balls and neon effects


## Deploy MoodQueue

The way to deploy MoodQueue is to use Vercel.


MoodQueue is a personal project that was made to learn about artificial intelligence and how to use it with other services.

```
