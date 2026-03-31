import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- CONFIGURAZIONE ---
const SOCIAL_LINKS = {
    ig: "https://www.instagram.com/gcerti.italy/",
    ln: "https://www.linkedin.com/company/gcerti-italy/",
    web: "https://www.gcerti.it/"
};

// Immagini segnaposto (sostituisci con i tuoi asset reali)
const ASSETS = {
    ai_raw: "gcerti_prompt_before.jpg", 
    ai_gen: "gcerti_prompt_after.jpg",
    strategy_icon: "strategy_icon.png",
    execution_step1: "step1_editorial.jpg",
    execution_step2: "step2_funnel.jpg",
    execution_step3: "step3_data.jpg",
};

const GCERTI_LANG = {
    it: {
        'back': '← TORNA',
        'title': 'GCERTI ITALY',
        'role-title': 'Da "Spesa Marketing" a Motore di Acquisizione B2B.',
        'role-sub': 'Strategy, AI Direction & Performance Marketing',
        'slogan': 'Ingegnerizzare l’autorevolezza: ottimizzazione budget Ads e design generativo per la lead generation.',
        'prompt-text': '/imagine prompt: corporate office building, 3d glossy architectural style, teal color palette, photorealistic --v 6.0',
        'btn-generate': 'GENERA ASSET AI',
        'problem-title': 'IL PROBLEMA',
        'strategy-title': 'I 3 PILASTRI',
        'execution-title': 'ESECUZIONE',
        'results-title': 'IMPATTO & RISULTATI',
        'takeaway-title': 'KEY TAKEAWAY',
        'takeaway-desc': 'Interpretare le leggi, trasformarle in ganci visivi AI e distribuirle su ecosistemi Google blindati.',
    },
    en: {
        'back': '← BACK',
        'title': 'GCERTI ITALY',
        'role-title': 'From "Marketing Expense" to B2B Acquisition Engine.',
        'role-sub': 'Strategy, AI Direction & Performance Marketing',
        'slogan': 'Engineering authority: Ads budget optimization and generative design for lead generation.',
        'prompt-text': '/imagine prompt: corporate office building, 3d glossy architectural style, teal color palette, photorealistic --v 6.0',
        'btn-generate': 'GENERATE AI ASSET',
        'problem-title': 'THE PROBLEM',
        'strategy-title': '3 PILLARS',
        'execution-title': 'EXECUTION',
        'results-title': 'IMPACT & RESULTS',
        'takeaway-title': 'KEY TAKEAWAY',
        'takeaway-desc': 'Translating regulations into AI visual hooks and distributing them via locked Google ecosystems.',
    }
};

// --- COMPONENTI INTERNI ---

const Typewriter = ({ text }) => {
    const letters = text.split("");
    return (
        <motion.h1 
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, color: '#085257', fontFamily: '"Playfair Display", serif', margin: 0, letterSpacing: '-2px' }}
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
            {letters.map((char, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>{char}</motion.span>
            ))}
        </motion.h1>
    );
};

const Reveal = ({ children }) => (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        {children}
    </motion.div>
);

const PromptSimulator = ({ t }) => {
    const [isGenerated, setIsGenerated] = useState(false);
    return (
        <div style={{ background: 'rgba(255,255,255,0.4)', padding: '15px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#eee' }}>
                <motion.img src={ASSETS.ai_raw} alt="Before" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} animate={{ opacity: isGenerated ? 0 : 1 }} />
                <motion.img src={ASSETS.ai_gen} alt="After" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} animate={{ opacity: isGenerated ? 1 : 0 }} />
            </div>
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#085257', background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: '10px' }}>
                    <span style={{ opacity: 0.5 }}>{t['prompt-text']}</span>
                </div>
                <button 
                    onClick={() => setIsGenerated(!isGenerated)}
                    style={{ background: '#085257', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                    {isGenerated ? 'RESET' : t['btn-generate']}
                </button>
            </div>
        </div>
    );
};

// --- PAGINA PRINCIPALE ---

const GCerti = ({ lang = 'it', goBack }) => {
    const t = GCERTI_LANG[lang];
    const { scrollY } = useScroll();

    const introOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const introScale = useTransform(scrollY, [0, 400], [1, 0.95]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@400;500;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <div style={{ fontFamily: '"DM Sans", sans-serif', backgroundColor: '#f8f9fa', color: '#333', overflowX: 'hidden' }}>
            
            {/* BACKGROUND */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <ShaderGradientCanvas>
                    <ShaderGradient 
                        animate="on" bgColor1="#ffffff" bgColor2="#f0f0f0" 
                        color1="#e0f2f1" color2="#ffffff" color3="#b2dfdb"
                        type="waterPlane" uSpeed={0.2} uStrength={2} 
                    />
                </ShaderGradientCanvas>
            </div>

            {/* HEADER */}
            <header style={{ position: 'fixed', top: 20, left: 30, zIndex: 100 }}>
                <button onClick={goBack} style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(8,82,87,0.2)', padding: '10px 20px', borderRadius: '30px', color: '#085257', fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                    {t['back']}
                </button>
            </header>

            {/* HERO SECTION */}
            <motion.section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: introOpacity, scale: introScale, position: 'relative', zIndex: 1, padding: '0 5%' }}>
                <div style={{ textAlign: 'center' }}>
                    <Typewriter text={t['title']} />
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: '1.2rem', marginTop: '20px', color: '#555', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                        {t['role-sub']}
                    </motion.p>
                </div>
            </motion.section>

            {/* CONTENT LAYER */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                
                {/* INTRO GRID (Simile a White Rabbit) */}
                <section style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', borderRadius: '40px', padding: '50px', border: '1px solid white', marginBottom: '40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', color: '#085257', fontFamily: '"Playfair Display", serif', marginBottom: '20px' }}>{t['role-title']}</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>{t['slogan']}</p>
                        </div>
                        <PromptSimulator t={t} />
                    </div>
                </section>

                {/* BENTO GRID - PROBLEMI */}
                <section style={{ marginBottom: '40px' }}>
                    <Reveal>
                        <h3 style={{ textAlign: 'center', fontSize: '0.8rem', letterSpacing: '3px', color: '#085257', marginBottom: '30px' }}>{t['problem-title']}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                            <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', borderLeft: '5px solid #ef4444', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <span style={{ fontSize: '2rem' }}>🔴</span>
                                <h4 style={{ margin: '15px 0 10px 0' }}>Consultant Trap</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Tono di voce sovrapposto ai consulenti esterni.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', borderLeft: '5px solid #ef4444', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <span style={{ fontSize: '2rem' }}>📋</span>
                                <h4 style={{ margin: '15px 0 10px 0' }}>Contenuti Burocratici</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Comunicazione basata su noiosi elenchi normativi.</p>
                            </div>
                            <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', borderLeft: '5px solid #ef4444', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <span style={{ fontSize: '2rem' }}>💸</span>
                                <h4 style={{ margin: '15px 0 10px 0' }}>Budget Burn</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Corrispondenze generiche che bruciavano budget.</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* PIPELINE - ESECUZIONE (Stile White Rabbit) */}
                <section style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', borderRadius: '40px', padding: '50px', border: '1px solid white', marginBottom: '40px' }}>
                    <Reveal>
                        <h3 style={{ textAlign: 'center', fontSize: '0.8rem', letterSpacing: '3px', color: '#085257', marginBottom: '40px' }}>{t['execution-title']}</h3>
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {[1, 2, 3].map((step) => (
                                <div key={step} style={{ flex: '1', minWidth: '250px', textAlign: 'center' }}>
                                    <div style={{ position: 'relative', height: '180px', borderRadius: '20px', overflow: 'hidden', marginBottom: '15px' }}>
                                        <img src={ASSETS[`execution_step${step}`]} alt={`Step ${step}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', top: 10, left: 10, background: '#085257', color: 'white', width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{step}</div>
                                    </div>
                                    <h4 style={{ color: '#085257' }}>Step 0{step}</h4>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* KEY TAKEAWAY FINALE */}
                <section style={{ textAlign: 'center', padding: '60px 0' }}>
                    <Reveal>
                        <div style={{ background: 'linear-gradient(135deg, #085257 0%, #0d7a82 100%)', padding: '60px', borderRadius: '40px', color: 'white' }}>
                            <h3 style={{ fontSize: '0.8rem', letterSpacing: '3px', opacity: 0.7, marginBottom: '20px' }}>{t['takeaway-title']}</h3>
                            <p style={{ fontSize: '1.5rem', fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>"{t['takeaway-desc']}"</p>
                        </div>
                    </Reveal>
                </section>

                <footer style={{ textAlign: 'center', padding: '40px', opacity: 0.4, fontSize: '0.8rem' }}>
                    © 2026 Angelo Russo | GCERTI ITALY Case Study
                </footer>
            </div>
        </div>
    );
};

export default GCerti;
