"use client";

import { useRef } from "react";
import type { Movie } from "@/app/data/movies";
import MovieCard from "./ui/MovieCard";

type MovieRowProps = {
    title: string;
    movies: Movie[];
};

export default function MovieRow({ title, movies }: MovieRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    function scrollRow(direction: "left" | "right") {
        if (!rowRef.current) return;

        const distance = rowRef.current.clientWidth * 0.8;
        rowRef.current.scrollBy({
            left: direction === "right" ? distance : -distance,
            behavior: "smooth"
        });
    }

    return(
        <section className="movie-row">
            <div className="movie-row__heading">
                <h2>{title}</h2>

                <div className="movie-row__controls">
                    <button type="button" onClick={() => scrollRow("left")} aria-label={`Scroll ${title} left`}>‹</button>
                    <button type="button" onClick={() => scrollRow("right")} aria-label={`Scroll ${title} right`}>›</button>
                </div>
            </div>

            <div className="movie-row__viewport" ref={rowRef}>
                <div className="movie-row__track">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    )
}