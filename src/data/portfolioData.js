// ============================================================
// portfolioData.js — Single source of truth for all portfolio content.
// Edit this file to update text, links and lists across the whole site.
// ============================================================

// ─── Personal Info ─────────────────────────────────────────────────────────────
export const personalInfo = {
    name: "KRISHNAKUMAR P",
    firstName: "KRISHNAKUMAR P",
    brandName: "KRISHNAKUMAR P",        // shown in preloader, navbar, footer
    title: "Java Full Stack Developer",
    location: "Bengaluru, India",
    phone: "+91 7695890189",
    emails: {
        primary: "kannan8763@gmail.com",
        secondary: "",
    },
    summary:
        "A passionate Java Full Stack Developer based in Bengaluru, building clean and user-friendly web applications that turn real-world problems into working digital solutions.",
    resumeUrl: "/Resume.pdf",            // place Resume.pdf inside /public
};

// ─── TAP Academy (footer credit — do not change this export) ──────────────────
export const academy = {
    name: "TAP Academy",
    url: "https://thetapacademy.com/",
};

// ─── Social Links ──────────────────────────────────────────────────────────────
export const socialLinks = {
    github: "https://github.com/Krishnan045",
    linkedin: "https://www.linkedin.com/in/krishnakumar-p-955726359/",
    instagram: "", // not provided — leave blank or add later
};

// ─── Hero Section ──────────────────────────────────────────────────────────────
export const heroContent = {
    greeting: "Hi, I'm KRISHNAKUMAR P",
    titleHighlight: "Java Full Stack Developer",
    subtitle:
        "I build full-stack web apps with Java & React — creating clean, efficient, and user-friendly digital experiences.",
    ctaPrimary: { text: "View My Work", href: "#projects" },
    ctaSecondary: {
        text: "Contact Me",
        href: "mailto:kannan8763@gmail.com?subject=Hiring Inquiry – Portfolio&body=Hello,%0D%0A%0D%0AI came across your portfolio and would like to discuss an opportunity with you.%0D%0A%0D%0ABest Regards,",
    },
    ctaResume: { text: "Download Resume", href: "/Resume.pdf" },
};

// ─── About Section ─────────────────────────────────────────────────────────────
export const aboutContent = {
    heading: "Hello!",
    // HTML is rendered with dangerouslySetInnerHTML — keep it your own trusted text.
    bio: `Hi, my name is <span class="text-black text-xl font-black mx-1 tracking-wide uppercase">KRISHNAKUMAR P</span>,
  a Java Full Stack Developer based in Bengaluru, India.
  I enjoy building clean, user-friendly web applications using Java, React, and MySQL —
  turning real-world problems into working digital solutions.
  I'm currently sharpening my skills through the placement training program at TAP Academy.`,
    techStack: ["Java", "React.js", "JavaScript", "MySQL"],
};

// ─── Skills / Process Section ──────────────────────────────────────────────────
export const skillsContent = {
    badge: "My Process",
    heading: "Here's how I turn ideas into real-world products",
    description:
        "A structured four-step approach — from understanding the problem to shipping the solution.",
    cards: [
        {
            number: "01",
            title: "Research",
            text: "I start by understanding the problem deeply — studying user needs, project requirements, and the best technologies before writing a single line of code.",
        },
        {
            number: "02",
            title: "Design",
            text: "I plan the application architecture, choose the right tech stack, and sketch the UI flow so development stays focused and organised.",
        },
        {
            number: "03",
            title: "Develop",
            text: "I write clean, well-structured Java and React code — building features step by step with best practices and version control throughout.",
        },
        {
            number: "04",
            title: "Deploy",
            text: "I test thoroughly, squash bugs, and ship the project using modern tools — then keep iterating based on real feedback.",
        },
    ],
    endText: "Ready to ship!",
};

// ─── Technical Skills ──────────────────────────────────────────────────────────
export const technicalSkills = {
    categories: [
        {
            title: "Programming Language",
            skills: [{ name: "Java" }],
        },
        {
            title: "Web Technologies",
            skills: [
                { name: "React.js" },
                { name: "HTML" },
                { name: "CSS" },
                { name: "JavaScript" },
            ],
        },
        {
            title: "Database",
            skills: [{ name: "MySQL" }],
        },
        {
            title: "Development Tools",
            skills: [
                { name: "Eclipse" },
                { name: "VS Code" },
                { name: "Antigravity" },
                { name: "Claude" },
                { name: "Git & GitHub" },
            ],
        },
    ],
};

// ─── Leadership / Activities ────────────────────────────────────────────────────
// Empty for now — fill in when ready.
export const leadershipList = [];

// ─── Internships / Experience ──────────────────────────────────────────────────
// Empty for now — fill in when ready.
export const internshipsList = [];

// ─── Soft Skills ───────────────────────────────────────────────────────────────
export const softSkillsList = [
    {
        name: "Problem Solving",
        icon: "🧩",
        desc: "I break down complex coding challenges into smaller steps and work through them systematically to reach the best solution.",
    },
    {
        name: "Communication",
        icon: "💬",
        desc: "I explain technical concepts clearly to teammates and stakeholders, making collaboration smooth and productive.",
    },
    {
        name: "Adaptability",
        icon: "🔄",
        desc: "I quickly pick up new frameworks, tools, and project requirements as priorities shift and technology evolves.",
    },
    {
        name: "Time Management",
        icon: "⏱️",
        desc: "I prioritise tasks effectively and plan my work to meet deadlines consistently without sacrificing code quality.",
    },
];

// ─── Projects ──────────────────────────────────────────────────────────────────
// Empty for now — add projects when ready.
export const projects = [];

// ─── Certificates (optional bonus component) ──────────────────────────────────
export const certificates = {
    featured: [],
    viewAllUrl: "https://www.linkedin.com/in/krishnakumar-p-955726359/",
};

// ─── Education ─────────────────────────────────────────────────────────────────
export const education = {
    degree: "B.E. Computer Science",
    institution: "Loyola Institute of Technology",
    cgpa: "2022 - 2026",
    graduation: "2026",
    twelfth: "",
    tenth: "",
};

// ─── Footer ────────────────────────────────────────────────────────────────────
export const footerContent = {
    taglines: [
        "Java Full Stack Developer",
        "Java · React · MySQL · Git",
        "Building solutions, one line at a time.",
    ],
    credential: "B.E. Computer Science — Loyola Institute of Technology",
    copyright: `© ${new Date().getFullYear()} KRISHNAKUMAR P | Built with React`,
};

// ─── EmailJS config (read from .env.local) ─────────────────────────────────────
export const emailjsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
