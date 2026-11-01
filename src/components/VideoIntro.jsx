// VideoIntro.jsx — Video introduction container with white grid pattern & glowing red frame
import { useRef, useState } from 'react';
import { videoIntro } from '../data/portfolioData';
import heroVideo from '../assets/hero/hero.mp4';

const TORN_PATH = 'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z';

export default function VideoIntro() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <section
            id="video-intro"
            className="bg-white pt-20 pb-36 px-6 md:px-12 relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"
        >
            <div className="max-w-4xl mx-auto text-center relative z-10" data-aos="fade-up">
                {/* Badge */}
                <span className="inline-flex px-4 py-1.5 rounded-full border border-gray-300 bg-white/80 text-gray-700 text-xs font-semibold shadow-sm mb-4">
                    {videoIntro.badge}
                </span>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
                    {videoIntro.heading}
                </h2>

                {/* Subtitle */}
                <p className="text-gray-600 mt-3 text-sm md:text-base max-w-xl mx-auto">
                    {videoIntro.subtitle}
                </p>

                {/* Video Player Box with Red Border & Glow */}
                <div className="mt-10 mx-auto max-w-3xl rounded-3xl p-1.5 border-2 border-[#ff2a2a] shadow-[0_12px_45px_rgba(255,42,42,0.28)] bg-black relative group">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                        <video
                            ref={videoRef}
                            src={heroVideo}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover rounded-2xl"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                        />

                        {/* Center Custom Play Button Overlay when paused */}
                        {!isPlaying && (
                            <button
                                type="button"
                                onClick={handlePlayClick}
                                aria-label="Play Introduction Video"
                                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/25 transition-all duration-300 group/btn cursor-pointer"
                            >
                                <div className="w-20 h-20 rounded-full bg-[#ff2a2a] text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,42,42,0.7)] group-hover/btn:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Torn-paper divider at bottom (white → dark #0a0a0a) */}
            <svg
                className="absolute bottom-0 left-0 w-full h-12 md:h-20 translate-y-[1px] pointer-events-none"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d={TORN_PATH} fill="#0a0a0a" />
            </svg>
        </section>
    );
}
