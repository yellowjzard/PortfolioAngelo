import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- CONFIGURAZIONE ---
const SOCIAL_LINKS = {
    ig: "https://www.instagram.com/gcerti.italy/",
    ln: "https://www.linkedin.com/company/gcerti-italy/",
    web: "https://www.gcerti.it/"
};

// Asset (usando le icone già caricate nel tuo progetto dove possibile)
const ASSETS = {
    ai_raw: "gcerti_prompt_before.jpg", 
    ai_gen: "gcerti_prompt_after.jpg",
    gcerti_icon: "Icona_gcerti.webp",
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
        'problem-title': '01 / IL PROBLEMA',
        'strategy-title': '02 / I 3 PILASTRI',
        'execution-title': '03 / ESECUZIONE',
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
        'problem-title': '01 / THE PROBLEM',
        'strategy-title': '02 / 3 PILLARS',
        'execution-title': '03 / EXECUTION',
        'takeaway-title': 'KEY TAKEAWAY',
        'takeaway-desc': 'Translating regulations into AI visual hooks and distributing them via locked Google ecosystems.',
    }
};

// --- COMPONENTI INTERNI ---

const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return (
        <motion.h1 className="intro-text" variants={container} initial="hidden" animate="visible" style={{ color: '#085257' }}>
            {letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}
        </motion.h1>
    );
};

const Reveal = ({ children }) => (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>
        {children}
    </motion.div>
);

const PromptSimulator = ({ t }) => {
    const [isGenerated, setIsGenerated] = useState(false);
    return (
        <div className="prompt-box-container" style={{ border: '1px solid rgba(8,82,87,0.2)' }}>
            <div className="prompt-image-viewport">
                <motion.img src={ASSETS.ai_raw} alt="Before" className="prompt-img" animate={{ opacity: isGenerated ? 0 : 1 }} />
                <motion.img src={ASSETS.ai_gen} alt="After" className="prompt-img absolute-img" animate={{ opacity: isGenerated ? 1 : 0 }} />
                {isGenerated && <motion.div className="scan-line" style={{ background: '#085257', boxShadow: '0 0 15px #085257' }} initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} />}
            </div>
            <div className="prompt-controls">
                <div className="prompt-input" style={{ color: '#085257' }}>
                    <span style={{ opacity: 0.5 }}>{t['prompt-text']}</span>
                </div>
                <button 
                    className={`prompt-btn ${isGenerated ? 'active' : ''}`} 
                    onClick={() => setIsGenerated(!isGenerated)}
                    style={{ background: isGenerated ? '#085257' : '#111' }}
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
    const introScale = useTransform(scrollY, [0, 400], [1, 0.9]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="app-container">
            {/* SFONDO ANIMATO */}
            <div className="gradient-bg">
                <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                    <ShaderGradient 
                        animate="on" bgColor1="#ffffff" bgColor2="#f0f0f0" 
                        color1="#e0f2f1" color2="#ffffff" color3="#b2dfdb"
                        type="waterPlane" uSpeed={0.2} uStrength={2} 
                    />
                </ShaderGradientCanvas>
            </div>

            {/* HEADER FISSO */}
            <header style={{ left: '30px', right: 'auto' }}>
                <button onClick={goBack} className="lang-btn">
                    {t['back']}
                </button>
            </header>

            {/* HERO SECTION */}
            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, scale: introScale }}>
                <Typewriter text={t['title']} />
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1 }} 
                    className="scroll-hint"
                    style={{ color: '#085257' }}
                >
                    {t['role-sub']}
                </motion.div>
            </motion.div>

            {/* CONTENT LAYER */}
            <div className="content-scroll-layer">
                
                {/* INTRO SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <div className="wr-hero-grid">
                            <div className="wr-text-col">
                                <h2 className="bio-headline" style={{ color: '#085257' }}>{t['role-title']}</h2>
                                <p className="bio-text" style={{ marginBottom: '30px' }}>{t['slogan']}</p>
                                <div className="social-row">
                                    <motion.a href={SOCIAL_LINKS.web} target="_blank" className="social-btn-circle" whileHover={{ scale: 1.1 }}><img src="Icona_site.webp" width="20" alt="Web" /></motion.a>
                                    <motion.a href={SOCIAL_LINKS.ln} target="_blank" className="social-btn-circle" whileHover={{ scale: 1.1 }}><img src="Icona_linkedin.webp" width="20" alt="LinkedIn" /></motion.a>
                                </div>
                            </div>
                            <div className="wr-demo-col">
                                <PromptSimulator t={t} />
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* PROBLEMA - BENTO GRID STYLE */}
                <section className="glass-section story-section">
                    <Reveal>
                        <h2 className="section-label">{t['problem-title']}</h2>
                        <div className="bento-grid">
                            <div className="bento-card challenge-card" style={{ borderLeft: '4px solid #ef4444' }}>
                                <div className="card-icon">🔴</div>
                                <h3>Consultant Trap</h3>
                                <p>Il tono di voce aziendale si sovrapponeva a quello dei consulenti, diluendo l'autorevolezza come Ente Terzo Indipendente.</p>
                            </div>
                            <div className="bento-card challenge-card" style={{ borderLeft: '4px solid #ef4444' }}>
                                <div className="card-icon">📋</div>
                                <h3>Bureaucracy</h3>
                                <p>Comunicazione basata su elenchi normativi noiosi, ignorati dai Decision Maker ad alto livello.</p>
                            </div>
                            <div className="bento-card results-bar" style={{ background: '#085257' }}>
                                <div className="results-grid">
                                    <div className="result-item"><span className="check-icon">✓</span> +542% Engagement</div>
                                    <div className="result-item"><span className="check-icon">✓</span> -24% CPC Ads</div>
                                    <div className="result-item"><span className="check-icon">✓</span> 465 Clicks/Day</div>
                                    <div className="result-item"><span className="check-icon">✓</span> 100% Tracking</div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ESECUZIONE - PIPELINE STYLE */}
                <section className="glass-section">
                    <Reveal>
                        <h2 className="section-label">{t['execution-title']}</h2>
                        <div className="process-pipeline">
                            <div className="process-step">
                                <div className="process-thumb-container">
                                    <img src={ASSETS.execution_step1} className="process-thumb" alt="Editorial" />
                                    <span className="step-badge">01</span>
                                </div>
                                <h4>Editorial Strategy</h4>
                                <p>Produzione massiva di asset visuali premium in tempi record tramite AI.</p>
                            </div>
                            <div className="process-arrow">→</div>
                            <div className="process-step">
                                <div className="process-thumb-container">
                                    <img src={ASSETS.execution_step2} className="process-thumb" alt="Funnel" />
                                    <span className="step-badge">02</span>
                                </div>
                                <h4>Surgical Targeting</h4>
                                <p>Campagne differenziate per CEO (ISO 9001) e mercato di massa.</p>
                            </div>
                            <div className="process-arrow">→</div>
                            <div className="process-step">
                                <div className="process-thumb-container">
                                    <img src={ASSETS.execution_step3} className="process-thumb" alt="Data" />
                                    <span className="step-badge">03</span>
                                0</div>
                                <h4>Data Protection</h4>
                                <p>Tracking avanzato delle conversioni e ottimizzazione costante del budget.</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* TAKEAWAY FINALE */}
                <section className="glass-section" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
                    <Reveal>
                        <div className="results-bar" style={{ background: 'linear-gradient(135deg, #085257 0%, #0d7a82 100%)', borderRadius: '30px' }}>
                            <h3 className="bar-title" style={{ borderBottomColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>{t['takeaway-title']}</h3>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto' }}>
                                "{t['takeaway-desc']}"
                            </p>
                        </div>
                    </Reveal>
                </section>

                <footer style={{ textAlign: 'center', padding: '4rem 2rem', opacity: 0.5 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>© 2026 Angelo Russo — Case Study: GCERTI ITALY</p>
                </footer>
            </div>
        </div>
    );
};

export default GCerti;
