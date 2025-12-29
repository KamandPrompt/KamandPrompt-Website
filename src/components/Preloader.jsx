import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ isLoading, progress = 0 }) => {
    const [displayProgress, setDisplayProgress] = useState(0);

    // Animate counter smoothly
    useEffect(() => {
        const target = Math.min(progress, 100);
        const duration = 200;
        const startTime = performance.now();
        const startValue = displayProgress;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progressRatio = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progressRatio, 3);
            const currentValue = Math.round(startValue + (target - startValue) * eased);
            setDisplayProgress(currentValue);

            if (progressRatio < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [progress]);

    if (!isLoading && displayProgress >= 100) {
        return null;
    }

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Grid Background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                                `,
                                backgroundSize: '50px 50px',
                            }}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 text-center">
                        {/* Terminal Prompt */}
                        <div className="mb-8 font-mono text-sm text-white/40">
                            <span className="text-white/60">$</span> initializing system
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                                _
                            </motion.span>
                        </div>

                        {/* Main Title */}
                        <div className="flex justify-center items-center gap-[2px] sm:gap-1 mb-12">
                            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tight">
                                KAMAND PROMPT
                            </h1>
                        </div>

                        {/* Progress Section */}
                        <div className="w-[300px] sm:w-[400px] mx-auto">
                            {/* Progress Bar */}
                            <div className="relative h-[2px] bg-white/10 overflow-hidden mb-6">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-white"
                                    style={{ width: `${displayProgress}%` }}
                                />
                            </div>

                            {/* Progress Counter */}
                            <div className="flex justify-between items-center font-mono text-sm">
                                <span className="text-white/40">LOADING</span>
                                <span className="text-white tabular-nums text-lg font-bold">
                                    {displayProgress.toString().padStart(3, '0')}%
                                </span>
                            </div>
                        </div>

                        {/* Loading Status */}
                        <div className="mt-12 font-mono text-xs text-white/30">
                            <motion.div
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                ▸ fetching resources...
                            </motion.div>
                        </div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-8 right-8 font-mono text-xs text-white/20 text-right">
                        <div>IIT MANDI</div>
                    </div>
                    <div className="absolute bottom-8 left-8 font-mono text-xs text-white/20">
                        <motion.div
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ● SYSTEM ACTIVE
                        </motion.div>
                    </div>
                    <div className="absolute bottom-8 right-8 font-mono text-xs text-white/20">
                        <div>{new Date().getFullYear()}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
