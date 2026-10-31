// Navbar.jsx — Fixed top navigation with mobile hamburger menu
import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const hireMeMailto = `mailto:${personalInfo.emails.primary}?subject=Hiring Inquiry – Portfolio&body=Hello ${personalInfo.name},%0D%0A%0D%0AI came across your portfolio and would like to discuss an opportunity with you.%0D%0A%0D%0ALooking forward to hearing from you.%0D%0ABest Regards,`;

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Listen for scroll and clean up on unmount
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Nav background logic
    const navBg = isOpen
        ? 'bg-[#ff2a2a] py-4'
        : isScrolled
            ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg'
            : 'bg-transparent py-6';

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}
        >
            {/* ── Inner wrapper ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

                {/* ── Logo ── */}
                <a href="#" className="text-white text-2xl font-black tracking-tight">
                    {personalInfo.brandName}
                    <span className="text-[#ff2a2a]">.</span>
                </a>

                {/* ── Desktop links ── */}
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <li key={link}>
                            <a
                                href={`#${link.toLowerCase()}`}
                                className="group relative text-white/80 hover:text-white font-medium transition-colors duration-200"
                            >
                                {link}
                                {/* Animated underline */}
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* ── Desktop Hire Me button ── */}
                <a
                    href={hireMeMailto}
                    className="hidden md:block px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                    Hire Me
                </a>

                {/* ── Mobile hamburger ── */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        // X icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Hamburger icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* ── Mobile dropdown menu ── */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-[#ff2a2a] shadow-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <ul className="flex flex-col px-6 py-4">
                    {navLinks.map((link) => (
                        <li key={link} className="border-b border-white/20 last:border-b-0">
                            <a
                                href={`#${link.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className="block py-3 text-white font-bold text-lg hover:text-black transition-colors duration-200"
                            >
                                {link}
                            </a>
                        </li>
                    ))}
                    {/* Mobile Hire Me */}
                    <li className="mt-4">
                        <a
                            href={hireMeMailto}
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center py-3 bg-white text-[#ff2a2a] font-bold rounded-full"
                        >
                            Hire Me
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
