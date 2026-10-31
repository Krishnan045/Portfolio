// Projects.jsx — Project showcase with gradient-bordered glassmorphism cards
import { projects, socialLinks } from '../data/portfolioData';

const GitHubIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.863 10.946c.575.105.784-.25.784-.555 0-.274-.01-1-.015-1.965-3.2.695-3.876-1.542-3.876-1.542-.523-1.33-1.278-1.684-1.278-1.684-1.044-.714.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.758 2.69 1.25 3.347.956.104-.743.4-1.25.729-1.537-2.554-.29-5.24-1.277-5.24-5.685 0-1.255.448-2.283 1.183-3.087-.119-.291-.513-1.46.112-3.044 0 0 .964-.309 3.16 1.178A11.01 11.01 0 0 1 12 6.844c.977.004 1.96.132 2.878.387 2.193-1.487 3.155-1.178 3.155-1.178.627 1.584.233 2.753.114 3.044.737.804 1.182 1.832 1.182 3.087 0 4.42-2.69 5.39-5.254 5.676.413.356.78 1.06.78 2.136 0 1.54-.014 2.784-.014 3.163 0 .308.207.666.79.553A11.502 11.502 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5z" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

function ProjectCard({ project, aosDelay }) {
    const borderClass = project.isFlagship
        ? 'bg-gradient-to-br from-red-500/50 via-white/10 to-red-500/30 hover:from-red-500/70 hover:to-red-500/50'
        : 'bg-white/10 hover:bg-white/15';

    return (
        <div data-aos="fade-up" data-aos-delay={aosDelay}>
            {/* Gradient border wrapper */}
            <div className={`p-[1px] rounded-2xl transition-all duration-300 ${borderClass}`}>
                {/* Inner glass panel */}
                <div className="rounded-2xl p-6 md:p-8 backdrop-blur-md bg-[#111111]/90">

                    {/* Optional badge */}
                    {project.badge && (
                        <span className="inline-flex px-3 py-1 rounded-full bg-red-600/10 text-red-400 text-xs uppercase tracking-widest font-bold mb-4">
                            {project.badge}
                        </span>
                    )}

                    {/* Number + Title */}
                    <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-5xl font-black text-white/10 leading-none select-none">
                            {project.number}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-white">
                            {project.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 mb-6 leading-relaxed">{project.description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.techTags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-white/70 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-200 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3">
                        {project.links.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
                            >
                                <GitHubIcon /> GitHub
                            </a>
                        )}
                        {project.links.demo ? (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2a2a] text-white text-sm font-semibold hover:bg-red-600 transition-all duration-200"
                            >
                                <ExternalLinkIcon /> Live Demo
                            </a>
                        ) : (
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/30 text-sm font-semibold cursor-not-allowed select-none">
                                Demo Coming Soon
                            </span>
                        )}
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
            <div className="max-w-5xl mx-auto">

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
                {projects.length > 0 ? (
                    <div className="flex flex-col gap-6 md:gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                aosDelay={(index + 1) * 100}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty state — projects will be added to portfolioData.js */
                    <div className="text-center py-20" data-aos="fade-up">
                        <p className="text-white/20 text-lg font-mono uppercase tracking-widest">
                            Projects coming soon
                        </p>
                    </div>
                )}

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
