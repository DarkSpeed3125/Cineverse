"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Movie } from "@/app/data/movies";
import { useWatchlist } from "./WatchlistProvider";

type MovieCardProps = {
    movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
    const [isActive, setIsActive] = useState(false);
    const activationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { isInWatchlist, toggleWatchlist } = useWatchlist();
    const isInList = isInWatchlist(movie.id);

    function activateCard() {
        if (activationTimer.current) {
            clearTimeout(activationTimer.current)
        }

        activationTimer.current = setTimeout(() => {
            setIsActive(true);
        }, 350);
    }

    function deactivateCard() {
        if (activationTimer.current) {
            clearTimeout(activationTimer.current);
            activationTimer.current = null;
        }

        setIsActive(false);
    }

    return(
        <article className={`movie-card ${isActive ? "movie-card--active" : ""}`} onMouseEnter={activateCard} onMouseLeave={deactivateCard} onFocusCapture={() => setIsActive(true)} onBlurCapture={(event) => {
            if(!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                deactivateCard();
            }
        }}>
            <div className="movie-card__poster" style={{backgroundImage: `url("${movie.poster}")`}} role="img" aria-label={`${movie.title} artwork`}>
                {movie.previewUrl && isActive && (
                    <video className="movie-card__preview" src={movie.previewUrl} autoPlay muted loop playsInline aria-hidden="true" />
                )}
                <div className="movie-card__overlay">
                    <div className="movie-card__actions">
                        <Link href={`/watch/${movie.id}`} className="movie-card__action movie-card__action--play" aria-label={`Play ${movie.title}`} title="Play">
                            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                                <path d="M7 4.5v15l12-7.5z" />
                            </svg>
                        </Link>

                        <button type="button" aria-label={isInList ? `Remove ${movie.title} from My List` : `Add ${movie.title} to My List`} title={isInList ? "Remove from My List" : "Add to My List"} onClick={() => toggleWatchlist(movie.id)} className="movie-card__action">
                            {isInList ? "✓" : "+"}
                        </button>

                        <Link href={`/titles/${movie.id}`} className="movie-card__action" aria-label={`More information about ${movie.title}`} title="More Info">
                            <span aria-hidden="true">i</span>
                        </Link>
                    </div>

                    <h3 className="movie-card__title">{movie.title}</h3>

                    <div className="movie-card__metadata">
                        <span>{movie.year}</span>
                        <span className="movie-card__rating">{movie.rating}</span>
                    </div>

                    <p className="movie-card__genre">{movie.genre}</p>
                </div>
            </div>
        </article>
    )
}