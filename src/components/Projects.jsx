// Projects.jsx — Clean, minimalist, and elegant project cards with simplified styling and no color clutter
import { projects, socialLinks } from '../data/portfolioData';
import fashionMockup from '../assets/projects/fashion-mockup.png';
import zingbitesMockup from '../assets/projects/zingbites-mockup.png';
import matrixMockup from '../assets/projects/matrix-mockup.png';

const mockupImages = {
    fashion: fashionMockup,
    zingbites: zingbitesMockup,
    matrix: matrixMockup,
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const ExternalIcon = () => (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.863 10.946c.575.105.784-.25.784-.555 0-.274-.01-1-.015-1.965-3.2.695-3.876-1.542-3.876-1.542-.523-1.33-1.278-1.684-1.278-1.684-1.044-.714.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.758 2.69 1.25 3.347.956.104-.743.4-1.25.729-1.537-2.554-.29-5.24-1.277-5.24-5.685 0-1.255.448-2.283 1.183-3.087-.119-.291-.513-1.46.112-3.044 0 0 .964-.309 3.16 1.178A11.01 11.01 0 0 1 12 6.844c.977.004 1.96.132 2.878.387 2.193-1.487 3.155-1.178 3.155-1.178.627 1.584.233 2.753.114 3.044.737.804 1.182 1.832 1.182 3.087 0 4.42-2.69 5.39-5.254 5.676.413.356.78 1.06.78 2.136 0 1.54-.014 2.784-.014 3.163 0 .308.207.666.79.553A11.502 11.502 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5z" />
    </svg>
);

// Unified, minimal tech pill — no distracting rainbow colors
function TechPill({ name }) {
    return (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default">
            {name}
        </span>
    );
}

function ProjectCard({ project, aosDelay }) {
    const mockupSrc = mockupImages[project.id];

    return (
        <div data-aos="fade-up" data-aos-delay={aosDelay} className="w-full">
            {/* ── Main Container: Simple, sleek, dark card without excessive colors ── */}
            <div className="group relative w-full rounded-2xl md:rounded-3xl bg-[#0e0e12] border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
                {/* ── Two-Column Layout: Left Details & Right Mockup ── */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center min-h-[320px]">
                    {/* ── Left Column: Clean, Normal Details ── */}
                    <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 lg:pr-6 flex flex-col justify-center">
                        {/* 1. Category Tag (Simple, monochromatic) */}
                        <div className="mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white/55">
                                {project.badge || 'Project'}
                            </span>
                        </div>

                        {/* 2. Number + Heading */}
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="font-serif italic font-bold text-2xl sm:text-3xl text-white/30 select-none">
                                {project.number}
                            </span>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                                {project.title}
                            </h3>
                        </div>

                        {/* 3. Description (Normal, relaxed & readable) */}
                        <p className="text-white/65 text-sm sm:text-base leading-relaxed font-normal mb-5 max-w-xl">
                            {project.description}
                        </p>

                        {/* 4. Tech Stack Pills (Clean, minimal, uniform) */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            {project.techTags.map((tech) => (
                                <TechPill key={tech} name={tech} />
                            ))}
                        </div>

                        {/* 5. Action Buttons (Live & GitHub) */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Live Demo Button */}
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#ff2a2a] hover:bg-red-600 text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <ExternalIcon />
                                <span>Live Demo</span>
                            </a>

                            {/* GitHub Button */}
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <GitHubIcon />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Right Column: Device Mockup (Sized slightly small & contained) ── */}
                    <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                        <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title} live demo`}
                            className="relative block w-full max-w-[400px] overflow-hidden rounded-xl transition-transform duration-300 ease-out group-hover:scale-105"
                        >
                            <img
                                src={mockupSrc}
                                alt={project.title}
                                className="w-full h-auto object-contain block drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] select-none"
                                loading="lazy"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    return (
        <section
            id="projects"
            className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="inline-flex px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-xs uppercase tracking-widest font-bold mb-4">
                        Featured Projects
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-2">
                        Work that speaks for itself
                    </h2>
                    <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm md:text-base">
                        Real projects built with purpose, performance and clean code in mind.
                    </p>
                </div>

                {/* Project cards */}
                <div className="flex flex-col gap-8 md:gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            aosDelay={(index + 1) * 100}
                        />
                    ))}
                </div>

                {/* Explore GitHub button */}
                {socialLinks.github && (
                    <div className="text-center mt-16" data-aos="fade-up">
                        <a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 group"
                        >
                            <GitHubIcon />
                            Explore All My Repositories
                            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
