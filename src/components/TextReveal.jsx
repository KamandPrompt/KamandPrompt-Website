import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const TextReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
    once = true
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.5 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        } else if (!once) {
            controls.start('hidden');
        }
    }, [isInView, controls, once]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.02,
                delayChildren: delay,
            },
        },
    };

    const wordVariants = {
        hidden: {
            y: '100%',
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const words = children.split(' ');

    return (
        <motion.span
            ref={ref}
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span className="inline-block" variants={wordVariants}>
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
};

// Character-by-character reveal
export const CharReveal = ({
    children,
    className = '',
    delay = 0,
    stagger = 0.03
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: {
            y: 50,
            opacity: 0,
            rotateX: -90,
        },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const chars = children.split('');

    return (
        <motion.span
            ref={ref}
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            style={{ perspective: '1000px' }}
        >
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    variants={charVariants}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default TextReveal;
