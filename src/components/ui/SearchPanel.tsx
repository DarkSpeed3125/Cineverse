"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { movies } from "@/app/data/movies";
import { series } from "@/app/data/series";
import type { Movie } from "@/app/data/movies";

type SearchPanelProps = {
    onClose: () => void;
};

const allTitles: Movie[] = [...movies, ...series];

export default function SearchPanel({ onClose }: SearchPanelProps) {
    const [ query, setQuery ] = useState("");

    const results = useMemo(() => {
        const term = query.trim().toLowerCase();

        if(!term) return [];
        return allTitles.filter((title) => [
            title.title,
            title.genre,
            title.description,
            String(title.year)
        ].join(" ").toLowerCase().includes(term)).slice(0, 8);
    }, [query]);

    return(
        <section className="search-panel" aria-label="Search Cineverse">
            <div className="search-panel__input-wrap">
                <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16 16 4 4" />
                </svg>

                <input autoFocus type="search" placeholder="Titles, genres, and more" aria-label="Search titles" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => {if (event.key === "Escape") onClose();}} />

                <button type="button" className="search-panel__close" onClick={onClose} aria-label="Close search">✕</button>
            </div>

            {
                query.trim() && (
                    <div className="search-panel__results">
                        {results.length > 0 ? (
                            results.map((title) => (
                                <Link key={title.id} href={`/titles/${title.id}`} className="search-panel__result" onClick={onClose}>
                                    <div className="search-panel__poster" style={{backgroundImage: `url("${title.poster}")`}} aria-hidden="true"></div>
                                    <div className="search-panel__result-info">
                                        <span className="search-panel__result-title">{title.title}</span>
                                        <span className="search-panel__result-meta">{title.year} · {title.rating} · {title.genre}</span>
                                        <span className="search-panel__result-description">{title.description}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="search-panel__empty">
                                No titles found for “{query}”.
                            </p>
                        )}
                    </div>
                )
            }
        </section>
    );
}