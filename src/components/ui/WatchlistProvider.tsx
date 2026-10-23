"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type WatchlistContextType = {
    watchlistIds: number[];
    isLoaded: boolean;
    isInWatchlist: (id: number) => boolean;
    toggleWatchlist: (id: number) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
    undefined
);

const STORAGE_KEY = "cineverse-watchlist";

export default function WatchlistProvider({ children}: {children: ReactNode;}) {
    const [watchlistIds, setWatchlistIds] = useState<number[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if(Array.isArray(parsed)) {
                    const validIds = parsed.filter((id): id is number => typeof id === "number" && Number.isInteger(id))
                    setWatchlistIds([...new Set(validIds)]);
                }
            }
        } catch(error) {
            console.error("Could not load My List:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect (() => {
        if(!isLoaded) return;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlistIds));
        } catch(error) {
            console.error("Could not save My List:", error);
        }
    }, [watchlistIds, isLoaded])

    const toggleWatchlist = useCallback((id: number) => {
        setWatchlistIds((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
    }, []);

    const isInWatchlist = useCallback((id: number) => watchlistIds.includes(id), [watchlistIds]);

    const value = useMemo(() => ({
            watchlistIds,
            isLoaded,
            isInWatchlist,
            toggleWatchlist
        }), [watchlistIds, isLoaded, isInWatchlist, toggleWatchlist]
    );

    return(
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    const context = useContext(WatchlistContext);

    if (!context) {
        throw new Error("useWatchlist must be used within WatchlistProvider.");
    }

    return context;
}