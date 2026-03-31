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
const PROFILE_IMG = "Portrait-Angelo-Russo.webp"; 
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
        
        'bio-title': 'Angelo Russo.',
        'bio-sub': 'Creative Designer | AI Strategy & Visual Production',
        
        'bio-intro': [
            `Il mio approccio al design è tecnologicamente agnostico: la tecnologia non è il punto di partenza, ma l'orchestra al servizio dell'idea. Come Dottore Magistrale in Nuove Tecnologie dell'Arte, considero i software non come vincoli, ma come mezzi flessibili per ingegnerizzare soluzioni visive ad alto impatto. La mia missione è tradurre la complessità dell'Intelligenza Artificiale in narrazioni potenti, garantendo che la tecnica sia sempre il braccio operativo del concept.`,
            `Dall'esperienza internazionale a Bruxelles presso White Rabbit — dove ho progettato workflow creativi integrando modelli avanzati come Higgsfield e Agenti Gemini — fino al mio attuale ruolo di Marketing Specialist presso GCERTI Italy, ho imparato a muovermi fluidamente tra rigore istituzionale e sperimentazione generativa. La mia carriera è segnata da una crescita rapida, guidata dalla capacità di ottimizzare i processi tramite pipeline AI proprietarie.`
        ],
        'bio-skills-title': 'Valore Strategico & Competenze:',
        'bio-skills-list': [
            { title: 'AI Pipeline Architecture:', desc: 'Progettazione di flussi di lavoro "AI-Augmented" per abbattere i tempi di produzione mantenendo il controllo autoriale e la coerenza del brand.' },
            { title: 'Institutional Visual Branding:', desc: 'Esperienza nella gestione di identità visive complesse, conformi alle rigorose EU Guidelines e standard internazionali.' },
            { title: 'Creative Problem Solving:', desc: 'Un mindset analitico che supera i limiti tecnici dei software, esplorando soluzioni ibride tra graphic design e flussi video neurali.' },
            { title: 'Versatilità Multidisciplinare:', desc: 'Capacità di orchestrare progetti su larga scala, dal print design alle installazioni interattive, fondendo sensibilità artistica e precisione operativa.' }
        ],
        'bio-philosophy': 'Credo in un design che non sia solo guardato, ma vissuto. Un ecosistema dove la tecnologia non sostituisce l\'essere umano, ma ne amplifica esponenzialmente le possibilità creative.',

        'btn-cv': 'SCARICA CV (PDF)',
        'btn-read-more': 'LEGGI DI PIÙ',
        'btn-read-less': 'MOSTRA MENO',
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
        
        'bio-title': 'Angelo Russo.',
        'bio-sub': 'Creative Designer | AI Strategy & Visual Production',
        
        'bio-intro': [
            `My approach to design is technologically agnostic: technology is not the starting point, but the orchestra at the service of the idea. As a Master of Arts (M.A.) in New Technologies for Arts, I view software not as a constraint, but as a flexible medium for engineering high-impact visual solutions. My mission is to translate the complexity of Artificial Intelligence into powerful narratives, ensuring that technique remains the operational arm of the concept.`,
            `From my international experience in Brussels at White Rabbit — where I designed creative workflows integrating advanced models like Higgsfield and Gemini Agents — to my current role as a Marketing Specialist at GCERTI Italy, I have learned to navigate fluidly between institutional rigor and generative experimentation. My career is defined by rapid growth, driven by the ability to optimize processes through proprietary AI pipelines.`
        ],
        'bio-skills-title': 'Strategic Value & Core Competencies:',
        'bio-skills-list': [
            { title: 'AI Pipeline Architecture:', desc: 'Designing "AI-Augmented" workflows to significantly reduce production times while maintaining authorial control and brand consistency.' },
            { title: 'Institutional Visual Branding:', desc: 'Proven experience in managing complex visual identities compliant with rigorous EU Guidelines and international standards.' },
            { title: 'Creative Problem Solving:', desc: 'An analytical mindset that transcends technical software limits, exploring hybrid solutions between traditional graphic design and neural video streams.' },
            { title: 'Multidisciplinary Versatility:', desc: 'Ability to orchestrate large-scale projects, from print design to interactive installations, blending artistic sensitivity with operational precision.' }
        ],
        'bio-philosophy': 'I believe in design that is not just seen, but experienced. An ecosystem where technology does not replace the human element, but exponentially amplifies creative possibilities.',

        'btn-cv': 'DOWNLOAD CV (PDF)',
        'btn-read-more': 'READ MORE',
        'btn-read-less': 'SHOW LESS',
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
                width: 'clamp(44px, 10vw, 50px)', // Ottimizzato per Touch Mobile
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
    const [showFullBio, setShowFullBio] = useState(false);

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
                    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="gradient-bg">
                            <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                                <WaterGradient />
                            </ShaderGradientCanvas>
                        </div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, yoyo: Infinity }} style={{ zIndex: 10, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', padding: 'clamp(15px, 4vw, 20px) clamp(20px, 5vw, 40px)', borderRadius: '30px' }}>
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
                {/* Header Adattivo su Mobile */}
                <header style={{ position: 'fixed', top: 'clamp(15px, 4vw, 30px)', right: 'clamp(15px, 4vw, 30px)', zIndex: 100 }}>
                    <button onClick={toggleLang} className="lang-btn">{lang === 'it' ? 'EN' : 'IT'}</button>
                </header>

                <section className="glass-section bio-section">
                    <Reveal>
                        <div className="bio-content-wrapper">
                            <div className="bio-image-col">
                                <img loading="lazy" decoding="async" src={PROFILE_IMG} alt="Angelo Russo - AI Specialist & Creative Designer" className="profile-photo" />
                            </div>

                            <div className="bio-text-col">
                                <h1 className="bio-headline" style={{ fontSize: 'clamp(1.8rem, 8vw, 4rem)', fontWeight: 800, marginBottom: '0.25rem' }}>
                                    {LANG_DATA[lang]['bio-title']}
                                </h1>
                                
                                <h2 style={{ 
                                    fontSize: 'clamp(0.9rem, 3vw, 1.25rem)', 
                                    fontWeight: 400, 
                                    color: 'rgba(0,0,0,0.6)', 
                                    letterSpacing: '0.3px',
                                    marginTop: 0,
                                    marginBottom: '1.5rem'
                                }}>
                                    {LANG_DATA[lang]['bio-sub']}
                                </h2>
                                
                                <p className="bio-text" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', lineHeight: '1.6', marginBottom: '20px' }}>
                                    {LANG_DATA[lang]['bio-intro'][0]}
                                </p>

                                <motion.div
                                    initial={false}
                                    animate={{ height: showFullBio ? 'auto' : 0, opacity: showFullBio ? 1 : 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <p className="bio-text" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', lineHeight: '1.6', marginBottom: '20px' }}>
                                        {LANG_DATA[lang]['bio-intro'][1]}
                                    </p>

                                    <div style={{ marginBottom: '30px', marginTop: '10px' }}>
                                        <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.2rem)', fontWeight: 700, marginBottom: '15px', color: '#111' }}>
                                            {LANG_DATA[lang]['bio-skills-title']}
                                        </h3>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {LANG_DATA[lang]['bio-skills-list'].map((skill, index) => (
                                                <li key={index} style={{ marginBottom: '12px', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: '#444', lineHeight: '1.5' }}>
                                                    <span style={{ fontWeight: 700, color: '#2563eb' }}>• {skill.title}</span> {skill.desc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <p className="bio-text" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', fontStyle: 'italic', color: '#555', borderLeft: '3px solid #ccc', paddingLeft: '15px' }}>
                                        {LANG_DATA[lang]['bio-philosophy']}
                                    </p>
                                </motion.div>

                                {/* Contenitore Pulsanti Ottimizzato Mobile */}
                                <div style={{ 
                                    display: 'flex', 
                                    gap: 'clamp(10px, 2vw, 15px)', 
                                    marginTop: '30px', 
                                    flexWrap: 'wrap',
                                    width: '100%' 
                                }}>
                                    <motion.button
                                        onClick={() => setShowFullBio(!showFullBio)}
                                        className="read-more-btn"
                                        whileHover={{ scale: 1.05, backgroundColor: "#2563eb", color: "#fff" }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            flex: '1 1 200px', // Si espande su mobile, resta fianco a fianco su desktop
                                            padding: 'clamp(10px, 2.5vw, 12px) clamp(16px, 4vw, 24px)',
                                            backgroundColor: showFullBio ? '#2563eb' : 'transparent',
                                            color: showFullBio ? '#fff' : '#2563eb',
                                            border: '2px solid #2563eb',
                                            borderRadius: '30px',
                                            fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {showFullBio ? LANG_DATA[lang]['btn-read-less'] : LANG_DATA[lang]['btn-read-more']}
                                    </motion.button>

                                    <motion.a
                                        href="/Cv_Angelo_Russo.pdf"
                                        download="Cv_Angelo_Russo"
                                        className="cv-download-btn"
                                        whileHover={{ scale: 1.05, backgroundColor: "#111", color: "#fff" }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            flex: '1 1 200px', // Stesso comportamento responsive
                                            padding: 'clamp(10px, 2.5vw, 12px) clamp(16px, 4vw, 24px)',
                                            backgroundColor: '#111',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '30px',
                                            fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'8px'}}>
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                        {LANG_DATA[lang]['btn-cv']}
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section works-section">
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
                        <h2 className="section-label" style={{textAlign:'center', width:'100%'}}>02 / {LANG_DATA[lang]['contact-title']}</h2>
                        <form action="https://formspree.io/f/mrbnlyyl" method="POST" className="contact-form">
                            <div className="form-group"><label style={{fontSize: 'clamp(0.85rem, 2vw, 0.9rem)'}}>{LANG_DATA[lang]['form-name']}</label><input type="text" name="name" placeholder={LANG_DATA[lang]['form-name-ph']} required className="form-input" /></div>
                            <div className="form-group"><label style={{fontSize: 'clamp(0.85rem, 2vw, 0.9rem)'}}>{LANG_DATA[lang]['form-email']}</label><input type="email" name="email" placeholder={LANG_DATA[lang]['form-email-ph']} required className="form-input" /></div>
                            <div className="form-group"><label style={{fontSize: 'clamp(0.85rem, 2vw, 0.9rem)'}}>{LANG_DATA[lang]['form-msg']}</label><textarea name="message" rows="5" placeholder={LANG_DATA[lang]['form-msg-ph']} required className="form-input"></textarea></div>
                            <motion.button type="submit" className="form-submit-btn" style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', padding: 'clamp(12px, 3vw, 15px)' }} whileHover={{ scale: 1.02, backgroundColor: "#111", color: "#fff" }} whileTap={{ scale: 0.95 }}>{LANG_DATA[lang]['form-btn']}</motion.button>
                        </form>
                    </Reveal>
                </section>

                <footer style={{textAlign: 'center', padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)', opacity: 0.8}}>
                    <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                        <FooterSocialBtn icon={ICON_LN} link="https://www.linkedin.com/in/angelo-russo-0964a8183" />
                        <FooterSocialBtn icon={ICON_IG} link="https://www.instagram.com/yellowjzard" />
                    </div>
                    <p style={{opacity: 0.6, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'}}>© 2026 Angelo Russo. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

export default App;
