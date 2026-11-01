// Internships.jsx — Work Experience container matching Image 2
import { internshipsList } from '../data/portfolioData';

// Smooth wave curve transition from dark (#0a0a0a) to red (#ff2a2a)
const CURVE_WAVE_PATH =
    'M0,64 C320,120, 880,0, 1200,64 L1200,120 L0,120 Z';

export default function Internships() {
    return (
        <section id="experience" className="bg-[#ff2a2a] pt-28 pb-32 px-6 md:px-12 relative overflow-hidden">
            {/* Smooth Top Wave Transition */}
            <svg
                className="absolute top-0 left-0 w-full h-14 md:h-24 rotate-180 -translate-y-[1px] pointer-events-none"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d={CURVE_WAVE_PATH} fill="#0a0a0a" />
            </svg>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-14" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
                        WORK EXPERIENCE
                    </h2>
                    <p className="text-white font-medium mt-3 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        Practical internships where I applied engineering principles and built real-world assets.
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto items-stretch">
                    {internshipsList.map((item, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                            className="w-full bg-black/25 backdrop-blur-md border border-white/15 rounded-[2rem] p-7 md:p-8 text-white shadow-xl hover:scale-[1.02] hover:bg-black/30 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                {/* Duration + Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-white/70 text-xs font-semibold tracking-wider">
                                        {item.duration}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase">
                                        {item.badge}
                                    </span>
                                </div>

                                {/* Role & Org */}
                                <h3 className="text-2xl font-black text-white leading-tight mb-1">
                                    {item.role}
                                </h3>
                                <p className="text-xs md:text-sm font-bold text-white/85 tracking-wider uppercase mb-6">
                                    {item.organization}
                                </p>

                                {/* Skills Gained */}
                                <div className="mb-6">
                                    <p className="text-[11px] text-white/50 uppercase tracking-widest font-bold mb-2.5">
                                        {item.skillsHeading}
                                    </p>
                                    <ul className="space-y-1.5 text-sm text-white/90">
                                        {item.skills.map((skill, sIdx) => (
                                            <li key={sIdx} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="border-t border-white/15 pt-5 mt-auto">
                                <p className="text-[11px] text-white/50 uppercase tracking-widest font-bold mb-3">
                                    {item.techHeading}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tech.map((t, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-medium"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
