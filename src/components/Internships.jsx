// Internships.jsx — Work experience cards on a red section
import { internshipsList } from '../data/portfolioData';

// Torn-paper SVG path (same as About divider)
const TORN_PATH = 'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z';

function InternshipCard({ intern, index }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300"
        >
            {/* Top row: duration + badge */}
            <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-white/40 text-xs uppercase tracking-widest">
                    {intern.duration}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest">
                    Internship
                </span>
            </div>

            {/* Role */}
            <h3 className="text-2xl font-black text-white mb-1">{intern.role}</h3>

            {/* Organization */}
            <p className="uppercase text-red-200 text-sm font-bold tracking-widest mb-5">
                {intern.organization}
            </p>

            {/* Skills gained */}
            {intern.skills && intern.skills.length > 0 && (
                <div className="mb-5">
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">
                        Skills Gained:
                    </p>
                    <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                        {intern.skills.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Technologies */}
            {intern.tech && intern.tech.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-3">
                        Technologies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {intern.tech.map((t) => (
                            <span
                                key={t}
                                className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Internships() {
    return (
        <section className="bg-[#ff2a2a] pt-24 pb-32 px-6 md:px-12 relative overflow-hidden">

            {/* Torn-paper divider at top (dark → red) */}
            <svg
                className="absolute top-0 left-0 w-full h-12 md:h-20 rotate-180 -translate-y-[1px] pointer-events-none"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d={TORN_PATH} fill="#0a0a0a" />
            </svg>

            {/* Decorative star */}
            <svg
                className="absolute bottom-[20%] left-8 w-8 h-8 text-black/20 animate-pulse pointer-events-none"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
            </svg>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-black text-black uppercase">
                        Work Experience
                    </h2>
                    <p className="text-red-100 mt-4 max-w-xl mx-auto text-sm md:text-base">
                        Real-world experience building and shipping software solutions.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {internshipsList.map((intern, index) => (
                        <InternshipCard key={`${intern.organization}-${index}`} intern={intern} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
