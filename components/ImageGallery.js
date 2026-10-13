import React from 'react';
import { motion } from 'framer-motion';

export default function ImageGallery({ images, title = "Gallery" }) {
    if (!images || images.length === 0) return null;

    return (
        <section className="fort-section" style={{ padding: '4rem 1.5rem', background: '#fff' }}>
            <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h2 className="section-title aura-heading" style={{ fontSize: '2.5rem', color: '#111 !important', marginBottom: '1rem' }}>{title}</h2>
                <div className="title-divider" style={{ width: '80px', marginBottom: '2rem' }}></div>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {images.map((img, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        style={{
                            borderRadius: '15px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            aspectRatio: '4/3',
                            position: 'relative'
                        }}
                    >
                        <img 
                            src={img.src} 
                            alt={img.alt || "Gallery Image"} 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.4s ease'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
