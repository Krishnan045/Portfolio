// Services.jsx — Scroll-driven process section with animated SVG path and active tag cards
import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { skillsContent } from '../data/portfolioData';

const DESKTOP_PATH =
    'M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200';
const MOBILE_PATH = 'M 2,0 L 2,100';

// Desktop positions, tilts and AOS config for each of the 4 cards
const CARD_CONFIG = [
    {
        posClass: 'md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6',
        aosType: 'fade-left',
        aosDelay: 100,
    },
    {
        posClass: 'md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6',
        aosType: 'fade-right',
        aosDelay: 200,
    },
    {
        posClass: 'md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3',
        aosType: 'fade-left',
        aosDelay: 300,
    },
    {
        posClass: 'md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%] -rotate-1 md:-rotate-3',
        aosType: 'fade-right',
        aosDelay: 400,
    },
];

// ── TagCard ───────────────────────────────────────────────────────────────────
function TagCard({ number, title, text, className, aosDelay, aosType, pathLength, containerRef }) {
    const [isActive, setIsActive] = useState(false);
    const cardRef = useRef(null);

    // Watch pathLength and activate when the animated line tip passes this card
    useMotionValueEvent(pathLength, 'change', (latest) => {
        if (!cardRef.current || !containerRef.current) return;
        const containerHeight = containerRef.current.offsetHeight;
        const containerRect = containerRef.current.getBoundingClientRect();
        const cardRect = cardRef.current.getBoundingClientRect();
        // Distance from container top to this card's top (stable regardless of scroll)
        const cardTopInContainer = cardRect.top - containerRect.top;
        setIsActive(latest * containerHeight >= cardTopInContainer + 50);
    });

    return (
        <div
            ref={cardRef}
            data-aos={aosType}
            data-aos-delay={aosDelay}
            className={`w-72 sm:w-80 rounded-[2rem] p-2 transition-all duration-700 ${isActive
                    ? 'bg-[#ff2a2a] shadow-[0_0_40px_rgba(255,42,42,0.4)]'
                    : 'bg-white shadow-[0_4px_30px_rgba(0,0,0,0.08)]'
                } ${className}`}
        >
            {/* Punched hole at top */}
            <div
                className={`w-8 h-8 rounded-full border-4 mx-auto mt-2 transition-colors duration-700 ${isActive ? 'border-red-300/50 bg-red-900/30' : 'border-gray-200 bg-white'
                    }`}
            />

            {/* Inner panel */}
            <div
                className={`rounded-[1.5rem] mt-4 p-8 min-h-[220px] transition-colors duration-700 ${isActive ? 'bg-red-700/50' : 'bg-[#f4f4f4]'
                    }`}
            >
                <p
                    className={`font-serif italic text-4xl font-black mb-2 transition-colors duration-700 ${isActive ? 'text-red-200/60' : 'text-gray-200'
                        }`}
                >
                    {number}
                </p>
                <h3
                    className={`text-2xl font-black mb-3 transition-colors duration-700 ${isActive ? 'text-white' : 'text-gray-900'
                        }`}
                >
                    {title}
                </h3>
                <p
                    className={`text-sm leading-relaxed transition-colors duration-700 ${isActive ? 'text-red-100' : 'text-gray-500'
                        }`}
                >
                    {text}
                </p>
            </div>
        </div>
    );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Services() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 20,
        restDelta: 0.001,
    });

    return (
        <section
            id="process"
            ref={containerRef}
            className="bg-white pt-24 pb-32 px-6 md:px-12 relative overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
        >
            <div className="max-w-6xl mx-auto relative md:h-[1350px]">

                {/* ── Header ── */}
                <div
                    className="md:absolute md:top-10 md:left-0 md:w-[450px] z-20"
                    data-aos="fade-up"
                >
                    <span className="inline-flex px-4 py-2 rounded-full border border-gray-200 text-gray-500 text-xs uppercase tracking-widest font-bold mb-4">
                        {skillsContent.badge}
                    </span>
                    <div className="relative mb-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-gray-900">
                            {skillsContent.heading}
                        </h2>
                        {/* Hand-drawn arrow */}
                        <svg
                            className="absolute -bottom-5 right-0 w-10 h-10 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <path d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-2">
                        {skillsContent.description}
                    </p>
                </div>

                {/* ── Desktop animated SVG path ── */}
                <svg
                    className="hidden md:block absolute top-0 left-0 w-full h-[1350px] pointer-events-none z-0"
                    viewBox="0 0 1000 1350"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <mask id="path-mask">
                            {/* Thick white stroke grows with scroll — acts as reveal mask */}
                            <motion.path
                                d={DESKTOP_PATH}
                                stroke="white"
                                strokeWidth={20}
                                fill="none"
                                style={{ pathLength }}
                            />
                        </mask>
                    </defs>
                    {/* Layer 1: faint dashed guide */}
                    <path
                        d={DESKTOP_PATH}
                        stroke="#cbd5e1"
                        strokeWidth={2}
                        fill="none"
                        strokeDasharray="8 10"
                    />
                    {/* Layer 2: solid dashed path revealed by mask */}
                    <path
                        d={DESKTOP_PATH}
                        stroke="black"
                        strokeWidth={2}
                        fill="none"
                        strokeDasharray="8 10"
                        mask="url(#path-mask)"
                    />
                </svg>

                {/* ── Mobile animated vertical line ── */}
                <svg
                    className="md:hidden absolute left-[50%] -translate-x-1/2 top-0 w-4 h-full pointer-events-none z-0"
                    viewBox="0 0 4 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <mask id="path-mask-mobile">
                            <motion.path
                                d={MOBILE_PATH}
                                stroke="white"
                                strokeWidth={4}
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                style={{ pathLength }}
                            />
                        </mask>
                    </defs>
                    <path
                        d={MOBILE_PATH}
                        stroke="#cbd5e1"
                        strokeWidth={2}
                        fill="none"
                        strokeDasharray="4 6"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d={MOBILE_PATH}
                        stroke="black"
                        strokeWidth={2}
                        fill="none"
                        strokeDasharray="4 6"
                        vectorEffect="non-scaling-stroke"
                        mask="url(#path-mask-mobile)"
                    />
                </svg>

                {/* ── Process cards ── */}
                <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 pt-60 md:pt-0">
                    {skillsContent.cards.map((card, index) => (
                        <TagCard
                            key={card.number}
                            number={card.number}
                            title={card.title}
                            text={card.text}
                            className={CARD_CONFIG[index]?.posClass ?? ''}
                            aosType={CARD_CONFIG[index]?.aosType}
                            aosDelay={CARD_CONFIG[index]?.aosDelay}
                            pathLength={pathLength}
                            containerRef={containerRef}
                        />
                    ))}

                    {/* Hand-written end note */}
                    <p
                        className="hidden md:block absolute top-[1250px] left-[60%] text-3xl text-gray-400 rotate-6 select-none pointer-events-none"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        {skillsContent.endText}
                    </p>
                </div>
            </div>
        </section>
    );
}
