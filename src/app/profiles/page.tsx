"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/components/ui/SessionProvider";

export default function ProfilePage() {
    const router = useRouter();

    const { isLoaded, isSignedIn, profiles, selectProfile,} = useSession();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/login");
        }
    }, [isLoaded, isSignedIn, router]);

    function handleSelectProfile(id: string) {
        selectProfile(id);
        router.push("/");
    }

    if(!isLoaded || !isSignedIn) {
        return(
            <main className="profiles-page" aria-busy="true">
                <p className="profiles-loading">
                    Loading profiles...
                </p>
            </main>
        );
    }

    return(
        <main className="profiles-page">
            <Link href="/" className="profiles-page__logo">CINEVERSE</Link>
            <section className="profiles-content">
                 <p className="profiles-content__eyebrow">YOUR CINEVERSE EXPERIENCE</p>
                <h1>Who's watching?</h1>
                <p className="profiles-content__description">Choose a profile to continue exploring.</p>
                <div className="profiles-grid">
                    {
                        profiles.map((profile) => {
                            const avatarLabel = profile.id === "profile-1" ? "1" : profile.id === "profile-2" ? "2" : profile.name.charAt(0).toUpperCase();

                            return(
                                <button key={profile.id} type="button" className="profile-choice" onClick={() => handleSelectProfile(profile.id)} aria-label={`Select ${profile.name} profile`}>
                                    <div className="profile-choice__avatar" style={{backgroundColor: profile.color}}>
                                        <span className="profile-choice__avatar-label" >{avatarLabel}</span>
                                        <span className="profile-choice__name">{profile.name}</span>
                                        {profile.isKids && (
                                            <span className="profile-choice__badge">
                                                Kids profile
                                            </span>
                                        )}
                                    </div>
                                </button>
                            )
                        })
                    }
                </div>

                <p className="profiles-content__hint">
                    Each profile can represent a different viewing
                    experience.
                </p>
            </section>
        </main>
    )
}