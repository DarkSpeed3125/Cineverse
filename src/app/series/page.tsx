import MovieRow from "@/components/MovieRow";
import { getSeriesByIds, seriesCollections } from "../data/series";

export default function SeriesPage() {
    return(
        <main className="catalogue-page series-page">
            <section className="catalogue-page__header">
                <p className="catalogue-page__eyebrow">YOUR NEXT OBSESSION</p>
                <h1>Series</h1>
                <p className="catalogue-page__description">
                    Discover unforgettable stories, from gripping mysteries
                    to distant galaxies and worlds filled with magic.
                </p>
            </section>

            <div className="catalogue-page__rows">
                {seriesCollections.map((collection) => (
                    <MovieRow key={collection.id} title={collection.title} movies={getSeriesByIds(collection.seriesIds)}/>
                ))}
            </div>
        </main>
    )
}