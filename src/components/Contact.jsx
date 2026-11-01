// Contact.jsx — Contact section matching reference with smooth scroll parallax
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { emailjsConfig, personalInfo } from '../data/portfolioData';

export default function Contact() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

    // Parallax scroll motion for the backside "CONTACT" text
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Smooth spring physics for fluid motion during scroll
    const rawY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
    const smoothY = useSpring(rawY, { stiffness: 85, damping: 22, restDelta: 0.001 });

    const rawX = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const smoothX = useSpring(rawX, { stiffness: 85, damping: 22, restDelta: 0.001 });

    // Check if EmailJS is properly configured
    const { serviceId, templateId, publicKey } = emailjsConfig;
    const isConfigured =
        serviceId && templateId && publicKey &&
        serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
        templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
        publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        // Read field values
        const firstName = formRef.current?.querySelector('#firstName')?.value?.trim() ?? '';
        const lastName = formRef.current?.querySelector('#lastName')?.value?.trim() ?? '';
        const email = formRef.current?.querySelector('#email')?.value?.trim() ?? '';
        const message = formRef.current?.querySelector('#message')?.value?.trim() ?? '';

        // Validate required fields
        if (!firstName || !email || !message) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        setStatus('sending');

        if (!isConfigured) {
            // Fallback: open native email client
            const body = encodeURIComponent(
                `From: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`
            );
            window.open(
                `mailto:${personalInfo.emails.primary}?subject=Portfolio Contact from ${firstName} ${lastName}&body=${body}`,
                '_blank'
            );
            setStatus('success');
            formRef.current?.reset();
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        // Send via EmailJS (dynamically imported)
        try {
            const { default: emailjs } = await import('@emailjs/browser');
            await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
            setStatus('success');
            formRef.current?.reset();
        } catch (err) {
            console.error('EmailJS error:', err);
            setStatus('error');
        } finally {
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    // Submit button appearance per status
    const btnConfig = {
        idle: {
            label: 'Send Message',
            cls: 'border border-white/40 bg-white/10 hover:bg-white hover:text-[#ff2a2a] text-white',
        },
        sending: {
            label: 'Sending...',
            cls: 'border border-white/20 bg-white/20 text-white/60 cursor-not-allowed',
        },
        success: {
            label: 'Sent Successfully ✓',
            cls: 'border border-green-400 bg-green-500 text-white cursor-default',
        },
        error: {
            label: 'Failed — Try Again',
            cls: 'border border-red-900 bg-red-900 text-white cursor-default',
        },
    };
    const btn = btnConfig[status];

    const inputClasses =
        'bg-transparent border-b border-white/40 pb-3 text-base md:text-lg text-white placeholder-white/40 outline-none focus:border-white transition-colors duration-200 w-full';

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex flex-col justify-end pt-20 md:pt-32"
        >
            {/* ── Giant Bold White Background Text "CONTACT" with Smooth Scroll Motion ── */}
            <motion.div
                style={{ y: smoothY, x: smoothX }}
                className="absolute top-10 md:top-14 left-0 right-0 flex justify-center pointer-events-none z-0 overflow-hidden select-none will-change-transform"
                aria-hidden="true"
            >
                <span
                    className="text-[23vw] md:text-[21vw] font-black uppercase tracking-tighter text-white leading-none whitespace-nowrap"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    CONTACT
                </span>
            </motion.div>

            {/* ── Red Contact Card overlapping the bottom of "CONTACT" ── */}
            <div
                data-aos="fade-up"
                className="relative z-10 w-full md:w-[85%] lg:w-[76%] ml-auto bg-[#ff2a2a] p-8 md:p-14 lg:p-16 mt-28 md:mt-40 shadow-2xl"
            >
                {/* Header row */}
                <div className="mb-10">
                    <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/80 font-bold">
                        Reach Me
                    </p>
                </div>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
                        {/* Left column */}
                        <div className="flex flex-col gap-7">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="firstName" className="text-sm font-semibold text-white/90">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="first_name"
                                    type="text"
                                    required
                                    className={inputClasses}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="lastName" className="text-sm font-semibold text-white/90">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="last_name"
                                    type="text"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-sm font-semibold text-white/90">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="user_email"
                                    type="email"
                                    required
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="flex flex-col gap-1.5 h-full">
                            <label htmlFor="message" className="text-sm font-semibold text-white/90">
                                Type your message here
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className={`${inputClasses} resize-none min-h-[140px] md:h-full`}
                            />
                        </div>
                    </div>

                    {/* Bottom row: permission checkbox & notes on left, submit button on right */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/20 pt-8">
                        <div className="flex flex-col gap-3 max-w-lg">
                            {/* Checkbox */}
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 accent-white cursor-pointer shrink-0"
                                />
                                <span className="text-xs md:text-sm text-white/85 group-hover:text-white transition-colors duration-200">
                                    I give permission to contact me at this email address.
                                </span>
                            </label>

                            {/* Response note */}
                            <div className="text-xs text-white/75 leading-relaxed space-y-1">
                                <p>
                                    Your message will be sent directly to my inbox. I typically respond within 24-48 hours.
                                </p>
                                <p>
                                    For urgent inquiries, reach me at{' '}
                                    <a
                                        href={`mailto:${personalInfo.emails.primary}`}
                                        className="underline font-semibold hover:text-white transition-colors duration-200"
                                    >
                                        {personalInfo.emails.primary}
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={status !== 'idle'}
                            className={`group flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm tracking-wider transition-all duration-300 whitespace-nowrap shadow-md ${btn.cls}`}
                        >
                            {status === 'sending' && (
                                <svg className="w-4 h-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {btn.label}
                            {status === 'idle' && (
                                <svg
                                    className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
