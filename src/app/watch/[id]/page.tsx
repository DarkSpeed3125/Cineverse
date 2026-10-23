import Link from "next/link";
import { notFound } from "next/navigation";
import { movies } from "@/app/data/movies";
import { series } from "@/app/data/series";
import type { Movie } from "@/app/data/movies";

const allTitles: Movie[] = [...movies, ...series];

type PlayerPageProps = {
    params: Promise<{id: string}>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
    const { id } = await params;
    const title = allTitles.find((item) => String(item.id) === id);

    if (!title) {
        notFound();
    }

    const backdrop = title.backdrop ?? title.poster;

    return(
        <main className="player-page">
            {
                title.videoUrl ? (
                    <video className="player-page__video" src={title.videoUrl} poster={backdrop} controls autoPlay muted playsInline>
                        Your browser does not support video playback.
                    </video>
                ) : (
                    <div className="player-page__still" style={{backgroundImage: `linear-gradient(90deg,rgba(0,0,0,0.65), transparent 85%), linear-gradient(0deg,rgba(0,0,0,0.8), transparent 65%), url("${backdrop}")`}}>
                        <div className="player-page__still-content">
                            <p className="player-page__eyebrow">CINEVERSE ORIGINAL</p>
                            <h1>{title.title}</h1>
                            <p>Cinematic presentation</p>
                        </div>
                    </div>
                )
            }

            <header className="player-page__header">
                <Link href={`/titles/${title.id}`} className="player-page__back">
                    <span aria-hidden="true">←</span>
                    Back to Details
                </Link>

                <span className="player-page__brand">
                    CINEVERSE
                </span>
            </header>
        </main>
    )
}