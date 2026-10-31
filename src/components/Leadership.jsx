// Leadership.jsx — Activities and leadership in a vertical alternating timeline
import { leadershipList } from '../data/portfolioData';

const TORN_PATH = 'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z';

function LeadershipItem({ item, index }) {
    const isEven = index % 2 === 0;
    return (
        <div className="relative flex items-start mb-12">
            {/* Red glowing dot on the timeline line */}
            <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 -translate-x-1/2 rounded-full bg-[#ff2a2a] shadow-[0_0_14px_rgba(255,42,42,0.8)] z-10 shrink-0" />

            {/* Card — alternates left/right on md+ */}
            <div
                data-aos={isEven ? 'fade-right' : 'fade-left'}
                data-aos-delay={index * 150}
                className={`
          ml-12 md:ml-0 w-full md:w-[45%]
          bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6
          ${isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}
        `}
            >
                {/* Badge */}
                <span className="inline-flex px-3 py-1 rounded-full bg-red-600/10 text-red-400 text-xs uppercase tracking-widest font-bold mb-3">
                    {item.badge}
                </span>

                {/* Title */}
                <h3 className="text-lg font-black text-white hover:text-[#ff2a2a] transition-colors duration-200 mb-1">
                    {item.title}
                </h3>

                {/* Role */}
                <p className="font-mono uppercase text-red-400 text-xs tracking-widest mb-3">
                    {item.role}
                </p>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </div>
        </div>
    );
}

export default function Leadership() {
    return (
        <section
            className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 relative overflow-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
        >
            {/* Torn-paper divider at top (red → dark) */}
            <svg
                className="absolute top-0 left-0 w-full h-12 md:h-20 rotate-180 -translate-y-[1px] pointer-events-none"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d={TORN_PATH} fill="#ff2a2a" />
            </svg>

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <span className="inline-flex px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-xs uppercase tracking-widest font-bold mb-4">
                        Activities
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mt-2">
                        Leadership &amp; Engagement
                    </h2>
                    <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm md:text-base">
                        Involvement beyond the code — events, communities and leadership roles.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical gradient line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff2a2a] via-red-500/50 to-white/10" />

                    {leadershipList.map((item, index) => (
                        <LeadershipItem key={item.title} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
