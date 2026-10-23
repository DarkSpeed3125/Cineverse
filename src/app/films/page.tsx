
import MovieRow from "@/components/MovieRow";
import { getMoviesByIds, movieCollections } from "../data/movies";

export default function FilmsPage() {
    return (
        <main className="catalogue-page films-page">
            <section className="catalogue-page__header">
                <p className="catalogue-page__eyebrow">
                    YOUR NEXT MOVIE NIGHT
                </p>

                <h1>Films</h1>

                <p className="catalogue-page__description">
                    From unforgettable adventures to thrilling mysteries,
                    discover your next favorite movie on Cineverse.
                </p>
            </section>

            <div className="catalogue-page__rows">
                {movieCollections.map((collection) => (
                    <MovieRow
                        key={collection.id}
                        title={collection.title}
                        movies={getMoviesByIds(collection.movieIds)}
                    />
                ))}
            </div>
        </main>
    );
}
