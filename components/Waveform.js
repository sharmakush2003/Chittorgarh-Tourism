"use client";

import { motion } from "framer-motion";

export const Waveform = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '30px', width: '40px', justifyContent: 'center' }}>
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                animate={{
                    height: ["6px", "24px", "10px", "28px", "6px"],
                    opacity: [0.3, 1, 0.5, 1, 0.3]
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                }}
                style={{
                    width: '3px',
                    backgroundColor: 'currentColor',
                    borderRadius: '4px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                }}
            />
        ))}
    </div>
);
