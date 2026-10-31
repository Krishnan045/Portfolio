// Footer.jsx — Full-bleed footer with huge brand name and social links
import { personalInfo, socialLinks, footerContent, academy } from '../data/portfolioData';

// Computed once at module load — not inside render
const currentYear = new Date().getFullYear();

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.863 10.946c.575.105.784-.25.784-.555 0-.274-.01-1-.015-1.965-3.2.695-3.876-1.542-3.876-1.542-.523-1.33-1.278-1.684-1.278-1.684-1.044-.714.08-.7.08-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.758 2.69 1.25 3.347.956.104-.743.4-1.25.729-1.537-2.554-.29-5.24-1.277-5.24-5.685 0-1.255.448-2.283 1.183-3.087-.119-.291-.513-1.46.112-3.044 0 0 .964-.309 3.16 1.178A11.01 11.01 0 0 1 12 6.844c.977.004 1.96.132 2.878.387 2.193-1.487 3.155-1.178 3.155-1.178.627 1.584.233 2.753.114 3.044.737.804 1.182 1.832 1.182 3.087 0 4.42-2.69 5.39-5.254 5.676.413.356.78 1.06.78 2.136 0 1.54-.014 2.784-.014 3.163 0 .308.207.666.79.553A11.502 11.502 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
);

export default function Footer() {
    return (

        <footer className="bg-[#111111] text-[#d4d4d4] py-16 px-6 md:px-12 font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]">

            {/* ── Top row ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
                {/* Col 1 — Taglines */}
                <div className="flex flex-col gap-2">
                    {footerContent.taglines.map((line, i) => (
                        <p key={i} className="uppercase">{line}</p>
                    ))}
                </div>

                {/* Col 2 — Credential + View Work */}
                <div className="flex flex-col gap-2 md:items-center">
                    <p className="uppercase">{footerContent.credential}</p>
                    <a href="#projects" className="underline hover:text-white transition-colors duration-200 uppercase">
                        View Work
                    </a>
                </div>

                {/* Col 3 — Availability */}
                <div className="flex flex-col gap-2 md:items-end">
                    <p className="uppercase">Available for opportunities</p>
                    <p className="text-white/50">{currentYear}</p>
                </div>
            </div>

            {/* ── Huge brand name ── */}
            <div className="py-20 md:py-24 overflow-hidden text-center">
                <h2
                    className="text-[18vw] md:text-[16vw] leading-none font-sans font-bold tracking-tighter lowercase select-none"
                    style={{ color: '#f4f4f4' }}
                >
                    {personalInfo.brandName.toLowerCase()}
                </h2>
            </div>

            {/* ── Bottom row ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-end pt-8 border-t border-white/10">

                {/* Col 1 — Contact link + copyright + TAP Academy credit */}
                <div className="flex flex-col gap-1">
                    <a href="#contact" className="underline hover:text-white transition-colors duration-200 uppercase">
                        Contact
                    </a>
                    <p className="text-white/60 mt-1">{footerContent.copyright}</p>
                    <p className="text-white/40 mt-1">
                        Trained at{' '}
                        <a
                            href={academy.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white transition-colors duration-200"
                        >
                            {academy.name}
                        </a>
                    </p>
                </div>

                {/* Col 2 — Email + social icons */}
                <div className="flex flex-col gap-3 md:items-center">
                    <a
                        href={`mailto:${personalInfo.emails.primary}`}
                        className="underline hover:text-white transition-colors duration-200"
                    >
                        {personalInfo.emails.primary}
                    </a>

                    {/* Social icons row */}
                    <div className="flex gap-4 items-center">
                        {socialLinks.github && (
                            <a
                                href={socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub profile"
                                className="hover:text-white transition-colors duration-200"
                            >
                                <GitHubIcon />
                            </a>
                        )}
                        {socialLinks.linkedin && (
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn profile"
                                className="hover:text-white transition-colors duration-200"
                            >
                                <LinkedInIcon />
                            </a>
                        )}
                        {socialLinks.instagram && (
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram profile"
                                className="hover:text-white transition-colors duration-200"
                            >
                                <InstagramIcon />
                            </a>
                        )}
                    </div>
                </div>

                {/* Col 3 — GitHub explore link */}
                <div className="flex flex-col md:items-end">
                    <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors duration-200 uppercase"
                    >
                        Explore My GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
