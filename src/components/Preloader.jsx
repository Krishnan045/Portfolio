// Preloader.jsx — Full-screen red "shutter" with water-fill brand name
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    // Hide after 2200 ms; clear on unmount
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                /* Red shutter — slides up on exit */
                <motion.div
                    key="preloader"
                    className="fixed inset-0 w-full h-screen bg-[#ff2a2a] z-[100000] flex items-center justify-center"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Inner text — fades out just before the shutter slides */}
                    <motion.div
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="relative text-5xl md:text-7xl font-black tracking-tighter"
                    >
                        {/* Background ghost copy */}
                        <span className="text-red-900/30 select-none whitespace-nowrap" aria-hidden="true">
                            {personalInfo.brandName}.
                        </span>

                        {/* Foreground fill — water rises from bottom via clipPath */}
                        <motion.span
                            className="absolute inset-0 text-white whitespace-nowrap"
                            initial={{ clipPath: 'inset(100% 0 0 0)' }}
                            animate={{ clipPath: 'inset(0% 0 0 0)' }}
                            transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
                            aria-hidden="true"
                        >
                            {personalInfo.brandName}
                            <span className="text-black">.</span>
                        </motion.span>

                        {/* Accessible label */}
                        <span className="sr-only">{personalInfo.brandName}</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
