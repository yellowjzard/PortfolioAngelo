import React, { useState, lazy, Suspense } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform } from 'framer-motion'; 

import ErrorBoundary from './ErrorBoundary';

// Import delle Pagine Progetti Interne (Lazy Loading)
const WhiteRabbit = lazy(() => import('./WhiteRabbit'));
const NeroEspresso = lazy(() => import('./NeroEspresso'));
const Freelance = lazy(() => import('./Freelance'));
const GCerti = lazy(() => import('./GCerti')); 

// --- ASSET STATICI ---
const WR_ICON = "Icona_whiterabbit.webp"; 
const CUORE_ICON = "Icona_cuoredinapoli.webp";
const NTA_ICON = "Icona_NTA.webp"; 
const GCERTI_ICON = "Icona_gcerti.webp"; 

// ICONE SOCIAL
const ICON_IG = "Icona_instagram.webp";
const ICON_LN = "Icona_linkedin.webp";

const LANG_DATA = {
    it: {
        'welcome': 'BENVENUTI',
        'scroll-hint': 'Scorri per entrare',
        'works-title': 'Selected Works',
        'contact-title': 'CONTATTAMI',
        'form-name': 'Nome', 'form-name-ph': 'Il tuo nome',
        'form-email': 'Email', 'form-email-ph': 'tua@email.com',
        'form-msg': 'Messaggio', 'form-msg-ph': 'Come posso aiutarti?',
        'form-btn': 'INVIA MESSAGGIO'
    },
    en: {
        'welcome': 'WELCOME', 
        'scroll-hint': 'Scroll to explore',
        'works-title': 'Selected Works',
        'contact-title': 'CONTACT ME',
        'form-name': 'Name', 'form-name-ph': 'Your Name',
        'form-email': 'Email', 'form-email-ph': 'your@email.com',
        'form-msg': 'Message', 'form-msg-ph': 'How can I help you?',
        'form-btn': 'SEND MESSAGE'
    }
};

// --- COMPONENTI UI ---

const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return (
        <motion.h1 className="intro-text" variants={container} initial="hidden" animate="visible">
            {letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}
            <span className="cursor"></span>
        </motion.h1>
    );
};

const FolderItem = ({ title, type, onClick }) => {
    const iconVariants = {
        rest: { y: 15, opacity: 0 },
        hover: { y: -30, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } }
    };

    const renderIcon = () => {
        switch (type) {
            case 'gcerti': return <motion.img loading="lazy" decoding="async" src={GCERTI_ICON} alt="GCERTI Italy - Brand Identity" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'whiterabbit': return <motion.img loading="lazy" decoding="async" src={WR_ICON} alt="White Rabbit Agency - AI Strategy" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'nero': return <motion.svg viewBox="0 0 100 100" className="folder-pop-icon" variants={iconVariants}><path d="M30 40 L 30 70 Q 30 85 50 85 Q 70 85 70 70 L 70 40 Z" fill="#4b3621" /><path d="M70 50 Q 85 50 85 60 Q 85 70 70 70" fill="none" stroke="#4b3621" strokeWidth="3" /></motion.svg>;
            case 'cuore': return <motion.img loading="lazy" decoding="async" src={CUORE_ICON} alt="#CuorediNapoli Art Project" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'noiumani': return <motion.img loading="lazy" decoding="async" src={NTA_ICON} alt="Noi Umani - New Media Art" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'procida': return <motion.img loading="lazy" decoding="async" src={NTA_ICON} alt="Procida Project" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'freelance': return <motion.svg viewBox="0 0 100 100" className="folder-pop-icon" variants={iconVariants}><path d="M50 15 L 60 40 L 90 40 L 65 60 L 75 85 L 50 70 L 25 85 L 35 60 L 10 40 L 40 40 Z" fill="#facc15" stroke="#eab308" strokeWidth="2" /></motion.svg>;
            default: return null;
        }
    };

    return (
        <motion.div className="folder-container" onClick={onClick} whileHover="hover" initial="rest" animate="rest">
            <div className="folder-icon-wrapper">
                {renderIcon()}
                <svg viewBox="0 0 100 80" className="folder-svg">
                    <path d="M5 10 L 35 10 L 40 15 L 95 15 L 95 75 L 5 75 Z" fill="#8ecae6" stroke="#219ebc" strokeWidth="1"/>
                    <path d="M5 25 L 95 25 L 95 75 L 5 75 Z" fill="#bde0fe" stroke="#219ebc" strokeWidth="1"/>
                </svg>
            </div>
            <span className="folder-label">{title}</span>
        </motion.div>
    );
};

const Reveal = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    );
};

const FooterSocialBtn = ({ icon, link }) => {
    return (
        <motion.a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
                display: 'inline-flex', 
                width: 'clamp(44px, 10vw, 50px)', 
                height: 'clamp(44px, 10vw, 50px)', 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.5)', 
                justifyContent: 'center', 
                alignItems: 'center', 
                border: '1px solid rgba(0,0,0,0.1)', 
                margin: '0 8px' 
            }} 
            whileHover={{ scale: 1.1, backgroundColor: '#fff' }} 
            whileTap={{ scale: 0.95 }}
        >
            <img loading="lazy" decoding="async" src={icon} alt="Social Link" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
        </motion.a>
    );
};

// --- MAIN APP ---

function App() {
    const [lang, setLang] = useState('it');
    const [view, setView] = useState('home');

    const { scrollY } = useScroll();
    const introOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const introBlur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(20px)"]);
    const introScale = useTransform(scrollY, [0, 400], [1, 0.9]);

    const toggleLang = () => setLang(prev => prev === 'it' ? 'en' : 'it');
    const navigateTo = (pageName) => setView(pageName);

    if (view !== 'home') {
        return (
            <ErrorBoundary goBack={() => setView('home')}>
                <Suspense fallback={
                    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} style={{ zIndex: 10, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', padding: 'clamp(15px, 4vw, 20px) clamp(20px, 5vw, 40px)', borderRadius: '30px' }}>
                            <h2 style={{ color: '#111', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600, margin: 0 }}>Caricamento...</h2>
                        </motion.div>
                    </div>
                }>
                    {view === 'whiterabbit' && <WhiteRabbit lang={lang} goBack={() => setView('home')} />}
                    {view === 'nero' && <NeroEspresso lang={lang} goBack={() => setView('home')} />}
                    {view === 'freelance' && <Freelance lang={lang} goBack={() => setView('home')} />}
                    {view === 'gcerti' && <GCerti lang={lang} goBack={() => setView('home')} />}
                </Suspense>
            </ErrorBoundary>
        );
    } 

    return (
        <div className="app-container">
            <div className="gradient-bg">
                <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                    <WaterGradient />
                </ShaderGradientCanvas>
            </div>

            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, filter: introBlur, scale: introScale }}>
                <Typewriter text={LANG_DATA[lang]['welcome']} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="scroll-hint">
                    {LANG_DATA[lang]['scroll-hint']}
                </motion.div>
            </motion.div>

            <div className="content-scroll-layer">
                <header style={{ position: 'fixed', top: 'clamp(15px, 4vw, 30px)', right: 'clamp(15px, 4vw, 30px)', zIndex: 100 }}>
                    <button onClick={toggleLang} className="lang-btn">{lang === 'it' ? 'EN' : 'IT'}</button>
                </header>

                {/* SEZIONE GRIGLIA COMPLETA (SELECTED WORKS) */}
                <section className="glass-section works-section" style={{ marginTop: '100dvh' }}>
                    <Reveal>
                        <h2 className="section-label">01 / {LANG_DATA[lang]['works-title']}</h2>
                        <div className="folders-grid">
                            <FolderItem title="GCERTI Italy" type="gcerti" onClick={() => navigateTo('gcerti')} />
                            <FolderItem title="White Rabbit" type="whiterabbit" onClick={() => navigateTo('whiterabbit')} />
                            <FolderItem title="Nero Espresso" type="nero" onClick={() => navigateTo('nero')} />
                            <FolderItem title="#CUOREDINAPOLI" type="cuore" onClick={() => window.open('https://cuoredinapoli.net/', '_blank')} />
                            <FolderItem title="Noi Umani" type="noiumani" onClick={() => window.open('https://www.nuovetecnologiedellarte.it/progetti/noi-umani/', '_blank')} />
                            <FolderItem title="Non io ma noi" type="procida" onClick={() => window.open('https://www.nuovetecnologiedellarte.it/progetti/scienza-aperta/', '_blank')} />
                            <FolderItem title="Freelance" type="freelance" onClick={() => navigateTo('freelance')} />
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section contact-section">
                    <Reveal>
                        <h2 className="section-label" style={{ textAlign: 'center', width: '100%' }}>02 / {LANG_DATA[lang]['contact-title']}</h2>
                        <form action="https://formspree.io/f/mrbnlyyl" method="POST" className="contact-form">
                            <div className="form-group"><label style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>{LANG_DATA[lang]['form-name']}</label><input type="text" name="name" placeholder={LANG_DATA[lang]['form-name-ph']} required className="form-input" /></div>
                            <div className="form-group"><label style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>{LANG_DATA[lang]['form-email']}</label><input type="email" name="email" placeholder={LANG_DATA[lang]['form-email-ph']} required className="form-input" /></div>
                            <div className="form-group"><label style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>{LANG_DATA[lang]['form-msg']}</label><textarea name="message" rows="5" placeholder={LANG_DATA[lang]['form-msg-ph']} required className="form-input"></textarea></div>
                            <motion.button type="submit" className="form-submit-btn" style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', padding: 'clamp(12px, 3vw, 15px)' }} whileHover={{ scale: 1.02, backgroundColor: "#111", color: "#fff" }} whileTap={{ scale: 0.95 }}>{LANG_DATA[lang]['form-btn']}</motion.button>
                        </form>
                    </Reveal>
                </section>

                <footer style={{ textAlign: 'center', padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)', opacity: 0.8 }}>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <FooterSocialBtn icon={ICON_LN} link="https://www.linkedin.com/in/angelo-russo-0964a8183" />
                        <FooterSocialBtn icon={ICON_IG} link="https://www.instagram.com/yellowjzard" />
                    </div>
                    <p style={{ opacity: 0.6, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>© 2026 Angelo Russo. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

export default App;
