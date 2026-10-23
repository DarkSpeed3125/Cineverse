import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import { getMoviesByIds, movieCollections  } from "./data/movies";

export default function Home() {
  return (
    <main>
      <HeroBanner />

      <div className="movie-catalogue">
        {movieCollections.map((collection) => (
          <MovieRow key={collection.id} title={collection.title} movies={getMoviesByIds(collection.movieIds)}/>
        ))}
      </div>
    </main>
  );
}
