import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- CONFIGURAZIONE LINK ---
const SOCIAL_LINKS = {
    web: "https://www.brusselswhiterabbit.eu/?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
    ig: "https://www.instagram.com/white_rabbit_brussels?igsh=MmduaWZvamlqM3U=",
    ln: "https://www.linkedin.com/company/whiterabbithole/"
};

// --- ASSET ---
const PROMPT_IMG_RAW = "Reference_Edgar_raw.webp";
const PROMPT_IMG_GEN = "Reference_Edgar_Gen.webp";
const WR_VIDEO = "WR-RP-Endurance.mp4";
const EU_PDF_FILE = "PanAfGeo_Branding.pdf";
const EU_COVER_IMG = "panafgeocover.jpg";

// --- ICONE SOCIAL ---
const ICON_IG = "Icona_instagram.webp";
const ICON_LN = "Icona_linkedin.webp";
const ICON_WEB = "Icona_site.webp";

// --- DATI FEED INSTAGRAM ---
const IG_CONTENT = [
    { id: 1, type: 'image', thumb: 'ukopost1.jpg', src: 'ukopost1.jpg' },
    { id: 2, type: 'image', thumb: 'ukopost2.jpg', src: 'ukopost2.jpg' },
    { id: 3, type: 'image', thumb: 'ukopost3.jpg', src: 'ukopost3.jpg' },
    { id: 4, type: 'video', thumb: 'ukopost4.png', src: 'ukopost4.mp4' },
    { id: 5, type: 'image', thumb: 'ukopost5.jpg', src: 'ukopost5.jpg' },
    { id: 6, type: 'image', thumb: 'ukopost6.jpg', src: 'ukopost6.jpg' },
];

// --- IMMAGINI CASE STUDIES ---
const CASE_IMAGES = {
    challenge_thumb: "log_whiterabbit.webp",
    solution_thumb: "icon_lasoluzione.webp",
    process_step1: "Gen_imageandvideo.webp",
    process_step2: "edit_after.webp",
    process_step3: "sounddesign.webp",
    uk_step1: "agentai.webp",
    uk_step2: "copertina uko.webp",
    uk_step3: "copertinauko02.webp",
    uk_profile_pic: "uko.logo.jpg",
    eu_step1: "euguide.003.png",
    eu_step2: "brochure.005.png",
    eu_step3: "gadget.009.png",
    collab_avatar: "gennarogrieco.jpeg"
};

const WR_LANG = {
    it: {
        'back': '← TORNA',
        'title': 'WHITE RABBIT AGENCY',
        'role-title': 'Generative AI Strategy & Visual Production',
        'role-sub': 'Creative Designer & AI Specialist @ White Rabbit Agency',
        'slogan': 'Ingegnerizzare la creatività: flussi video neurali e Agenti AI per campagne internazionali.',
        'prompt-text': '/imagine prompt: editorial photography, futuristic fashion, cinematic lighting --v 6.0',
        'btn-generate': 'GENERA', 'btn-done': 'COMPLETATO',
        'challenge-t': 'LA SFIDA', 'challenge-d': 'L’agenzia necessitava di un salto evolutivo nella produzione video per campagne internazionali. La sfida era superare i limiti di tempo e budget del rendering tradizionale, mantenendo una qualità cinematografica e un controllo autoriale preciso.',
        'solution-t': 'LA SOLUZIONE', 'solution-d': 'Ho progettato una pipeline "AI-Augmented" proprietaria integrando Higgsfield (modelli Nano, Banana Pro e Veo) per la generazione video controllata, e sviluppato Agenti Gemini per automatizzare scripting e concept. I tempi di lavorazione sono passati da giorni a poche ore di generazione.',
        'results-t': 'IMPATTO & RISULTATI', 'res-1': 'Time-to-Market: -60%', 'res-2': 'Workflow Ibrido', 'res-3': 'Agenti Autonomi', 'res-4': 'AI Pioneer Status',
        'project-endurance': 'THE ENDURANCE PROJECT', 'project-desc': 'Corporate Storytelling Epico: un tributo alla resilienza del team ispirato alla storica spedizione del 1914. I dipendenti diventano i protagonisti cinematografici grazie all\'integrazione di AI Face Swap.',
        'step-1-t': 'AI World Building', 'step-1-d': 'Definizione dell’estetica tramite prompting avanzato e generazione di style-frames coerenti per il setting delle scene.',
        'step-2-t': 'Hybrid Editing & Face Swap', 'step-2-d': 'Montaggio tradizionale integrato con tecniche di Neural Face Swap. Ho sostituito i volti dei soggetti generati con i character target, garantendo la Character Consistency in ogni scena.',
        'step-3-t': 'Sonic Branding', 'step-3-d': 'Sound design immersivo e sincronizzazione audio per conferire profondità emotiva e peso realistico alle clip generate.',
        'project-uk': 'URBAN KONG', 'project-uk-desc': 'Social Media Growth & Hybrid Content Strategy.',
        'uk-s1-t': 'AI Editorial Brain', 'uk-s1-d': 'Analisi trend e ideazione topic cluster tramite Agenti Gemini per un piano editoriale data-driven sempre aggiornato.',
        'uk-s2-t': 'Reels & Motion', 'uk-s2-d': 'Produzione video short-form: editing dinamico, sound design e hook visivi per massimizzare la retention.',
        'uk-s3-t': 'Brand Aesthetics', 'uk-s3-d': 'Cura del feed e gestione della community per trasformare l\'identità visiva in engagement reale.',
        'ig-btn-label': 'VISITA @URBANKONG_',
        'project-eu': 'PANAFGEO / EU BRANDING',
        'project-eu-desc': 'Visual Identity istituzionale per il programma EU Global Gateway, in totale conformità con le rigorose EU Guidelines dell\'Unione Europea e di EuroGeoSurveys.',
        'eu-pdf-title': 'PANAFGEO - Brand Guidelines',
        'eu-pdf-description': 'Brand book completo per il progetto PanAfGeo: linee guida EU, identità visiva, griglie editoriali e applicazioni istituzionali per il programma di formazione geologica pan-Africano.',
        'credits-title': 'CREDITS & TEAM',
        'collab-name': 'Gennaro Grieco',
        'collab-role': 'Graphic Designer | UI/UX ',
        'download-pdf': 'SCARICA BRAND BOOK (PDF)',
        'flip-hint': 'Gira',
        'explore-hint': 'Tocca per esplorare'
    },
    en: {
        'back': '← BACK',
        'title': 'WHITE RABBIT AGENCY',
        'role-title': 'Generative AI Strategy & Visual Production',
        'role-sub': 'Creative Designer & AI Specialist @ White Rabbit Agency',
        'slogan': 'Engineering creativity: neural video workflows and custom AI Agents.',
        'prompt-text': '/imagine prompt: editorial photography, futuristic fashion, cinematic lighting --v 6.0',
        'btn-generate': 'GENERATE',
        'btn-done': 'DONE',
        'challenge-t': 'THE CHALLENGE',
        'challenge-d': 'The agency required an evolutionary leap in video production for international campaigns. The goal was to overcome traditional rendering constraints while maintaining cinematic quality and precise creative control.',
        'solution-t': 'THE SOLUTION',
        'solution-d': 'I developed a proprietary "AI-Augmented" pipeline, integrating Higgsfield (utilizing Nano, Banana Pro, and Veo models) for controlled video generation. Furthermore, I built Gemini Agents to automate scripting and concept development, reducing turnaround from days to hours.',
        'results-t': 'IMPACT & RESULTS',
        'res-1': 'Time-to-Market: -60%',
        'res-2': 'Hybrid Workflow',
        'res-3': 'Autonomous Agents',
        'res-4': 'AI Pioneer Status',
        'project-endurance': 'THE ENDURANCE PROJECT',
        'project-desc': 'Epic Corporate Storytelling: a tribute to team resilience inspired by the 1914 expedition. Employees become cinematic leads through AI Face Swap integration.',
        'step-1-t': 'AI World Building',
        'step-1-d': 'Defining the aesthetic through advanced prompting and generating consistent style-frames for scene setting.',
        'step-2-t': 'Hybrid Editing & Face Swap',
        'step-2-d': 'Traditional timeline editing combined with Neural Face Swap. I replaced generated faces with target characters, ensuring Character Consistency across every scene.',
        'step-3-t': 'Sonic Branding',
        'step-3-d': 'Immersive sound design and audio synchronization to provide emotional depth and realistic weight to AI-generated clips.',
        'project-uk': 'URBAN KONG',
        'project-uk-desc': 'Social Media Growth & Hybrid Content Strategy.',
        'uk-s1-t': 'AI Editorial Brain',
        'uk-s1-d': 'Trend analysis and topic cluster ideation via Gemini Agents for a data-driven, real-time editorial calendar.',
        'uk-s2-t': 'Reels & Motion',
        'uk-s2-d': 'Short-form video production: dynamic editing, sound design, and visual hooks to maximize user retention.',
        'uk-s3-t': 'Brand Aesthetics',
        'uk-s3-d': 'Meticulous feed curation and community management to translate visual identity into real engagement.',
        'ig-btn-label': 'VISIT @URBANKONG_',
        'project-eu': 'PANAFGEO / EU BRANDING',
        'project-eu-desc': 'Institutional Visual Identity for the EU Global Gateway program, strictly compliant with the official European Union and EuroGeoSurveys Guidelines.',
        'eu-pdf-title': 'PANAFGEO - Brand Guidelines',
        'eu-pdf-description': 'Complete brand book for the PanAfGeo project: EU guidelines, visual identity, editorial grids, and institutional applications for the pan-African geological training program.',
        'credits-title': 'CREDITS & TEAM',
        'collab-name': 'Gennaro Grieco',
        'collab-role': 'Graphic Designer | UI/UX',
        'download-pdf': 'DOWNLOAD BRAND BOOK (PDF)',
        'flip-hint': 'Flip',
        'explore-hint': 'Tap to explore'
    }
};

// --- COMPONENTI INTERNI ---
const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return <motion.h1 className="intro-text" variants={container} initial="hidden" animate="visible" style={{ textAlign: 'center', width: '100%', padding: '0 10px' }}>{letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}</motion.h1>;
};

const Reveal = ({ children }) => <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>{children}</motion.div>;

const SocialIconOnly = ({ type, link }) => {
    const renderIcon = () => {
        if (type === 'web') return <img loading="lazy" decoding="async" src={ICON_WEB} alt="Agency Website" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
        if (type === 'ig') return <img loading="lazy" decoding="async" src={ICON_IG} alt="Instagram Profile" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
        if (type === 'ln') return <img loading="lazy" decoding="async" src={ICON_LN} alt="LinkedIn Profile" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
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

const PromptSimulator = ({ t }) => {
    const [isGenerated, setIsGenerated] = useState(false);
    return (
        <div className="prompt-box-container" style={{ margin: '0 auto', maxWidth: '100%' }}>
            <div className="prompt-image-viewport">
                <motion.img src={PROMPT_IMG_RAW} alt="Source Reference" className="prompt-img" animate={{ opacity: isGenerated ? 0 : 1 }} transition={{ duration: 0.5 }} />
                <motion.img src={PROMPT_IMG_GEN} alt="AI Generated Result" className="prompt-img absolute-img" animate={{ opacity: isGenerated ? 1 : 0 }} transition={{ duration: 0.5 }} />
                {isGenerated && <motion.div className="scan-line" initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} />}
            </div>
            <div className="prompt-controls" style={{ flexDirection: 'column' }}>
                <div className="prompt-input" style={{ width: '100%', fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}><span className="prompt-cursor">_</span> {t['prompt-text']}</div>
                <button className={`prompt-btn ${isGenerated ? 'active' : ''}`} style={{ width: '100%', padding: '12px' }} onClick={() => setIsGenerated(!isGenerated)}>{isGenerated ? t['btn-done'] : t['btn-generate']}</button>
            </div>
        </div>
    );
};

// --- MOCKUP 3D PER PANAFGEO - OTTIMIZZATO PER MOBILE ---
const BrandGuidelines3D = ({ file, coverImg, t }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ perspective: '2000px', marginTop: isMobile ? '20px' : '40px', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
            <motion.div
                style={{ width: '100%', maxWidth: isMobile ? '400px' : '900px', aspectRatio: '16/11', position: 'relative', transformStyle: 'preserve-3d', cursor: 'pointer' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                onClick={() => setIsFlipped(!isFlipped)}
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                whileTap={isMobile ? { scale: 0.98 } : {}}
            >
                <motion.div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: isMobile ? '16px' : '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <img src={coverImg} alt="PanAfGeo Brand Guidelines Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'; }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '20px' : '35px', background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4) 60%, transparent)', color: 'white' }}>
                        <h3 style={{ margin: 0, fontSize: isMobile ? '1.1rem' : 'clamp(1.3rem, 2.2vw, 2rem)', fontWeight: 700, fontFamily: 'Unbounded, sans-serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{t['eu-pdf-title']}</h3>
                    </div>
                    <div style={{ position: 'absolute', top: isMobile ? '12px' : '20px', right: isMobile ? '12px' : '20px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: isMobile ? '6px 12px' : '10px 18px', borderRadius: '40px', color: 'white', fontSize: isMobile ? '0.75rem' : '0.9rem', fontWeight: 500, border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', letterSpacing: '0.3px' }}>
                        {t['flip-hint']} ↻
                    </div>
                </motion.div>

                <motion.div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)', borderRadius: isMobile ? '16px' : '20px', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: isMobile ? '12px' : '18px', padding: isMobile ? '20px' : '35px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ fontSize: isMobile ? '3rem' : '4.5rem', filter: 'drop-shadow(0 10px 20px rgba(255,107,66,0.4))' }}>📄</motion.div>
                    <h3 style={{ color: 'white', margin: 0, fontSize: isMobile ? '1.2rem' : '1.7rem', fontFamily: 'Unbounded, sans-serif', textAlign: 'center', fontWeight: 600, letterSpacing: '-0.02em' }}>{t['eu-pdf-title']}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', maxWidth: isMobile ? '280px' : '500px', margin: '5px 0', lineHeight: isMobile ? 1.5 : 1.7, fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 400 }}>{isMobile ? 'Brand book PanAfGeo: linee guida EU complete.' : t['eu-pdf-description']}</p>
                    <motion.a href={file} download style={{ padding: isMobile ? '12px 24px' : '16px 40px', background: '#ff6b42', color: 'white', textDecoration: 'none', borderRadius: '50px', fontWeight: 600, fontSize: isMobile ? '0.9rem' : '1.1rem', border: 'none', cursor: 'pointer', marginTop: isMobile ? '5px' : '10px', boxShadow: '0 10px 20px rgba(255,107,66,0.4)', display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.5px' }} whileHover={!isMobile ? { scale: 1.05, background: '#ff8259', boxShadow: '0 15px 30px rgba(255,107,66,0.5)' } : {}} whileTap={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()}>
                        <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>↓</span>{isMobile ? 'PDF' : t['download-pdf']}
                    </motion.a>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: isMobile ? '0.7rem' : '0.85rem', marginTop: '5px', fontWeight: 400 }}>{t['flip-hint']} per tornare</p>
                </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} style={{ marginTop: isMobile ? '15px' : '25px', color: 'white', fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 500, display: 'flex', gap: isMobile ? '8px' : '12px', alignItems: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', padding: isMobile ? '8px 16px' : '12px 24px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 20px rgba(0,0,0,0.2)', letterSpacing: '0.3px' }}>
                <span style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>👆</span><span>{t['explore-hint']}</span>
            </motion.div>
        </div>
    );
};

const WhiteRabbit = ({ lang, goBack }) => {
    const t = WR_LANG[lang];
    const { scrollY } = useScroll();
    const [activePost, setActivePost] = useState(null);

    const introOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const introBlur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(20px)"]);
    const introScale = useTransform(scrollY, [0, 400], [1, 0.9]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="app-container" style={{ overflowX: 'hidden' }}>
            <div className="gradient-bg" style={{ pointerEvents: 'none' }}>
                <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                    <WaterGradient />
                </ShaderGradientCanvas>
            </div>

            <header><button onClick={goBack} className="lang-btn" style={{ position: 'fixed', top: 'clamp(15px, 4vw, 30px)', left: 'clamp(15px, 4vw, 30px)', zIndex: 100 }}>{t['back']}</button></header>

            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, filter: introBlur, scale: introScale, padding: '0 20px' }}>
                <Typewriter text={t['title']} />
            </motion.div>

            <div className="content-scroll-layer">

                <section className="glass-section" style={{ padding: 'clamp(30px, 6vw, 60px)', width: '92%', maxWidth: '1000px', margin: '0 auto 80px' }}>
                    <Reveal>
                        <div className="wr-hero-grid" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <div className="wr-text-col" style={{ textAlign: 'center' }}>
                                <h2 className="bio-headline" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '10px' }}>{t['role-title']}</h2>
                                <p className="bio-highlight" style={{ marginBottom: '20px', fontWeight: 600, color: '#ff6b42', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>{t['role-sub']}</p>
                                <p className="bio-text" style={{ marginBottom: '40px', margin: '0 auto 40px auto', fontSize: 'clamp(0.95rem, 3vw, 1.1rem)' }}>{t['slogan']}</p>
                                <div className="social-row" style={{ position: 'relative', zIndex: 50, justifyContent: 'center' }}>
                                    <SocialIconOnly type="web" link={SOCIAL_LINKS.web} />
                                    <SocialIconOnly type="ig" link={SOCIAL_LINKS.ig} />
                                    <SocialIconOnly type="ln" link={SOCIAL_LINKS.ln} />
                                </div>
                            </div>
                            <div className="wr-demo-col" style={{ width: '100%' }}><PromptSimulator t={t} /></div>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section story-section" style={{ padding: 'clamp(30px, 6vw, 60px)', width: '92%', maxWidth: '1000px', margin: '0 auto 80px' }}>
                    <Reveal>
                        <div className="bento-grid">
                            <div className="bento-card challenge-card" style={{ padding: 'clamp(20px, 5vw, 40px)' }}>
                                <div className="card-content-wrap"><div className="card-icon">⚠️</div><h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>{t['challenge-t']}</h3><p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>{t['challenge-d']}</p></div>
                                <img loading="lazy" decoding="async" src={CASE_IMAGES.challenge_thumb} alt="The Challenge" className="floating-card-img" style={{ width: 'clamp(60px, 15vw, 100px)', height: 'clamp(60px, 15vw, 100px)' }} />
                            </div>
                            <div className="bento-card solution-card" style={{ padding: 'clamp(20px, 5vw, 40px)' }}>
                                <div className="card-content-wrap"><div className="card-icon">⚡️</div><h3 style={{ color: '#ff6b42', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>{t['solution-t']}</h3><p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>{t['solution-d']}</p></div>
                                <img loading="lazy" decoding="async" src={CASE_IMAGES.solution_thumb} alt="The AI Solution" className="floating-card-img" style={{ width: 'clamp(60px, 15vw, 100px)', height: 'clamp(60px, 15vw, 100px)' }} />
                            </div>
                            <div className="bento-card results-bar" style={{ padding: 'clamp(20px, 5vw, 40px)' }}><h3 className="bar-title" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>{t['results-t']}</h3><div className="results-grid"><div className="result-item"><span className="check-icon">✓</span> {t['res-1']}</div><div className="result-item"><span className="check-icon">✓</span> {t['res-2']}</div><div className="result-item"><span className="check-icon">✓</span> {t['res-3']}</div><div className="result-item"><span className="check-icon">✓</span> {t['res-4']}</div></div></div>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section" style={{ textAlign: 'center', padding: 'clamp(30px, 6vw, 60px)', width: '92%', maxWidth: '1000px', margin: '0 auto 80px' }}>
                    <Reveal>
                        <h2 className="section-label" style={{ textAlign: 'center', width: '100%', display: 'block' }}>{t['project-endurance']}</h2>
                        <p className="section-desc" style={{ textAlign: 'center', fontSize: 'clamp(0.95rem, 3vw, 1.1rem)' }}>{t['project-desc']}</p>
                        <div className="process-pipeline">
                            <div className="process-step" style={{ padding: 'clamp(15px, 4vw, 25px)' }}><div className="process-thumb-container"><img loading="lazy" decoding="async" src={CASE_IMAGES.process_step1} alt="AI Generation" className="process-thumb" /><span className="step-badge">01</span></div><h4 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>{t['step-1-t']}</h4><p style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{t['step-1-d']}</p></div>
                            <div className="process-arrow">↓</div>
                            <div className="process-step" style={{ padding: 'clamp(15px, 4vw, 25px)' }}><div className="process-thumb-container"><img loading="lazy" decoding="async" src={CASE_IMAGES.process_step2} alt="Hybrid Editing" className="process-thumb" /><span className="step-badge">02</span></div><h4 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>{t['step-2-t']}</h4><p style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{t['step-2-d']}</p></div>
                            <div className="process-arrow">↓</div>
                            <div className="process-step" style={{ padding: 'clamp(15px, 4vw, 25px)' }}><div className="process-thumb-container"><img loading="lazy" decoding="async" src={CASE_IMAGES.process_step3} alt="Sonic Branding" className="process-thumb" /><span className="step-badge">03</span></div><h4 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>{t['step-3-t']}</h4><p style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{t['step-3-d']}</p></div>
                        </div>
                        <div className="cinema-container" style={{ marginTop: '40px' }}>
                            <motion.video src={WR_VIDEO} controls poster={CASE_IMAGES.process_step1} style={{ width: '100%', borderRadius: '12px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)', border: '1px solid #333', backgroundColor: '#000' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} />
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section" style={{ textAlign: 'center', marginTop: '40px', padding: 'clamp(30px, 6vw, 60px)', width: '92%', maxWidth: '1000px', margin: '0 auto 80px' }}>
                    <Reveal>
                        <h2 className="section-label" style={{ textAlign: 'center', width: '100%', display: 'block' }}>{t['project-uk']}</h2>
                        <p className="section-desc" style={{ textAlign: 'center', fontSize: 'clamp(0.95rem, 3vw, 1.1rem)' }}>{t['project-uk-desc']}</p>
                        <div className="process-pipeline">
                            <div className="process-step" style={{ padding: 'clamp(15px, 4vw, 25px)' }}><div className="process-thumb-container"><img loading="lazy" decoding="async" src={CASE_IMAGES.uk_step1} alt="Editorial Planning" className="process-thumb" /><span className="step-badge">01</span></div><h4 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>{t['uk-s1-t']}</h4><p style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{t['uk-s1-d']}</p></div>
                            <div className="process-arrow">↓</div>
                            <div className="process-step" style={{ padding: 'clamp(15px, 4vw, 25px)' }}><div className="process-thumb-container"><img loading="lazy" decoding="async" src={CASE_IMAGES.uk_step2} alt="Content Creation" className="process-thumb" /><span className="step-badge">02</span></div><h4 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>{t['uk-s2-t']}</h4><p style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{t['uk-s2-d']}</p></div>
                            <div className="process-arrow">↓</div>
                            <div className="process-step" style={{ padding: 'clamp(15px, 4vw, 25px)' }}><div className="process-thumb-container"><img loading="lazy" decoding="async" src={CASE_IMAGES.uk_step3} alt="Community Growth" className="process-thumb" /><span className="step-badge">03</span></div><h4 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>{t['uk-s3-t']}</h4><p style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{t['uk-s3-d']}</p></div>
                        </div>
                        <div className="uk-grid-showcase" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '350px' }}>
                                <div className="ig-phone-mockup" style={{ width: '100%' }}>
                                    <div className="ig-header">
                                        <div className="ig-avatar" style={{ backgroundImage: `url(${CASE_IMAGES.uk_profile_pic})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        <div className="ig-username">urbankong_</div>
                                    </div>
                                    <div className="ig-grid">
                                        {IG_CONTENT.map((post) => (
                                            <motion.div key={post.id} className="ig-post" style={{ position: 'relative', width: '100%', paddingBottom: '100%' }} whileHover={{ filter: "brightness(0.8)" }} onClick={() => setActivePost(post)}>
                                                <img loading="lazy" decoding="async" src={post.thumb} alt={`Urban Kong Post ${post.id}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.backgroundColor = '#eee' }} />
                                                {post.type === 'video' && (<div style={{ position: 'absolute', top: 5, right: 5, color: 'white', textShadow: '0 0 5px rgba(0,0,0,0.5)' }}>▶</div>)}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <motion.a href="https://www.instagram.com/urbankong_?igsh=aW8yb2h6aWwycDVn" target="_blank" rel="noopener noreferrer" className="ig-visit-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{t['ig-btn-label']} ↗</motion.a>
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section" style={{ textAlign: 'center', marginTop: '40px', padding: 'clamp(30px, 6vw, 60px)', width: '92%', maxWidth: '1000px', margin: '0 auto 80px' }}>
                    <Reveal>
                        <h2 className="section-label" style={{ textAlign: 'center', width: '100%', display: 'block' }}>{t['project-eu']}</h2>
                        <p className="section-desc" style={{ textAlign: 'center', fontSize: 'clamp(0.95rem, 3vw, 1.1rem)' }}>{t['project-eu-desc']}</p>

                        <BrandGuidelines3D
                            file={EU_PDF_FILE}
                            coverImg={EU_COVER_IMG}
                            t={t}
                        />

                        <div className="credits-section" style={{ marginTop: 'clamp(40px, 8vw, 80px)' }}>
                            <h4 className="credits-title-small">{t['credits-title']}</h4>
                            <motion.div className="collaborator-card" whileHover={{ scale: 1.02 }} style={{ flexDirection: 'column', gap: '15px', textAlign: 'center', padding: 'clamp(15px, 4vw, 25px)' }}>
                                <img loading="lazy" decoding="async" src={CASE_IMAGES.collab_avatar} alt="Gennaro Grieco" className="collab-avatar" style={{ margin: '0 auto' }} />
                                <div className="collab-info" style={{ marginRight: 0 }}><span className="collab-name">{t['collab-name']}</span><span className="collab-role">{t['collab-role']}</span></div>
                                <div className="collab-links" style={{ justifyContent: 'center' }}><SocialIconOnly type="ig" link="https://www.instagram.com/_gennygrieco_?igsh=MTljcmR6bnprY2dkZg==" /><SocialIconOnly type="ln" link="https://www.linkedin.com/in/gennaro-grieco/" /></div>
                            </motion.div>
                        </div>
                    </Reveal>
                </section>

                <footer style={{ textAlign: 'center', padding: 'clamp(2rem, 6vw, 4rem) 2rem', opacity: 0.5 }}><p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>© 2026 Angelo Russo | Case Study: White Rabbit Agency Bruxelles.</p></footer>
            </div>

            <AnimatePresence>
                {activePost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.95)', zIndex: 1000,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer', padding: '20px'
                        }}
                        onClick={() => setActivePost(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            style={{
                                width: '100%', maxWidth: '90vw', maxHeight: '85vh',
                                borderRadius: '16px', overflow: 'hidden', backgroundColor: '#111',
                                position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActivePost(null)}
                                style={{
                                    position: 'absolute', top: 15, right: 15,
                                    background: 'rgba(255,255,255,0.2)', color: 'white',
                                    border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%', width: 40, height: 40,
                                    cursor: 'pointer', zIndex: 10, fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)'
                                }}
                            >
                                ✕
                            </button>

                            {activePost.type === 'video' ? (
                                <video preload="metadata"
                                    src={activePost.src}
                                    controls
                                    autoPlay
                                    style={{ width: '100%', height: '100%', maxHeight: '85vh', objectFit: 'contain' }}
                                />
                            ) : (
                                <img
                                    src={activePost.src}
                                    alt="Full Size Visual"
                                    style={{ width: '100%', height: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

export default WhiteRabbit;
