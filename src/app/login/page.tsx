"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/components/ui/SessionProvider"

export default function LoginPage() {
    const router = useRouter();
    const { signIn, isLoaded, isSignedIn } = useSession();

    const [email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        if(isLoaded && isSignedIn) {
            router.replace("/profiles");
        }
    }, [isLoaded, isSignedIn, router])

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!email.trim() || !password) return;

        signIn();
    }

    if (!isLoaded || isSignedIn) {
        return <main className="login-page" aria-busy="true"></main>
    }

    return(
        <main className="login-page">
            <div className="login-page__glow" aria-hidden="true"></div>
            <Link href="/" className="login-page__logo">CINEVERSE</Link>

            <section className="login-card">
                <p className="login-card__eyebrow">
                    YOUR NEXT OBSESSION
                </p>

                <h1>Welcome back.</h1>

                <p className="login-card__description">
                    Sign in and discover a universe of stories.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    <button type="submit">Sign In</button>
                </form>

                <p className="login-card__footer">
                    New to Cineverse?{" "}
                    <span>Your next story starts here.</span>
                </p>
            </section>

            <p className="login-page__disclaimer">Portfolio demonstration · No real account required</p>
        </main>
    );
}