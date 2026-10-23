"use client";

import Link from "next/link";
import MovieRow from "@/components/MovieRow";
import { movies } from "../data/movies";
import { series } from "../data/series";
import type { Movie } from "../data/movies";
import { useWatchlist } from "@/components/ui/WatchlistProvider";

const allTitles : Movie[] = [...movies, ...series];

export default function WatchlistPage() {
    const { watchlistIds, isLoaded } = useWatchlist();

    const watchlistMovies = watchlistIds.map((id) => allTitles.find((title) => title.id === id)).filter((title): title is Movie => title !== undefined);

    return(
        <main className="catalogue-page watchlist-page">
            <section className="catalogue-page__header">
                <p className="catalogue-page__eyebrow">
                    YOUR PERSONAL COLLECTION
                </p>

                <h1>My List</h1>

                <p className="catalogue-page__description">
                    Your favorite stories, all in one place.
                </p>
            </section>

            <div className="catalogue-page__rows">
                {!isLoaded ? (
                    <p>Loading your list...</p>
                ): watchlistMovies.length > 0 ? (
                    <MovieRow title="Saved Titles" movies={watchlistMovies}/>
                ): (
                    <section className="watchlist-page__empty">
                        <h2>Your list is waiting</h2>
                        <p>
                            You haven't added any titles yet.
                            Explore Cineverse and save something
                            you'd like to watch.
                        </p>
                        <Link href="/films">Explore Films</Link>
                    </section>
                )} 
            </div>
        </main>
    )
}