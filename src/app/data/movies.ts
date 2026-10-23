
export type Movie = {
  id: number;
  title: string;
  year: number;
  rating: string;
  genre: string;
  poster: string;
  description: string;
  videoUrl?: string;
  backdrop?: string;
  previewUrl?: string;
  seasons?: number;
};

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=85`;

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Last Frontier",
    year: 2026,
    rating: "TV-MA",
    genre: "Sci-Fi",
    poster: "/Images/Movies/last-frontier.png",
    backdrop: "/Images/Backdrops/last-frontier-backdrop.png",
    description: "A distant expedition uncovers a mystery buried beyond the stars.",
    videoUrl: "/videos/last-frontier-trailer.mp4"
  },
  {
    id: 2,
    title: "Shadow Protocol",
    year: 2025,
    rating: "R",
    genre: "Thriller",
    poster: "/Images/Movies/shadow-protocol.png",
    backdrop: "/Images/Backdrops/shadow-protocol-backdrop.png",
    description: "An intelligence agent discovers a conspiracy inside her own agency.",
    videoUrl: "/videos/shadow-protocol-trailer.mp4"
  },
  {
    id: 3,
    title: "Kingdom of Ash",
    year: 2025,
    rating: "PG-13",
    genre: "Fantasy",
    poster: "/Images/Movies/kingdom-of-ash.png",
    backdrop: "/Images/Backdrops/kingdom-ofAsh-backdrop.png",
    description: "A fallen kingdom's last heir must reclaim an ancient power.",
    videoUrl: "/videos/kingdom-ofAsh-trailer.mp4"
  },
  {
    id: 4,
    title: "Deep Blue",
    year: 2024,
    rating: "PG-13",
    genre: "Adventure",
    poster: "/Images/Movies/deep-blue.png",
    backdrop: "/Images/Backdrops/deep-blue-backdrop.png",
    description: "A crew ventures into uncharted waters in search of a lost civilization.",
    videoUrl: "/videos/deep-blue-trailer.mp4"
  },
  {
    id: 5,
    title: "Neon District",
    year: 2026,
    rating: "R",
    genre: "Sci-Fi",
    poster: "/Images/Movies/neon-district.png",
    backdrop: "/Images/Backdrops/neon-district-backdrop.png",
    description: "In a city ruled by machines, one hacker discovers a way out.",
    videoUrl: "/videos/neon-district-trailer.mp4"
  },
  {
    id: 6,
    title: "Wild Horizons",
    year: 2025,
    rating: "PG",
    genre: "Adventure",
    poster: "/Images/Movies/wild-horizons.png",
    backdrop: "/Images/Backdrops/wild-horizons-backdrop.png",
    description: "Two explorers cross an untouched wilderness to find their way home.",
    videoUrl: "/videos/wild-horizons-trailer.mp4"
  },
  {
    id: 7,
    title: "The Silent Hour",
    year: 2024,
    rating: "R",
    genre: "Mystery",
    poster: "/Images/Movies/silent-hour.png",
    backdrop: "/Images/Backdrops/silent-hour-backdrop.png",
    description: "A remote town hides a secret that emerges after sunset.",
    videoUrl: "/videos/silent-hour-trailer.mp4"
  },
  {
    id: 8,
    title: "Beyond Earth",
    year: 2026,
    rating: "PG-13",
    genre: "Sci-Fi",
    poster: "/Images/Movies/beyond-earth.png",
    backdrop: "/Images/Backdrops/beyond-earth-backdrop.png",
    description: "Humanity's first contact changes everything we know about existence.",
    videoUrl: "/videos/beyond-earth-trailer.mp4"
  },
];

export const movieCollections = [
  {
    id: "trending",
    title: "Trending Now",
    movieIds: [8, 1, 5, 2, 3, 6, 4, 7],
  },
  {
    id: "popular",
    title: "Popular on Cineverse",
    movieIds: [3, 6, 1, 4, 8, 7, 2, 5],
  },
  {
    id: "scifi",
    title: "Sci-Fi & Beyond",
    movieIds: [1, 5, 8, 2, 4, 3],
  },
  {
    id: "adventure",
    title: "Adventure Awaits",
    movieIds: [6, 4, 3, 8, 1, 7],
  },
];

export function getMoviesByIds(ids: number[]) {
  return ids.map((id) => movies.find((movie) => movie.id === id)).filter((movie): movie is Movie => movie !== undefined);
}
