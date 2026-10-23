"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SearchPanel from "./ui/SearchPanel";
import { useSession } from "./ui/SessionProvider";

const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Series", href: "/series" },
    { label: "Films", href: "/films" },
    { label: "My List", href: "/watchlist" }
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [ searchOpen, setSearchOpen ] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const {isLoaded, isSignedIn, activeProfile, signOut} = useSession();

    useEffect(() => {
        function openSearch() {
            setSearchOpen(true);
            setAccountMenuOpen(false);
        }
        window.addEventListener("cineverse:open-search", openSearch);

        return () => {
            window.removeEventListener("cineverse:open-search", openSearch);
        };
    }, []);

    useEffect(() => {
        setSearchOpen(false);
        setAccountMenuOpen(false);
    }, [pathname]);

    function handleSignOut() {
        setAccountMenuOpen(false);
        signOut();
        router.push("/login");
    }

    const avatarLabel = activeProfile ? activeProfile.id === "profile-1" ? "1" : activeProfile.id === "profile-2" ? "2" : activeProfile.name.charAt(0).toUpperCase() : "C"; 

    if (pathname.startsWith("/watch/") || pathname === "/login" || pathname === "/profiles") {
        return null;
    }

    return (
        <header className="navbar">
            <div className="navbar__left">
                <Link href="/" className="navbar__logo">
                    CINEVERSE
                </Link>

                <nav className="navbar__links" aria-label="Main navigation">
                    {
                        navigationLinks.map((link) => {
                            const isActive = link.href === "/" ? pathname === "/" :  pathname === link.href || pathname.startsWith(`${link.href}`);
                            return(
                                <Link key={link.label} href={link.href} className={isActive ? "is-active" : ""} aria-current={isActive ? "page" : undefined}>
                                    {link.label}
                                </Link>
                            )
                        })
                    }
                </nav>
            </div>

            <div className="navbar__right">
                <button className="navbar__icon" type="button" aria-label="Search" aria-expanded={searchOpen} onClick={() => {
                    setAccountMenuOpen(false);
                    window.dispatchEvent(new Event("cineverse:open-search"));
                }}>
                    <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <circle cx="10.8" cy="10.8" r="6.8" />
                        <path d="m16 16 5 5" />
                    </svg>
                </button>

                <div className="navbar__account">
                    <button className="navbar__profile" type="button" aria-label={activeProfile ? `Account: ${activeProfile.name}` : "Account menu"} aria-expanded={accountMenuOpen} onClick={() => {
                        setSearchOpen(false);
                        setAccountMenuOpen((open) => !open);
                    }} style={{backgroundColor: activeProfile?.color ?? "var(--cineverse-red)"}}>
                        <span>{avatarLabel}</span>
                    </button>
                    {
                        accountMenuOpen && (
                            <div className="navbar__account-menu">
                                <div className="account-menu__summary">
                                    <span>
                                        {isSignedIn ? "CURRENT PROFILE" : "CINEVERSE ACCOUNT"}
                                    </span>
                                    <strong>
                                        {!isLoaded ? "Loading..." : isSignedIn ? activeProfile?.name ?? "Choose a profile" : "Not signed in"}
                                    </strong>

                                    {
                                        !isLoaded ? (
                                            <p className="account-menu__loading">Loading account...</p>
                                        ) : isSignedIn ? (
                                            <>
                                                <button type="button" className="account-menu__item" onClick={() => {
                                                    setAccountMenuOpen(false);
                                                    router.push("/profiles");
                                                }}>
                                                    <span>⇄</span>
                                                    Switch Profiles
                                                </button>

                                                <button type="button" className="account-menu__item account-menu__item--signout" onClick={handleSignOut}>
                                                    <span>↪</span>
                                                    Sign Out
                                                </button>
                                            </>
                                        ) : (
                                            <Link href="/login" className="account-menu__item" onClick={() => setAccountMenuOpen(false)}>
                                                <span>→</span>
                                                Sign In
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                searchOpen && (
                    <SearchPanel onClose={() => setSearchOpen(false)} />
                )
            }
        </header>
    );
}