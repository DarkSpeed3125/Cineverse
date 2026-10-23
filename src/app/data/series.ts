
import type { Movie } from "./movies";

export const series: Movie[] = [
  {
    id: 101,
    title: "The Last Frontier",
    year: 2026,
    rating: "TV-MA",
    genre: "Sci-Fi",
    poster: "/Images/Movies/last-frontier.png",
    description: "An expedition at the edge of known space discovers a signal that could change humanity forever.",
  },
  {
    id: 102,
    title: "Shadow Protocol",
    year: 2025,
    rating: "TV-MA",
    genre: "Thriller",
    poster: "/Images/Movies/shadow-protocol.png",
    description: "An intelligence agent uncovers a conspiracy buried deep within her own organization.",
  },
  {
    id: 103,
    title: "Neon District",
    year: 2026,
    rating: "TV-MA",
    genre: "Sci-Fi",
    poster: "/Images/Movies/neon-district.png",
    description: "A hacker navigates a futuristic city where memories can be bought and sold.",
  },
  {
    id: 104,
    title: "The Silent Hour",
    year: 2024,
    rating: "TV-14",
    genre: "Mystery",
    poster: "/Images/Movies/silent-hour.png",
    description: "Every night, a remote town loses an hour—and someone remembers what happens during it.",
  },
  {
    id: 105,
    title: "Kingdom of Ash",
    year: 2025,
    rating: "TV-14",
    genre: "Fantasy",
    poster: "/Images/Movies/kingdom-of-ash.png",
    description: "The last heir to a fallen dynasty searches for the ancient power that destroyed it.",
  },
  {
    id: 106,
    title: "Beyond Earth",
    year: 2026,
    rating: "TV-14",
    genre: "Sci-Fi",
    poster: "/Images/Movies/beyond-earth.png",
    description: "Humanity's first contact with an alien civilization forces Earth to confront its future.",
  },
  {
    id: 107,
    title: "Beyond the Unknown",
    year: 2026,
    rating: "TV-MA",
    genre: "Sci-Fi / Mystery",
    poster: "/Images/Movies/beyond-the-unknown.png",
    backdrop: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2200&q=85",
    description: "At the edge of the known universe, a forgotten signal awakens something humanity was never meant to discover. As reality begins to fracture, one crew must uncover the truth before the darkness reaches Earth.",
    seasons: 2,
  }
];

export const seriesCollections = [
  {
    id: "series-trending",
    title: "Trending Series",
    seriesIds: [101, 103, 102, 104, 105, 106],
  },
  {
    id: "series-scifi",
    title: "Sci-Fi Series",
    seriesIds: [103, 101, 106, 102],
  },
  {
    id: "series-drama",
    title: "Mystery & Drama",
    seriesIds: [104, 102, 105, 101],
  },
];

export function getSeriesByIds(ids: number[]) {
  return ids.map((id) => series.find((show) => show.id === id)).filter((show): show is Movie => show !== undefined);
}
