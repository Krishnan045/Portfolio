// Contact.jsx — Contact section with parallax background and EmailJS / mailto fallback
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { emailjsConfig, personalInfo, socialLinks } from '../data/portfolioData';

const INPUT_CLASS =
    'bg-transparent border-b border-white/40 pb-3 text-lg text-white placeholder-white/50 outline-none focus:border-white transition-colors duration-200 w-full';

export default function Contact() {
    const ref = useRef(null);
    const formRef = useRef(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

    // Parallax: giant background word drifts as user scrolls
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);

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

        // Send via EmailJS (dynamically imported to keep initial bundle small)
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
            cls: 'border-2 border-white text-white hover:bg-white hover:text-[#ff2a2a]',
        },
        sending: {
            label: 'Sending...',
            cls: 'border-2 border-white/30 bg-white/20 text-white/60 cursor-not-allowed',
        },
        success: {
            label: 'Sent Successfully ✓',
            cls: 'border-2 border-green-400 bg-green-500 text-white cursor-default',
        },
        error: {
            label: 'Failed — Try Again',
            cls: 'border-2 border-red-900 bg-red-900 text-white cursor-default',
        },
    };
    const btn = btnConfig[status];

    return (
        <section
            ref={ref}
            id="contact"
            className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 border-t border-gray-900"
        >
            {/* ── Parallax giant background word ── */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
                aria-hidden="true"
            >
                <div
                    className="text-[25vw] leading-[0.75] font-black uppercase tracking-tighter select-none text-white/[0.04] scale-y-[1.6] origin-top"
                    style={{ fontFamily: "'Impact','Arial Black',sans-serif" }}
                >
                    Contact
                </div>
            </motion.div>

            {/* ── Red contact card ── */}
            <div
                data-aos="fade-up"
                className="relative z-10 w-full md:w-[85%] lg:w-[75%] ml-auto bg-[#ff2a2a] p-8 md:p-16"
            >
                {/* Header row */}
                <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70 font-semibold">
                        Reach Me
                    </p>
                    {socialLinks.instagram && (
                        <a
                            href={socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-all duration-200"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                            </svg>
                            DM on Instagram
                        </a>
                    )}
                </div>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-12">

                    {/* Two-column: inputs left, textarea right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

                        {/* Left — text inputs */}
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                                    First Name <span className="text-white">*</span>
                                </label>
                                <input id="firstName" name="first_name" type="text" required placeholder="Krishna" className={INPUT_CLASS} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                                    Last Name
                                </label>
                                <input id="lastName" name="last_name" type="text" placeholder="Kumar" className={INPUT_CLASS} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                                    Email <span className="text-white">*</span>
                                </label>
                                <input id="email" name="user_email" type="email" required placeholder="hello@example.com" className={INPUT_CLASS} />
                            </div>
                        </div>

                        {/* Right — message */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                                Message <span className="text-white">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                placeholder={`Hi ${personalInfo.firstName}, I'd love to discuss...`}
                                className={`${INPUT_CLASS} resize-none min-h-[120px] h-full`}
                            />
                        </div>
                    </div>

                    {/* Bottom — checkbox / note / submit */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/20 pt-10">

                        <div className="flex flex-col gap-4 max-w-md">
                            {/* Permission checkbox */}
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" className="mt-1 accent-white cursor-pointer shrink-0" />
                                <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-200">
                                    I allow {personalInfo.firstName} to contact me back regarding my enquiry.
                                </span>
                            </label>

                            {/* Response note */}
                            <p className="text-xs text-white/40 leading-relaxed">
                                Your message will be sent directly to my inbox. I typically respond within 24–48 hours.{' '}
                                <a
                                    href={`mailto:${personalInfo.emails.primary}`}
                                    className="underline hover:text-white/80 transition-colors duration-200"
                                >
                                    Email me directly
                                </a>{' '}
                                for urgent enquiries.
                            </p>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={status !== 'idle'}
                            className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${btn.cls}`}
                        >
                            {/* Spinner when sending */}
                            {status === 'sending' && (
                                <svg className="w-4 h-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {btn.label}
                            {/* Arrow slides right on hover (idle only) */}
                            {status === 'idle' && (
                                <svg
                                    className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
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
