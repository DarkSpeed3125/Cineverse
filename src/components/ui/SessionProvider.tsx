"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CineverseProfile = {
    id: string;
    name: string;
    color: string;
    isKids?: boolean;
};

const defaultProfiles: CineverseProfile[] = [
    { id: "profile-1", name: "Profile 1", color: "#e50914" },
    { id: "profile-2", name: "Profile 2", color: "#1473e6" },
    { id: "kids", name: "Kids", color: "#46a758", isKids: true },
    { id: "guest", name: "Guest", color: "#8e44ad" },
];

type SessionContextType = {
    isSignedIn: boolean;
    activeProfile: CineverseProfile | null;
    activeProfileId: string | null;
    profiles: CineverseProfile[];
    isLoaded: boolean;
    signIn: () => void;
    signOut: () => void;
    selectProfile: (id: string) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(
    undefined
);

const STORAGE_KEY = "cineverse-session";

export default function SessionProvider({ children }: { children: ReactNode; }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [activeProfileId, setActiveProfileId] = useState<string | null>(
        null
    );
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if(saved) {
                const session: unknown = JSON.parse(saved);

                if(typeof session === "object" && session !== null && "isSignedIn" in session && session.isSignedIn === true) {
                    setIsSignedIn(true);

                    if("activeProfileId" in session && typeof session.activeProfileId === "string" && defaultProfiles.some((profile) => profile.id === session.activeProfileId)) {
                        setActiveProfileId(session.activeProfileId);
                    }
                }
            }
        } catch (error) {
            console.error("Could not restore Cineverse session:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if(!isLoaded) return;

        try{
            localStorage.setItem(STORAGE_KEY, JSON.stringify({isSignedIn, activeProfileId}));
        } catch(error) {
            console.error("Could not save Cineverse session:", error);
        }
    }, [isSignedIn, activeProfileId, isLoaded]);

    const signIn = useCallback(() => {
        setIsSignedIn(true);
        setActiveProfileId(null);
    }, []);

    const signOut = useCallback(() => {
        setIsSignedIn(false);
        setActiveProfileId(null);
    }, []);

    const selectProfile = useCallback((id: string) => {
        if (!defaultProfiles.some((profile) => profile.id === id)) {
            return;
        }

        setActiveProfileId(id);
    }, []);

    const activeProfile = defaultProfiles.find((profile) => profile.id === activeProfileId) ?? null;

    const value = useMemo(() => ({
         isSignedIn,
        activeProfile,
        activeProfileId,
        profiles: defaultProfiles,
        isLoaded,
        signIn,
        signOut,
        selectProfile
    }), [
        isSignedIn,
        activeProfile,
        activeProfileId,
        isLoaded,
        signIn,
        signOut,
        selectProfile,

    ]);

    return(
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if(!context) {
        throw new Error("useSession must be used within SessionProvider.");
    }

    return context;
}
