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
        'role-title': 'Da "Spesa" a Motore B2B.',
        'role-sub': 'Performance Marketing & AI Creative Direction',
        'slogan': 'Abbiamo reingegnerizzato l\'autorevolezza: ottimizzazione chirurgica del budget Ads e design generativo per una Lead Generation implacabile.',
        'problem-title': 'La Sfida',
        'strategy-title': 'L\'Ecosistema',
        'results-title': 'Impatto Numerico',
        'takeaway-desc': 'Interpretare direttive legali complesse, trasformarle in ganci visivi AI e blindare il budget su ecosistemi Google ad alta intenzione d\'acquisto.'
    },
    en: {
        'back': '← BACK',
        'title': 'GCERTI ITALY',
        'role-title': 'From "Expense" to B2B Engine.',
        'role-sub': 'Performance Marketing & AI Creative Direction',
        'slogan': 'We re-engineered authority: surgical Ads budget optimization and generative design for relentless Lead Generation.',
        'problem-title': 'The Challenge',
        'strategy-title': 'The Ecosystem',
        'results-title': 'Numerical Impact',
        'takeaway-desc': 'Translating complex legal directives into AI visual hooks and locking the budget onto high-intent Google ecosystems.'
    }
};

// --- COMPONENTI INTERNI ---

const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return (
        <motion.h1 className="intro-text" variants={container} initial="hidden" animate="visible" style={{ textAlign: 'center', width: '100%', padding: '0 10px' }}>
            {letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}
        </motion.h1>
    );
};

function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

const Reveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
        {children}
    </motion.div>
);

const SocialIconOnly = ({ type, link }) => {
    const renderIcon = () => {
        if (type === 'web') return <img loading="lazy" decoding="async" src="Icona_site.webp" alt="Agency Website" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
        if (type === 'ig') return <img loading="lazy" decoding="async" src="Icona_instagram.webp" alt="Instagram Profile" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
        if (type === 'ln') return <img loading="lazy" decoding="async" src="Icona_linkedin.webp" alt="LinkedIn Profile" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
        return null;
    };
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn-circle"
            whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '10px', pointerEvents: 'auto', position: 'relative', zIndex: 999 }}
        >
            {renderIcon()}
        </motion.a>
    );
};

const AnimatedBarChart = ({ label, value, percentage, color = "#085257" }) => (
    <div style={{ marginBottom: 'clamp(20px, 4vw, 30px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: 600, color: '#333', fontFamily: 'Inter, sans-serif' }}>{label}</span>
            <span style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 800, color: color, fontFamily: 'Unbounded, sans-serif' }}>{value}</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: percentage }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                style={{ height: '100%', background: color, borderRadius: '10px' }}
            />
        </div>
    </div>
);

const AnimatedCircleChart = ({ label, percentageValue, textValue }) => {
    const circleRadius = 45;
    const circumference = 2 * Math.PI * circleRadius;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r={circleRadius} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
                    <motion.circle
                        cx="50" cy="50" r={circleRadius} fill="none" stroke="#085257" strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: circumference - (percentageValue / 100) * circumference }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                    />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Unbounded, sans-serif', fontSize: '1rem', fontWeight: 800, color: '#085257' }}>{textValue}</span>
                </div>
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: 600, color: '#555', textAlign: 'center' }}>{label}</span>
        </div>
    );
};

// --- COMPONENTE PRINCIPALE ---

const GCerti = ({ lang = 'it', goBack }) => {
    const t = GCERTI_LANG[lang];
    const { scrollY } = useScroll();

    const introOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const introBlur = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(20px)"]);
    const introScale = useTransform(scrollY, [0, 500], [1, 0.95]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700;800&display=swap';
        document.head.appendChild(link);

        // IL CURSORE È STATO RIPRISTINATO RIMUOVENDO document.body.style.cursor = 'none';
    }, []);

    return (
        <div className="app-container" style={{ overflowX: 'hidden' }}>
            <div className="gradient-bg" style={{ pointerEvents: 'none' }}>
                <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                    <WaterGradient />
                </ShaderGradientCanvas>
            </div>

            <header>
                <button onClick={goBack} className="lang-btn" style={{ position: 'fixed', top: 'clamp(15px, 4vw, 30px)', left: 'clamp(15px, 4vw, 30px)', zIndex: 100 }}>
                    {t['back']}
                </button>
            </header>

            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, filter: introBlur, scale: introScale, zIndex: 5, padding: '0 20px' }}>
                <Typewriter text={t['title']} />
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 500, color: '#444', marginTop: '20px', letterSpacing: '-0.01em', textAlign: 'center' }}>
                    {t['role-sub']}
                </p>
            </motion.div>

            <div className="content-scroll-layer" style={{ zIndex: 10 }}>

                <section style={{ maxWidth: '900px', margin: '0 auto clamp(60px, 10vw, 100px) auto', padding: '0 20px', textAlign: 'center' }}>
                    <Reveal>
                        <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 'clamp(1.8rem, 6vw, 3.5rem)', color: '#111', lineHeight: 1.2, marginBottom: '20px' }}>
                            {t['role-title']}
                        </h2>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#555', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
                            {t['slogan']}
                        </p>
                    </Reveal>
                </section>

                <section className="glass-section" style={{ background: 'rgba(255,255,255,0.7)', padding: 'clamp(30px, 6vw, 60px)', borderRadius: '40px', maxWidth: '1000px', margin: '0 auto', width: '92%' }}>
                    <Reveal>
                        <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', textTransform: 'uppercase', letterSpacing: '2px', color: '#085257', marginBottom: 'clamp(20px, 5vw, 40px)', fontWeight: 700 }}>{t['problem-title']}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(20px, 4vw, 30px)' }}>

                            <motion.div whileHover={{ scale: 1.02 }} style={{ background: '#fff', padding: 'clamp(25px, 5vw, 40px)', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.02)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🗣️</div>
                                <h4 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.2rem)', marginBottom: '10px' }}>Consultant Trap</h4>
                                <p style={{ fontFamily: 'Inter, sans-serif', color: '#666', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', lineHeight: 1.6 }}>Sovrapposizione del tono di voce istituzionale con quello dei consulenti, perdendo l'autorevolezza di Ente Terzo.</p>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} style={{ background: '#fff', padding: 'clamp(25px, 5vw, 40px)', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.02)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💸</div>
                                <h4 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.2rem)', marginBottom: '10px' }}>Budget Bleed</h4>
                                <p style={{ fontFamily: 'Inter, sans-serif', color: '#666', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', lineHeight: 1.6 }}>Approccio "generalista" su Google Ads. Le parole chiave generiche bruciavano budget senza generare conversioni qualificate.</p>
                            </motion.div>

                        </div>
                    </Reveal>
                </section>

                <section style={{ maxWidth: '1000px', margin: 'clamp(60px, 10vw, 100px) auto', padding: '0 20px' }}>
                    <Reveal>
                        <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', textTransform: 'uppercase', letterSpacing: '2px', color: '#085257', marginBottom: 'clamp(30px, 6vw, 40px)', fontWeight: 700, textAlign: 'center' }}>{t['results-title']}</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(20px, 5vw, 40px)' }}>
                            <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', padding: 'clamp(30px, 6vw, 50px)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                                <AnimatedBarChart label="Instagram Engagement" value="+542%" percentage="85%" color="#085257" />
                                <AnimatedBarChart label="Ottimizzazione CPC (Ads)" value="-24.3%" percentage="75%" color="#e6683c" />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '30px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', padding: 'clamp(30px, 6vw, 50px)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                                <AnimatedCircleChart label="LinkedIn Clicks / Day" percentageValue={100} textValue="465" />
                                <AnimatedCircleChart label="Budget Protection" percentageValue={100} textValue="100%" />
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section" style={{ background: 'rgba(255,255,255,0.7)', padding: 'clamp(30px, 6vw, 60px)', borderRadius: '40px', maxWidth: '1000px', margin: '0 auto', width: '92%' }}>
                    <Reveal>
                        <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', textTransform: 'uppercase', letterSpacing: '2px', color: '#085257', marginBottom: 'clamp(30px, 6vw, 40px)', fontWeight: 700 }}>{t['strategy-title']}</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ background: '#085257', color: 'white', fontFamily: 'Unbounded, sans-serif', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>01</div>
                                <div>
                                    <h4 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', marginBottom: '10px', color: '#111' }}>Zero-Click Repositioning</h4>
                                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#555', lineHeight: 1.6, fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Trasformazione di direttive complesse in Caroselli LinkedIn ad alto valore informativo e zero attrito per l'utente.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ background: '#085257', color: 'white', fontFamily: 'Unbounded, sans-serif', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>02</div>
                                <div>
                                    <h4 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', marginBottom: '10px', color: '#111' }}>AI Visual Authority</h4>
                                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#555', lineHeight: 1.6, fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Prompt Engineering avanzato per asset visivi "3D glossy photorealistic". Creatività corporate scalabili, costi abbattuti.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ background: '#085257', color: 'white', fontFamily: 'Unbounded, sans-serif', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>03</div>
                                <div>
                                    <h4 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', marginBottom: '10px', color: '#111' }}>Multichannel Perfect Trap</h4>
                                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#555', lineHeight: 1.6, fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Search (esatta/frase) per domanda consapevole + Performance Max per retargeting visivo e creazione del bisogno.</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section style={{ maxWidth: '800px', margin: 'clamp(60px, 10vw, 100px) auto', padding: '0 20px', textAlign: 'center' }}>
                    <Reveal>
                        <div className="glass-section" style={{ background: 'rgba(255,255,255,0.8)', padding: 'clamp(30px, 6vw, 50px)', borderRadius: '30px', border: '1px solid rgba(8,82,87,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', width: '100%', maxWidth: '92%', margin: '0 auto' }}>
                            <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', textTransform: 'uppercase', letterSpacing: '3px', color: '#085257', marginBottom: '20px', fontWeight: 700 }}>Key Takeaway</h3>
                            <p style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 'clamp(1rem, 4vw, 1.8rem)', color: '#222', lineHeight: 1.5, margin: 0 }}>
                                "{t['takeaway-desc']}"
                            </p>
                        </div >
                    </Reveal>
                </section>

                <section style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', padding: '20px', marginTop: '20px' }}>
                    <SocialIconOnly type="web" link={SOCIAL_LINKS.web} />
                    <SocialIconOnly type="ig" link={SOCIAL_LINKS.ig} />
                    <SocialIconOnly type="ln" link={SOCIAL_LINKS.ln} />
                </section>

                <footer style={{ textAlign: 'center', padding: '2rem 2rem 4rem', opacity: 0.5 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', fontWeight: 600 }}>© 2026 Angelo Russo — Strategic B2B Branding</p>
                </footer>
            </div>
        </div>
    );
};

export default GCerti;