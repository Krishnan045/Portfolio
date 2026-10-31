// TechnicalSkills.jsx — Skill categories displayed as glassy cards
import { technicalSkills } from '../data/portfolioData';

function SkillBadge({ name }) {
    return (
        <span className="inline-flex rounded-full px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-red-600/20 hover:border-red-500/30 transition-all duration-200 cursor-default">
            {name}
        </span>
    );
}

function SkillCard({ category, index }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(255,42,42,0.1)] transition-all duration-300"
        >
            <h3 className="font-black text-white uppercase text-sm tracking-wider pb-4 border-b border-white/10 mb-4">
                {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} name={skill.name} />
                ))}
            </div>
        </div>
    );
}

export default function TechnicalSkills() {
    return (
        <section id="skills" className="bg-[#0a0a0a] pt-24 pb-28 px-6 md:px-12 relative overflow-hidden">

            {/* Blurred red ambient circles */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-16 relative z-10" data-aos="fade-up">
                <span className="inline-flex px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-xs uppercase tracking-widest font-bold mb-4">
                    Technical Stack
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase mt-2">
                    My Skillset
                </h2>
                <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm md:text-base">
                    Technologies I use to build reliable, modern web applications from front to back.
                </p>
            </div>

            {/* Skills grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
                {technicalSkills.categories.map((category, index) => (
                    <SkillCard key={category.title} category={category} index={index} />
                ))}
            </div>
        </section>
    );
}
