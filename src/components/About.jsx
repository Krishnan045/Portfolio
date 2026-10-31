// About.jsx — About me section with a flip-card ID badge and bio
import { useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import stackImage from '../assets/about/profile.png';
import { aboutContent, personalInfo, socialLinks } from '../data/portfolioData';

// ── Shared icon helper (mini inline SVG for visiting card rows) ───────────────
const RowIcon = ({ path }) => (
    <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
    </svg>
);

// Common icon paths
const ICONS = {
    email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    link: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
};

// ── Back face — visiting card ────────────────────────────────────────────────
function VisitingCardBack({ onLinkClick }) {
    const qrValue = socialLinks.linkedin || `mailto:${personalInfo.emails.primary}`;
    return (
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#141414] to-[#1f1f1f] rounded-2xl overflow-hidden flex flex-col">
            {/* Red top bar */}
            <div className="w-full h-1.5 bg-[#ff2a2a] shrink-0" />

            <div className="p-5 flex flex-col gap-3 flex-1 min-h-0">
                {/* Brand name */}
                <div>
                    <p className="text-xl font-black text-white leading-none">
                        {personalInfo.brandName}
                        <span className="text-[#ff2a2a]">.</span>
                    </p>
                    <p className="text-xs uppercase tracking-widest text-red-400 mt-1">
                        {personalInfo.title}
                    </p>
                </div>

                {/* Divider */}
                <hr className="border-white/10" />

                {/* Contact rows */}
                <div className="flex flex-col gap-2">
                    {personalInfo.emails.primary && (
                        <a href={`mailto:${personalInfo.emails.primary}`} onClick={onLinkClick}
                            className="flex items-center gap-2 text-xs text-white/85 hover:text-white transition-colors duration-150">
                            <RowIcon path={ICONS.email} />
                            <span className="truncate">{personalInfo.emails.primary}</span>
                        </a>
                    )}
                    {personalInfo.phone && (
                        <a href={`tel:${personalInfo.phone}`} onClick={onLinkClick}
                            className="flex items-center gap-2 text-xs text-white/85 hover:text-white transition-colors duration-150">
                            <RowIcon path={ICONS.phone} />
                            <span>{personalInfo.phone}</span>
                        </a>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-center gap-2 text-xs text-white/85">
                            <RowIcon path={ICONS.location} />
                            <span>{personalInfo.location}</span>
                        </div>
                    )}
                    {socialLinks.linkedin && (
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" onClick={onLinkClick}
                            className="flex items-center gap-2 text-xs text-white/85 hover:text-white transition-colors duration-150">
                            <RowIcon path={ICONS.link} />
                            <span>LinkedIn</span>
                        </a>
                    )}
                    {socialLinks.github && (
                        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" onClick={onLinkClick}
                            className="flex items-center gap-2 text-xs text-white/85 hover:text-white transition-colors duration-150">
                            <RowIcon path={ICONS.link} />
                            <span>GitHub</span>
                        </a>
                    )}
                </div>

                {/* QR Code */}
                <div className="mt-auto flex items-center gap-3">
                    <div className="bg-white rounded-lg p-2 shrink-0">
                        <QRCode value={qrValue} size={76} />
                    </div>
                    <span className="text-[10px] text-white/60 leading-snug">
                        Scan to<br />connect
                    </span>
                </div>
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function About() {
    const [flipped, setFlipped] = useState(false);

    // Stop links on the back from triggering the flip
    const handleLinkClick = (e) => e.stopPropagation();

    return (
        <section id="about" className="bg-[#ff2a2a] pt-20 pb-40 px-6 md:px-12 relative overflow-hidden">

            {/* ── Decorative stars ── */}
            <svg className="absolute top-8 right-8 w-8 h-8 text-black/30 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
            </svg>
            <svg className="absolute bottom-28 left-8 w-6 h-6 text-black/30 animate-pulse" viewBox="0 0 24 24" fill="currentColor"
                style={{ animationDelay: '1s' }}>
                <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
            </svg>

            {/* ── Inner layout ── */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

                {/* ── Left — ID badge drop animation ── */}
                <motion.div
                    className="md:w-[350px] shrink-0 relative flex flex-col items-center pt-32"
                    initial={{ y: -300, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ type: 'spring', stiffness: 110, damping: 9, mass: 1.1 }}
                >
                    {/* Lanyard string */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-32 bg-black rounded-sm z-0" />

                    {/* Clip rectangle */}
                    <div className="relative z-10 w-7 h-5 bg-gray-400 rounded-sm mb-1 shadow-inner" />

                    {/* ── Flip card wrapper ── */}
                    <button
                        type="button"
                        aria-label="Flip ID card"
                        onClick={() => setFlipped((f) => !f)}
                        className="relative w-full max-w-[280px] -rotate-3 hover:rotate-0 transition-transform duration-500 [perspective:1200px] focus:outline-none"
                    >
                        {/* Inner flip container */}
                        <div
                            className="relative w-full aspect-[3/4] transition-transform duration-700 [transform-style:preserve-3d]"
                            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        >
                            {/* ── FRONT face ── */}
                            <div className="absolute inset-0 [backface-visibility:hidden] bg-gray-900 rounded-2xl p-3 shadow-2xl flex flex-col overflow-hidden">
                                {/* Cutout slot */}
                                <div className="w-14 h-2 bg-gray-700 rounded-full mx-auto mb-3 shrink-0" />
                                {/* Portrait */}
                                <img
                                    src={stackImage}
                                    alt="KRISHNAKUMAR P — Java Full Stack Developer, TAP Academy student"
                                    className="w-full flex-1 object-cover object-top rounded-xl min-h-0"
                                />
                            </div>

                            {/* ── BACK face ── */}
                            <VisitingCardBack onLinkClick={handleLinkClick} />
                        </div>
                    </button>

                    {/* Flip hint */}
                    <p className="text-xs font-bold text-black/60 mt-4">Tap the card to flip ↻</p>
                </motion.div>

                {/* ── Right — Bio text ── */}
                <div className="flex-1 pt-12" data-aos="fade-left">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
                        {aboutContent.heading}
                    </h2>
                    {/* Bio rendered as HTML (trusted own content from portfolioData) */}
                    <p
                        className="text-lg font-bold leading-relaxed text-red-50"
                        dangerouslySetInnerHTML={{ __html: aboutContent.bio }}
                    />
                </div>
            </div>

            {/* ── Torn-paper SVG divider ── */}
            <svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"
                    fill="white"
                />
            </svg>
        </section>
    );
}
