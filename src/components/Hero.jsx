// Hero.jsx — Full-screen landing section with pure video hero, 5.5s corner transition, and auto-return
import { useRef, useEffect, useState, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroVideo from '../assets/hero/hero.mp4';
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
    </div>
);

export default function Hero() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCornerOccupied, setIsCornerOccupied] = useState(false);

    // Initialise AOS once and refresh after full page load
    useEffect(() => {
        AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
        const refresh = () => AOS.refresh();
        window.addEventListener('load', refresh);
        return () => window.removeEventListener('load', refresh);
    }, []);

    // Video completed: resets state, sets time to 0, and returns cleanly within 2 seconds
    const handleEnded = useCallback(() => {
        setIsPlaying(false);
        // Display completed screen briefly (1s) and return to full screen within 2 seconds with Play Reel button ready
        setTimeout(() => {
            setIsCornerOccupied(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }, 1000);
    }, []);

    // High-precision frame loop so the 5.5s minimization triggers at the exact millisecond with zero jitter
    useEffect(() => {
        let animId;
        const checkFrame = () => {
            if (videoRef.current && !videoRef.current.paused) {
                const currentTime = videoRef.current.currentTime;
                const duration = videoRef.current.duration;

                if (duration && currentTime >= duration - 0.15) {
                    handleEnded();
                    return;
                }

                if (currentTime >= 5.5 && !isCornerOccupied) {
                    setIsCornerOccupied(true);
                } else if (currentTime < 5.5 && isCornerOccupied) {
                    setIsCornerOccupied(false);
                }
            }
            if (isPlaying) {
                animId = requestAnimationFrame(checkFrame);
            }
        };

        if (isPlaying) {
            animId = requestAnimationFrame(checkFrame);
        }

        return () => {
            if (animId) cancelAnimationFrame(animId);
        };
    }, [isPlaying, isCornerOccupied, handleEnded]);

    // Fallback monitor for timeupdate event
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const { currentTime, duration } = videoRef.current;
            if (duration && currentTime >= duration - 0.15) {
                handleEnded();
                return;
            }
            if (currentTime >= 5.5 && !isCornerOccupied) {
                setIsCornerOccupied(true);
            } else if (currentTime < 5.5 && isCornerOccupied) {
                setIsCornerOccupied(false);
            }
        }
    };

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    // Reset video and return to initial homepage state immediately
    const resetVideo = useCallback((e) => {
        e?.stopPropagation();
        handleEnded();
    }, [handleEnded]);

    // Toggle video play / pause
    const toggleVideo = (e) => {
        e?.stopPropagation();
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play()
                .catch((err) => {
                    console.warn('Playback error, retrying muted:', err);
                    video.muted = true;
                    video.play().catch((e) => console.error('Video play failed:', e));
                });
        }
    };

    // Support closing video with Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isPlaying) {
                resetVideo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, resetVideo]);

    return (
        <section
            id="home"
            className="relative w-full h-screen overflow-hidden bg-[#ff2a2a]"
        >
            {/* ── Video Player Container (Pure video hero — full screen initially, seamlessly transitions without box type after 5.5s) ── */}
            <div
                style={{ willChange: 'top, left, bottom, right' }}
                className={`absolute z-10 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCornerOccupied
                        ? 'top-[48%] md:top-0 bottom-0 left-0 md:left-[48%] right-0 md:[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_100%)]'
                        : 'top-0 bottom-0 left-0 right-0'
                }`}
            >
                <video
                    ref={videoRef}
                    src={heroVideo}
                    className="w-full h-full object-cover object-center md:object-[60%_center] cursor-pointer"
                    playsInline
                    preload="auto"
                    onClick={toggleVideo}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onEnded={handleEnded}
                    onTimeUpdate={handleTimeUpdate}
                />
            </div>

            {/* ── Readability gradient overlay (Ensures left-side text is always crisp and readable) ── */}
            <div className="absolute inset-0 z-[15] pointer-events-none bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

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
            </div>

            {/* ── Content container (Text, CTAs, Play Reel button) ── */}
            <div
                className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-[8%] flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end pointer-events-none"
            >
                {/* ── Left block (interactive) ── */}
                <div className="max-w-2xl flex flex-col gap-5 pointer-events-auto">
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

                        {/* Resume */}
                        {heroContent.ctaResume && heroContent.ctaResume.href && (
                            <a
                                href={heroContent.ctaResume.href}
                                download="KRISHNAKUMAR_P_Resume.pdf"
                                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 text-white font-semibold transition-all duration-200 hover:bg-white/10"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                </svg>
                                {heroContent.ctaResume.text}
                            </a>
                        )}
                    </div>
                </div>

                {/* ── Right block — Play Reel control (interactive) ── */}
                <div
                    className={`flex flex-col items-center gap-2 mt-8 md:mt-0 pointer-events-auto transition-all duration-500 ease-out ${
                        isPlaying && isCornerOccupied ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
                    }`}
                >
                    <button
                        type="button"
                        onClick={toggleVideo}
                        aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
                        className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#ff2a2a] hover:shadow-[0_0_30px_rgba(255,42,42,0.6)] cursor-pointer group"
                    >
                        {isPlaying ? (
                            /* Pause icon */
                            <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            /* Play triangle */
                            <svg className="w-5 h-5 md:w-7 md:h-7 text-white ml-1 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                    <span className="text-white text-[10px] uppercase tracking-widest font-semibold select-none">
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
