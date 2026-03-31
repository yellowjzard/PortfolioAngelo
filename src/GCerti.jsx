import React, { useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- CONFIGURAZIONE ---
const SOCIAL_LINKS = {
    ig: "https://www.instagram.com/gcerti.italy/",
    ln: "https://www.linkedin.com/company/gcerti-italy/",
    web: "https://www.gcerti.it/"
};

const GCERTI_LANG = {
    it: {
        'back': '← TORNA',
        'title': 'GCERTI ITALY',
        'role-title': 'Da "Marketing Expense" a Asset Scalabile.',
        'role-sub': 'Performance Marketing & AI Creative Direction',
        'slogan': 'Abbiamo trasformato la comunicazione istituzionale in una macchina di acquisizione B2B chirurgica.',
        'problem-title': 'IL PROBLEMA',
        'strategy-title': 'LA STRATEGIA',
        'results-title': 'KEY METRICS',
        'takeaway-desc': 'Interpretare direttive legali complesse, trasformarle in asset visivi generati via AI e blindare il budget su query ad alta intenzione d\'acquisto.',
    },
    en: {
        'back': '← BACK',
        'title': 'GCERTI ITALY',
        'role-title': 'From "Marketing Expense" to Scalable Asset.',
        'role-sub': 'Performance Marketing & AI Creative Direction',
        'slogan': 'Transforming institutional communication into a surgical B2B acquisition engine.',
        'problem-title': 'THE PROBLEM',
        'strategy-title': 'THE STRATEGY',
        'results-title': 'KEY METRICS',
        'takeaway-desc': 'Translating complex legal directives into AI-generated visual assets and locking the budget on high-intent purchase queries.',
    }
};

// --- COMPONENTI INTERNI ---

const Reveal = ({ children }) => (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>
        {children}
    </motion.div>
);

const StatCard = ({ label, value, sub }) => (
    <motion.div 
        className="bento-card" 
        whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.8)" }}
        style={{ textAlign: 'center', padding: '30px', background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.05)' }}
    >
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666', marginBottom: '10px', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#085257', fontFamily: 'Unbounded, sans-serif' }}>{value}</div>
        <div style={{ fontSize: '0.9rem', color: '#444', marginTop: '5px' }}>{sub}</div>
    </motion.div>
);

const GCerti = ({ lang = 'it', goBack }) => {
    const t = GCERTI_LANG[lang];
    const { scrollY } = useScroll();

    const introOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const introBlur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(20px)"]);
    const introScale = useTransform(scrollY, [0, 400], [1, 0.9]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="app-container">
            {/* SFONDO COERENTE CON IL PORTFOLIO */}
            <div className="gradient-bg">
                <ShaderGradientCanvas style={{ width: '100%', height: '100%' }} pixelDensity={1}>
                    <ShaderGradient 
                        animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} 
                        cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} 
                        color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" 
                        type="waterPlane" uSpeed={0.3} uStrength={3}
                    />
                </ShaderGradientCanvas>
            </div>

            {/* HEADER FISSO */}
            <header style={{ left: '30px', right: 'auto' }}>
                <button onClick={goBack} className="lang-btn">{t['back']}</button>
            </header>

            {/* HERO SECTION */}
            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, filter: introBlur, scale: introScale }}>
                <h1 className="intro-text" style={{ color: '#085257' }}>{t['title']}</h1>
                <div className="scroll-hint" style={{ color: '#085257', opacity: 0.8 }}>{t['role-sub']}</div>
            </motion.div>

            {/* CONTENT LAYER */}
            <div className="content-scroll-layer">
                
                {/* MISSION SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <h2 className="bio-headline" style={{ textAlign: 'center', marginBottom: '20px' }}>{t['role-title']}</h2>
                        <p className="bio-text" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px auto' }}>
                            {t['slogan']}
                        </p>
                        <div className="social-row">
                            <motion.a href={SOCIAL_LINKS.web} target="_blank" className="social-btn-circle" whileHover={{ scale: 1.1 }}><img src="Icona_site.webp" width="20" alt="Web" /></motion.a>
                            <motion.a href={SOCIAL_LINKS.ln} target="_blank" className="social-btn-circle" whileHover={{ scale: 1.1 }}><img src="Icona_linkedin.webp" width="20" alt="LinkedIn" /></motion.a>
                        </div>
                    </Reveal>
                </section>

                {/* RESULTS BENTO GRID */}
                <section className="glass-section story-section">
                    <Reveal>
                        <h2 className="section-label">{t['results-title']}</h2>
                        <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <StatCard label="Instagram" value="+542%" sub="Interazioni organiche" />
                            <StatCard label="LinkedIn" value="465" sub="Click B2B al giorno" />
                            <StatCard label="Ads Cost" value="-24.3%" sub="Ottimizzazione CPC" />
                            <StatCard label="Tracking" value="100%" sub="Data precision" />
                        </div>
                    </Reveal>
                </section>

                {/* STRATEGY SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <h2 className="section-label">{t['strategy-title']}</h2>
                        <div className="bento-grid">
                            <div className="bento-card solution-card">
                                <div className="card-icon">🎯</div>
                                <h3>Zero-Click Repositioning</h3>
                                <p>Trasformazione di normative complesse in caroselli LinkedIn ad alto valore informativo per Decision Maker.</p>
                            </div>
                            <div className="bento-card solution-card">
                                <div className="card-icon">🤖</div>
                                <h3>AI Visual Authority</h3>
                                <p>Asset visivi premium 3D generati con Midjourney/Magnific per abbattere i costi di produzione e scalare il brand.</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* TAKEAWAY FINALE */}
                <section className="glass-section results-bar" style={{ background: '#085257', color: 'white' }}>
                    <Reveal>
                        <h3 className="bar-title" style={{ color: 'rgba(255,255,255,0.6)', borderBottomColor: 'rgba(255,255,255,0.1)' }}>KEY TAKEAWAY</h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.7, textAlign: 'center', fontWeight: 500 }}>
                            "{t['takeaway-desc']}"
                        </p>
                    </Reveal>
                </section>

                <footer style={{ textAlign: 'center', padding: '4rem 2rem', opacity: 0.5 }}>
                    <p style={{ fontSize: '0.8rem' }}>© 2026 Angelo Russo — Case Study: GCERTI ITALY</p>
                </footer>
            </div>
        </div>
    );
};

export default GCerti;
