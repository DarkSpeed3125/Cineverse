import Link from "next/link";
import { notFound } from "next/navigation";
import { movies } from "@/app/data/movies";
import { series } from "@/app/data/series";
import type { Movie } from "@/app/data/movies";

const allTitles: Movie[] = [...movies, ...series];

type TitlePageProps = {
    params: Promise<{ id: string}>;
}

export default async function TitleDetailsPage({ params }: TitlePageProps) {
    const { id } = await params;
    const title = allTitles.find((item) => String(item.id) === id);

    if(!title) {
        notFound();
    }

    const backdrop = title.backdrop ?? title.poster;
    return(
        <main className="title-details-page">
            <section className="title-details__layout">
                <div className="title-details__content">
                    <p className="title-details__eyebrow">CINEVERSE ORIGINAL</p>
                    <h1 className="title-details__title">{title.title}</h1>

                    <div className="title-details__metadata">
                        <span>{title.year}</span>
                        <span className="title-details__rating">{title.rating}</span>
                        <span>{title.genre}</span>
                        {title.seasons && (<span>{title.seasons} {title.seasons === 1 ? "Season" : "Seasons"}</span>)}
                    </div>
                    <p className="title-details__description">{title.description}</p>
                    <div className="title-details__actions">
                        <Link href={`/watch/${title.id}`} className="title-details__button title-details__button--primary">▶ Play</Link>
                        <Link href="/" className="title-details__button title-details__button--secondary">← Back to Cineverse</Link>
                    </div>
                </div>

                <div className="title-details__scene" style={{backgroundImage: `url("${backdrop}")`}} role="img" aria-label={`Scene artwork for ${title.title}`}>
                    <div className="title-details__scene-label">
                        <span className="title-details__scene-dot">SCENE PREVIEW</span>
                    </div>
                </div>
            </section>
        </main>
    )
}