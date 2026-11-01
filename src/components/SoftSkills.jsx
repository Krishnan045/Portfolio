// SoftSkills.jsx — Professional soft skills on a white section
import { softSkillsList } from '../data/portfolioData';

const TORN_PATH = 'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z';

function SoftSkillCard({ skill, index }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group bg-[#f8f8f8] border border-gray-200 rounded-3xl p-6 min-h-[220px] flex flex-col items-center text-center hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(255,42,42,0.12)] transition-all duration-300"
        >
            {/* Emoji icon in rounded square */}
            <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-red-50 flex items-center justify-center text-3xl mb-4 transition-all duration-300 group-hover:scale-110">
                {skill.icon}
            </div>

            {/* Skill name */}
            <h3 className="font-black text-gray-900 uppercase tracking-wide text-sm mb-3">
                {skill.name}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed">{skill.desc}</p>
        </div>
    );
}

export default function SoftSkills() {
    return (
        <section
            className="bg-white pt-24 pb-32 px-6 md:px-12 relative overflow-hidden bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:60px_60px]"
        >
            {/* Torn-paper divider at top (red → white) */}
            <svg
                className="absolute top-0 left-0 w-full h-12 md:h-20 rotate-180 -translate-y-[1px] pointer-events-none"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d={TORN_PATH} fill="#ff2a2a" />
            </svg>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="inline-flex px-4 py-2 rounded-full border border-gray-200 text-gray-500 text-xs uppercase tracking-widest font-bold mb-4 bg-white">
                        Core Competencies
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase mt-2">
                        Professional Soft Skills
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm md:text-base">
                        The human side of engineering — skills that make collaboration and delivery smooth.
                    </p>
                </div>

                {/* Soft skill cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {softSkillsList.map((skill, index) => (
                        <SoftSkillCard key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
