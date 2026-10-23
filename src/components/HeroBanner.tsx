import Link from "next/link";

export default function HeroBanner() {
    return (
        <section className="hero">
            <div className="hero__backdrop" aria-hidden="true"></div>
            <div className="hero__gradient" aria-hidden="true"></div>

            <div className="hero__content">
                <p className="hero__eyebrow">CINEVERSE ORIGINAL</p>
                <h1 className="hero__title"> BEYOND<br />THE UNKNOWN</h1>

                <div className="hero__metadata">
                    <span className="hero__match">98% Match</span>
                    <span>2026</span>
                    <span className="hero__rating">TV-MA</span>
                    <span>2 Seasons</span>
                </div>

                <p className="hero__description">
                    At the edge of the known universe, a forgotten signal
                    awakens something humanity was never meant to discover.
                    As reality begins to fracture, one crew must uncover the
                    truth before the darkness reaches Earth.
                </p>

                <div className="hero__actions">
                    <Link href="/watch/107" className="hero__button hero__button--play">
                        <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true">
                            <path d="M7 4.5v15l12-7.5z" />
                        </svg>
                        Play
                    </Link>
                    <Link className="hero__button hero__button--info" href="/titles/107" aria-label="More information about Beyond the Unknown">
                        <span className="hero__info-icon">i</span>
                        More Info
                    </Link>
                </div>
            </div>

            <div className="hero__bottom-fade" aria-hidden="true" />
        </section>
    );
}