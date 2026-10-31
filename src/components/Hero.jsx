// Hero.jsx — Full-screen landing section with portrait background and play control
import { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroPoster from '../assets/about/profile.png';
import { heroContent, socialLinks } from '../data/portfolioData';

// ── Social icon paths ─────────────────────────────────────────────────────────
const SocialBar = ({ className = '' }) => (
    <div className={`flex gap-4 items-center ${className}`}>
        {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"
                className="text-white/60 hover:text-white hover:scale-125 transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.863 10.946c.575.105.784-.25.784-.555 0-.274-.01-1-.015-1.965-3.2.695-3.876-1.542-3.876-1.542-.523-1.33-1.278-1.684-1.278-1.684-1.044-.714.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.758 2.69 1.25 3.347.956.104-.743.4-1.25.729-1.537-2.554-.29-5.24-1.277-5.24-5.685 0-1.255.448-2.283 1.183-3.087-.119-.291-.513-1.46.112-3.044 0 0 .964-.309 3.16 1.178A11.01 11.01 0 0 1 12 6.844c.977.004 1.96.132 2.878.387 2.193-1.487 3.155-1.178 3.155-1.178.627 1.584.233 2.753.114 3.044.737.804 1.182 1.832 1.182 3.087 0 4.42-2.69 5.39-5.254 5.676.413.356.78 1.06.78 2.136 0 1.54-.014 2.784-.014 3.163 0 .308.207.666.79.553A11.502 11.502 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5z" />
                </svg>
            </a>
        )}
        {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
                className="text-white/60 hover:text-white hover:scale-125 transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            </a>
        )}
        {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram profile"
                className="text-white/60 hover:text-white hover:scale-125 transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
            </a>
        )}
    </div>
);

export default function Hero() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Initialise AOS once and refresh after full page load
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
        const refresh = () => AOS.refresh();
        window.addEventListener('load', refresh);
        return () => window.removeEventListener('load', refresh);
    }, []);

    // Toggle video play / pause (silent fail when no source is loaded)
    const toggleVideo = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            video.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden bg-[#ff2a2a]">

            {/* ── Background video / poster image ── */}
            {/* Drop hero.mp4 into src/assets/hero/ to enable video playback */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain object-top md:object-right z-0"
                playsInline
                poster={heroPoster}
                onEnded={() => setIsPlaying(false)}
            />

            {/* ── Readability gradient overlay ── */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/45 via-black/10 to-transparent" />

            {/* ── Left floating social bar (desktop only) ── */}
            <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 mix-blend-difference">
                {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"
                        className="text-white/60 hover:text-white hover:scale-125 transition-all duration-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.863 10.946c.575.105.784-.25.784-.555 0-.274-.01-1-.015-1.965-3.2.695-3.876-1.542-3.876-1.542-.523-1.33-1.278-1.684-1.278-1.684-1.044-.714.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.758 2.69 1.25 3.347.956.104-.743.4-1.25.729-1.537-2.554-.29-5.24-1.277-5.24-5.685 0-1.255.448-2.283 1.183-3.087-.119-.291-.513-1.46.112-3.044 0 0 .964-.309 3.16 1.178A11.01 11.01 0 0 1 12 6.844c.977.004 1.96.132 2.878.387 2.193-1.487 3.155-1.178 3.155-1.178.627 1.584.233 2.753.114 3.044.737.804 1.182 1.832 1.182 3.087 0 4.42-2.69 5.39-5.254 5.676.413.356.78 1.06.78 2.136 0 1.54-.014 2.784-.014 3.163 0 .308.207.666.79.553A11.502 11.502 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5z" />
                        </svg>
                    </a>
                )}
                {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
                        className="text-white/60 hover:text-white hover:scale-125 transition-all duration-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                )}
                {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram profile"
                        className="text-white/60 hover:text-white hover:scale-125 transition-all duration-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                        </svg>
                    </a>
                )}
            </div>

            {/* ── Content container ── */}
            <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-[8%] flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end">

                {/* ── Left block ── */}
                <div className="max-w-2xl flex flex-col gap-5">

                    {/* Mobile social icons */}
                    <div data-aos="fade-up">
                        <SocialBar className="lg:hidden mb-2" />
                    </div>

                    {/* Heading */}
                    <h1
                        className="text-white text-3xl md:text-5xl font-bold leading-tight"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        {heroContent.greeting},
                        <br />
                        <span className="text-black">{heroContent.titleHighlight}</span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-white text-sm md:text-lg font-semibold max-w-md leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {heroContent.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-wrap gap-3 mt-2"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        {/* Primary */}
                        <a
                            href={heroContent.ctaPrimary.href}
                            className="px-6 py-3 rounded-full bg-white text-black font-semibold transition-transform duration-200 hover:scale-105 shadow-lg"
                        >
                            {heroContent.ctaPrimary.text}
                        </a>

                        {/* Secondary */}
                        <a
                            href={heroContent.ctaSecondary.href}
                            className="px-6 py-3 rounded-full bg-black/40 border border-white text-white font-semibold backdrop-blur-md transition-all duration-200 hover:bg-black/60"
                        >
                            {heroContent.ctaSecondary.text}
                        </a>

                        {/* Resume — only shown if ctaResume is not null */}
                        {heroContent.ctaResume && heroContent.ctaResume.href && (
                            <a
                                href={heroContent.ctaResume.href}
                                download
                                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 text-white font-semibold transition-all duration-200 hover:bg-white/10"
                            >
                                {/* Download icon */}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                </svg>
                                {heroContent.ctaResume.text}
                            </a>
                        )}
                    </div>
                </div>

                {/* ── Right block — Play Reel control ── */}
                <div
                    className="flex flex-col items-center gap-2 mt-8 md:mt-0"
                    data-aos="zoom-in"
                    data-aos-delay="600"
                >
                    <button
                        type="button"
                        onClick={toggleVideo}
                        aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
                        className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#ff2a2a] hover:shadow-[0_0_30px_rgba(255,42,42,0.6)]"
                    >
                        {isPlaying ? (
                            /* Pause icon */
                            <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            /* Play triangle */
                            <svg className="w-5 h-5 md:w-7 md:h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                    <span className="text-white text-[10px] uppercase tracking-widest">
                        {isPlaying ? 'Pause' : 'Play Reel'}
                    </span>
                </div>
            </div>

            {/* ── Bouncing scroll indicator ── */}
            <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none z-20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}
