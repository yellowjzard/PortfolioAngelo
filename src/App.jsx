import React, { useState, lazy, Suspense, useEffect } from 'react';
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
const PORTRAIT_IMG = "angelo-portrait.jpg";

// ICONE SOCIAL
const ICON_IG = "Icona_instagram.webp";
const ICON_LN = "Icona_linkedin.webp";

const LANG_DATA = {
    it: {
        'welcome': 'ANGELO RUSSO',
        'hero-sub': 'Specialista Digital Marketing B2B & Creative Technologist',
        'scroll-hint': 'Scorri per esplorare',
        'nav-about': 'Chi Sono',
        'nav-works': 'Progetti',
        'nav-edu': 'Formazione',
        'nav-contact': 'Contatti',
        'about-title': 'CHI SONO',
        'about-headline': 'Marketing B2B, architetture web e produzione AI.',
        'about-text': 'Specialista in Digital Marketing B2B e Tecnologie Multimediali con Laurea Magistrale conseguita con 110 e Lode all’Accademia di Belle Arti di Napoli. Unisco la gestione operativa di campagne Google Ads e Meta Ads, web architecture su WordPress e audit SEO tecnico alla produzione visiva e video AI-assisted (Higgsfield, Weavy, Google Flow, Adobe CC) e a workflow operativi strutturati su Codex, Claude Code e Antigravity con set personalizzati di skill, istruzioni e regolamenti. Esperienza internazionale a Bruxelles tramite mobilità Erasmus+ VET sulle linee guida della Commissione Europea.',
        'cv-it': 'Scarica CV (IT)',
        'cv-en': 'Download CV (EN)',
        'pillars': [
            { k: 'Paid & Funnel', v: 'Google Ads · Meta Lead Ads · 123form' },
            { k: 'Web & SEO Tecnica', v: 'WordPress · Search Console · Redirect 301' },
            { k: 'Lead Ops & DEM', v: 'MailUp · Webinar B2B · OBS Studio' },
            { k: 'AI Workflows & Media', v: 'Antigravity · Claude Code · Codex · Higgsfield · Weavy · Flow' }
        ],
        'works-title': 'Selected Works',
        'works-sub': 'Progetti reali, case study documentati ed esperienze accademiche e territoriali.',
        'edu-title': 'FORMAZIONE & CREDENZIALI',
        'edu-items': [
            {
                title: 'Laurea Magistrale (II° Liv.) — Nuove Tecnologie per l’Arte',
                meta: 'Accademia di Belle Arti di Napoli · Marzo 2024',
                badge: '110 e Lode / 110',
                note: '9 lodi su 11 esami. Tesi collettiva e contributo sui Dispositivi Estetici Acceleranti (D.E.A.) e installazioni interattive.'
            },
            {
                title: 'Laurea Triennale (I° Liv.) — Nuove Tecnologie per l’Arte',
                meta: 'Accademia di Belle Arti di Napoli · Marzo 2022',
                badge: '109 / 110',
                note: 'Percorso centrato su computer graphic, progettazione software interattivi, net art e fotografia digitale.'
            },
            {
                title: 'Mobilità Internazionale Erasmus+ VET — Bruxelles',
                meta: 'White Rabbit Integrated Communication · Ago – Dic 2025',
                badge: '4 mesi · Belgio',
                note: 'Tirocinio europeo su brand identity, pitch deck Keynote, conformità Commissione Europea (Global Gateway) e flussi multimediali.'
            },
            {
                title: 'Stage Accademici & Installazioni Territoriali',
                meta: 'Futuro Remoto · Giornate FAI · #CUOREDINAPOLI',
                badge: '2019 – 2024',
                note: 'Progettazione di installazioni interattive (Physical Computing, spazi sonori) e coordinamento sul campo per eventi pubblici ad alta affluenza.'
            }
        ],
        'contact-title': 'CONTATTI',
        'contact-sub': 'Afragola (NA) · Disponibile per progetti digitali, consulenze e opportunità lavorative.',
        'form-name': 'Nome', 'form-name-ph': 'Il tuo nome',
        'form-email': 'Email', 'form-email-ph': 'tua@email.com',
        'form-msg': 'Messaggio', 'form-msg-ph': 'Come posso aiutarti?',
        'form-btn': 'INVIA MESSAGGIO'
    },
    en: {
        'welcome': 'ANGELO RUSSO',
        'hero-sub': 'Digital Marketing Specialist & Creative Technologist (B2B)',
        'scroll-hint': 'Scroll to explore',
        'nav-about': 'About',
        'nav-works': 'Works',
        'nav-edu': 'Education',
        'nav-contact': 'Contact',
        'about-title': 'ABOUT ME',
        'about-headline': 'B2B marketing, web architecture, and AI media workflows.',
        'about-text': 'B2B Digital Marketing Specialist and Creative Technologist holding a Master’s degree with honors (110/110 cum laude in New Technologies for Art, Academy of Fine Arts of Naples). I combine hands-on management of Google Ads and Meta Ads campaigns, WordPress architecture, and technical SEO audits with AI-assisted visual/video production (Higgsfield, Weavy, Google Flow, Adobe CC) and structured agentic workflows built on Codex, Claude Code, and Antigravity using custom skills, instructions, and operational guardrails. International experience in Brussels via Erasmus+ VET under European Commission brand guidelines.',
        'cv-it': 'Download CV (IT)',
        'cv-en': 'Download CV (EN)',
        'pillars': [
            { k: 'Paid & Funnel', v: 'Google Ads · Meta Lead Ads · 123form' },
            { k: 'Web & Technical SEO', v: 'WordPress · Search Console · 301 Redirects' },
            { k: 'Lead Ops & Email', v: 'MailUp · B2B Webinars · OBS Studio' },
            { k: 'AI Workflows & Media', v: 'Antigravity · Claude Code · Codex · Higgsfield · Weavy · Flow' }
        ],
        'works-title': 'Selected Works',
        'works-sub': 'Verified real-world projects, documented case studies, and academic interactive installations.',
        'edu-title': 'EDUCATION & CREDENTIALS',
        'edu-items': [
            {
                title: 'Master’s Degree — New Technologies for Art (AFAM II Level)',
                meta: 'Academy of Fine Arts of Naples · March 2024',
                badge: '110/110 cum laude',
                note: '9 distinctions out of 11 graded exams. Thesis on Aesthetic Accelerating Devices (D.E.A.) and interactive public installations.'
            },
            {
                title: 'Bachelor’s Degree — New Technologies for Art (AFAM I Level)',
                meta: 'Academy of Fine Arts of Naples · March 2022',
                badge: '109 / 110',
                note: 'Focused on computer graphics, interactive software design, net art, and digital photography.'
            },
            {
                title: 'Erasmus+ VET International Mobility — Brussels',
                meta: 'White Rabbit Integrated Communication · Aug – Dec 2025',
                badge: '4 months · Belgium',
                note: 'European traineeship on brand identity, Keynote pitch decks, EU Global Gateway compliance, and multimedia assets.'
            },
            {
                title: 'Academic Internships & Public Tech Installations',
                meta: 'Futuro Remoto · FAI Days · #CUOREDINAPOLI',
                badge: '2019 – 2024',
                note: 'Designed interactive installations (Physical Computing, acoustic spaces) and handled on-site coordination for large public cultural and science events.'
            }
        ],
        'contact-title': 'CONTACT',
        'contact-sub': 'Naples / Afragola, Italy · Available for digital marketing, web/AI projects, and opportunities.',
        'form-name': 'Name', 'form-name-ph': 'Your Name',
        'form-email': 'Email', 'form-email-ph': 'your@email.com',
        'form-msg': 'Message', 'form-msg-ph': 'How can I help you?',
        'form-btn': 'SEND MESSAGE'
    }
};

// --- COMPONENTI UI ---

const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return (
        <motion.h1 key={text} className="intro-text" style={{ fontSize: 'clamp(2.4rem, 8.5vw, 7.2rem)' }} variants={container} initial="hidden" animate="visible">
            {letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}
            <span className="cursor" style={{ height: 'clamp(2.1rem, 7.5vw, 6.2rem)' }}></span>
        </motion.h1>
    );
};

const FolderItem = ({ title, sub, type, onClick, isExternal = false }) => {
    const iconVariants = {
        rest: { y: 15, opacity: 0 },
        hover: { y: -30, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } }
    };

    const renderIcon = () => {
        switch (type) {
            case 'gcerti': return <motion.img loading="lazy" decoding="async" src={GCERTI_ICON} alt="GCERTI Italy" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'whiterabbit': return <motion.img loading="lazy" decoding="async" src={WR_ICON} alt="White Rabbit Brussels" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'nero': return <motion.svg viewBox="0 0 100 100" className="folder-pop-icon" variants={iconVariants}><path d="M30 40 L 30 70 Q 30 85 50 85 Q 70 85 70 70 L 70 40 Z" fill="#4b3621" /><path d="M70 50 Q 85 50 85 60 Q 85 70 70 70" fill="none" stroke="#4b3621" strokeWidth="3" /></motion.svg>;
            case 'cuore': return <motion.img loading="lazy" decoding="async" src={CUORE_ICON} alt="#CUOREDINAPOLI" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'noiumani': return <motion.img loading="lazy" decoding="async" src={NTA_ICON} alt="Noi Umani" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'procida': return <motion.img loading="lazy" decoding="async" src={NTA_ICON} alt="Non io ma noi" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'freelance': return <motion.svg viewBox="0 0 100 100" className="folder-pop-icon" variants={iconVariants}><path d="M50 15 L 60 40 L 90 40 L 65 60 L 75 85 L 50 70 L 25 85 L 35 60 L 10 40 L 40 40 Z" fill="#facc15" stroke="#eab308" strokeWidth="2" /></motion.svg>;
            default: return null;
        }
    };

    return (
        <motion.div className="folder-container" onClick={onClick} whileHover="hover" initial="rest" animate="rest">
            <div className="folder-icon-wrapper">
                {renderIcon()}
                <svg viewBox="0 0 100 80" className="folder-svg">
                    <path d="M5 10 L 35 10 L 40 15 L 95 15 L 95 75 L 5 75 Z" fill="#8ecae6" stroke="#219ebc" strokeWidth="1" />
                    <path d="M5 25 L 95 25 L 95 75 L 5 75 Z" fill="#bde0fe" stroke="#219ebc" strokeWidth="1" />
                </svg>
            </div>
            <span className="folder-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 600 }}>
                {title} {isExternal && <span style={{ opacity: 0.6, fontSize: '0.8em' }}>↗</span>}
            </span>
            {sub && <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '3px', textAlign: 'center' }}>{sub}</span>}
        </motion.div>
    );
};

const Reveal = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.75 }}
    >
        {children}
    </motion.div>
);

const FooterSocialBtn = ({ icon, link, label }) => (
    <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        style={{
            display: 'inline-flex',
            width: 'clamp(44px, 10vw, 50px)',
            height: 'clamp(44px, 10vw, 50px)',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.65)',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.1)',
            margin: '0 8px'
        }}
        whileHover={{ scale: 1.1, backgroundColor: '#fff' }}
        whileTap={{ scale: 0.95 }}
    >
        <img loading="lazy" decoding="async" src={icon} alt={label} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
    </motion.a>
);

// --- MAIN APP ---

function App() {
    const [lang, setLang] = useState('it');
    const [view, setView] = useState('home');
    const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

    const { scrollY } = useScroll();
    const introOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const introBlur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(20px)"]);
    const introScale = useTransform(scrollY, [0, 400], [1, 0.9]);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            if (latest > 800 && !isScrolledPastHero) {
                setIsScrolledPastHero(true);
            } else if (latest <= 800 && isScrolledPastHero) {
                setIsScrolledPastHero(false);
            }
        });
    }, [scrollY, isScrolledPastHero]);

    const toggleLang = () => setLang(prev => prev === 'it' ? 'en' : 'it');
    const navigateTo = (pageName) => {
        window.scrollTo(0, 0);
        setView(pageName);
    };

    const t = LANG_DATA[lang];

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
                    <WaterGradient animate={isScrolledPastHero ? "off" : "on"} />
                </ShaderGradientCanvas>
            </div>

            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, filter: introBlur, scale: introScale, padding: '0 20px' }}>
                <Typewriter text={t['welcome']} />
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    style={{
                        marginTop: '14px',
                        fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)',
                        fontWeight: 500,
                        color: '#1e3a5f',
                        textAlign: 'center',
                        maxWidth: '720px',
                        padding: '0 24px',
                        lineHeight: 1.45,
                        textWrap: 'balance'
                    }}
                >
                    {t['hero-sub']}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="scroll-hint">
                    {t['scroll-hint']}
                </motion.div>
            </motion.div>

            <div className="content-scroll-layer">
                <header style={{
                    position: 'fixed', top: 'clamp(15px, 4vw, 30px)', right: 'clamp(15px, 4vw, 30px)',
                    zIndex: 100, display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end'
                }}>
                    <nav style={{ display: 'flex', gap: '14px', background: 'rgba(255,255,255,0.6)', padding: '8px 18px', borderRadius: '25px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                        <a href="#about" style={{ textDecoration: 'none', color: '#111', fontWeight: 500, fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)' }}>{t['nav-about']}</a>
                        <a href="#works" style={{ textDecoration: 'none', color: '#111', fontWeight: 500, fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)' }}>{t['nav-works']}</a>
                        <a href="#education" style={{ textDecoration: 'none', color: '#111', fontWeight: 500, fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)' }}>{t['nav-edu']}</a>
                        <a href="#contact" style={{ textDecoration: 'none', color: '#111', fontWeight: 500, fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)' }}>{t['nav-contact']}</a>
                    </nav>
                    <button onClick={toggleLang} className="lang-btn">{lang === 'it' ? 'EN' : 'IT'}</button>
                </header>

                {/* 01 / CHI SONO */}
                <section id="about" className="glass-section" style={{ marginTop: '100dvh' }}>
                    <Reveal>
                        <h2 className="section-label">01 / {t['about-title']}</h2>
                        <div className="bio-content-wrapper">
                            <div className="bio-image-col">
                                <img src={PORTRAIT_IMG} alt="Angelo Russo" className="profile-photo" />
                            </div>
                            <div className="bio-text-col">
                                <h3 className="bio-headline" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '16px', color: '#14181F' }}>
                                    {t['about-headline']}
                                </h3>
                                <p className="bio-text" style={{ fontSize: 'clamp(0.98rem, 2vw, 1.08rem)', marginBottom: '26px', color: '#272E3A' }}>
                                    {t['about-text']}
                                </p>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'inherit' }}>
                                    <a href="/CV_Angelo_Russo.pdf" target="_blank" rel="noopener noreferrer" className="cv-download-btn">
                                        {t['cv-it']} ↓
                                    </a>
                                    <a href="/CV_Angelo_Russo_EN.pdf" target="_blank" rel="noopener noreferrer" className="cv-download-btn" style={{ borderColor: '#1E3A5F', color: '#1E3A5F' }}>
                                        {t['cv-en']} ↓
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '40px', paddingTop: '28px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                            {t['pillars'].map((p, idx) => (
                                <div key={idx} style={{ background: 'rgba(255,255,255,0.6)', padding: '16px 18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)' }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1E3A5F', marginBottom: '6px' }}>{p.k}</div>
                                    <div style={{ fontSize: '0.88rem', color: '#1F2937', fontWeight: 500, lineHeight: 1.4 }}>{p.v}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* 02 / SELECTED WORKS */}
                <section id="works" className="glass-section works-section">
                    <Reveal>
                        <h2 className="section-label">02 / {t['works-title']}</h2>
                        <p className="section-desc" style={{ marginBottom: '12px', fontSize: '1rem', color: '#4B5563' }}>{t['works-sub']}</p>
                        {(() => {
                            const workFolders = [
                                { title: 'GCERTI Italy | SB', sub: '2026 · Marketing B2B', type: 'gcerti', isExternal: false, onClick: () => navigateTo('gcerti') },
                                { title: 'White Rabbit', sub: '2025 · Erasmus+ BXL', type: 'whiterabbit', isExternal: false, onClick: () => navigateTo('whiterabbit') },
                                { title: 'Nero Espresso', sub: '2024 · Brand & 3D', type: 'nero', isExternal: false, onClick: () => navigateTo('nero') },
                                { title: '#CUOREDINAPOLI', sub: '2020–24 · Art & Tech', type: 'cuore', isExternal: true, onClick: () => window.open('https://cuoredinapoli.net/', '_blank') },
                                { title: 'Noi Umani', sub: 'ABANA · New Media', type: 'noiumani', isExternal: true, onClick: () => window.open('https://www.nuovetecnologiedellarte.it/progetti/noi-umani/', '_blank') },
                                { title: 'Non io ma noi', sub: 'Scienza Aperta · DEA', type: 'procida', isExternal: true, onClick: () => window.open('https://www.nuovetecnologiedellarte.it/progetti/scienza-aperta/', '_blank') },
                                { title: 'Freelance Lab', sub: 'AR, 3D & Video AI', type: 'freelance', isExternal: false, onClick: () => navigateTo('freelance') },
                            ];
                            return (
                                <div className="folders-marquee">
                                    <div className="folders-marquee-track">
                                        <div className="folders-marquee-group">
                                            {workFolders.map((folder) => (
                                                <FolderItem key={`a-${folder.type}`} title={folder.title} sub={folder.sub} type={folder.type} isExternal={folder.isExternal} onClick={folder.onClick} />
                                            ))}
                                        </div>
                                        <div className="folders-marquee-group" aria-hidden="true">
                                            {workFolders.map((folder) => (
                                                <FolderItem key={`b-${folder.type}`} title={folder.title} sub={folder.sub} type={folder.type} isExternal={folder.isExternal} onClick={folder.onClick} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </Reveal>
                </section>

                {/* 03 / FORMAZIONE & CREDENZIALI */}
                <section id="education" className="glass-section">
                    <Reveal>
                        <h2 className="section-label">03 / {t['edu-title']}</h2>
                        <div className="credentials-grid">
                            {t['edu-items'].map((edu, idx) => (
                                <div key={idx} style={{ background: 'rgba(255,255,255,0.72)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.85)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px', height: '100%' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#14181F', lineHeight: 1.3 }}>{edu.title}</h3>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E3A5F', background: '#E0ECFA', padding: '4px 10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>{edu.badge}</span>
                                        </div>
                                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4B5563', marginBottom: '8px' }}>{edu.meta}</div>
                                        <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.5, margin: 0 }}>{edu.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* 04 / CONTATTI */}
                <section id="contact" className="glass-section contact-section">
                    <Reveal>
                        <h2 className="section-label" style={{ textAlign: 'center', width: '100%' }}>04 / {t['contact-title']}</h2>
                        <p style={{ textAlign: 'center', color: '#4B5563', fontSize: '0.98rem', marginBottom: '14px' }}>
                            {t['contact-sub']}
                        </p>
                        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
                            <a
                                href="mailto:info@angelorusso.eu"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 18px',
                                    borderRadius: '100px',
                                    background: 'rgba(138, 179, 255, 0.14)',
                                    border: '1px solid rgba(59, 130, 246, 0.25)',
                                    color: '#1E293B',
                                    fontSize: '0.92rem',
                                    fontWeight: 600,
                                    textDecoration: 'none'
                                }}
                            >
                                ✉ info@angelorusso.eu
                            </a>
                        </div>
                        <form action="https://formspree.io/f/mrbnlyyl" method="POST" className="contact-form">
                            <div className="form-group"><label style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>{t['form-name']}</label><input type="text" name="name" placeholder={t['form-name-ph']} required className="form-input" /></div>
                            <div className="form-group"><label style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>{t['form-email']}</label><input type="email" name="email" placeholder={t['form-email-ph']} required className="form-input" /></div>
                            <div className="form-group"><label style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>{t['form-msg']}</label><textarea name="message" rows="5" placeholder={t['form-msg-ph']} required className="form-input"></textarea></div>
                            <motion.button type="submit" className="form-submit-btn" style={{ fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', padding: 'clamp(12px, 3vw, 15px)' }} whileHover={{ scale: 1.02, backgroundColor: "#111", color: "#fff" }} whileTap={{ scale: 0.95 }}>{t['form-btn']}</motion.button>
                        </form>
                    </Reveal>
                </section>

                <footer style={{ textAlign: 'center', padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)', opacity: 0.85 }}>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <FooterSocialBtn icon={ICON_LN} link="https://www.linkedin.com/in/angelo-russo-0964a8183" label="LinkedIn" />
                        <FooterSocialBtn icon={ICON_IG} link="https://www.instagram.com/yellowjzard" label="Instagram" />
                    </div>
                    <p style={{ opacity: 0.65, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>© 2026 Angelo Russo · Afragola (NA), Italia</p>
                </footer>
            </div>
        </div>
    );
}

function WaterGradient({ animate = "on" }) {
    return <ShaderGradient animate={animate} axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

export default App;
