import React, { useEffect, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform } from 'framer-motion'; 

// --- DATI DEI PROGETTI FREELANCE ---
const FREELANCE_PROJECTS = [
    {
        id: 'stampatell',
        title: 'STAMPATELL',
        role: { it: 'Brand Identity & Content Creation', en: 'Brand Identity & Content Creation' },
        desc: {
            it: 'Progetto focalizzato sulla stampa 3D. Ho curato sviluppo della brand identity, strategia di content creation e coordinamento per eventi e fiere di settore.',
            en: '3D printing project where I handled brand identity development, social content strategy, and coordination for industry events and fairs.'
        },
        skills: ['Brand Design', 'Social Strategy', 'Event Planning'],
        mediaType: 'GIF',
        mediaSrc: 'stampatell.gif', 
        link: 'https://www.instagram.com/stampatell?igsh=dzVvdjBhYWNpNW0=/', 
        linkText: { it: 'Vedi su Instagram ↗', en: 'View on Instagram ↗' }
    },
    {
        id: 'ar-hub',
        title: 'AR HUB · META SPARK AR',
        role: { it: 'AR Creator & Co-Fondatore (2019)', en: 'AR Creator & Co-Founder (2019)' },
        desc: {
            it: 'Progetto di sperimentazione sulla Realtà Aumentata nato nel 2019 da studenti, avvicinandoci grazie a #CUOREDINAPOLI insieme a Gaetano Romano. Early adopter di Meta Spark AR, arrivando a realizzare anche un filtro Instagram per l’account ufficiale di Barbara d’Urso.',
            en: 'Augmented Reality collective started in 2019 as students through #CUOREDINAPOLI together with Gaetano Romano. Early adopters of Meta Spark AR, building interactive Instagram filters up to an official filter for Barbara d’Urso’s verified account.'
        },
        skills: ['AR Hub', 'Meta Spark AR', '3D Interaction'],
        mediaType: 'video',
        mediaSrc: '0110.mp4',
        altMediaSrc: 'Ar hub.png',
        link: 'https://youtu.be/YWD7XNna0Gk?si=yua8zYGp_mRCEWCB', 
        linkText: { it: 'Guarda il Case Study ↗', en: 'Watch Case Study ↗' }
    },
    {
        id: 'emanuele-jordan',
        title: 'EMANUELE JORDAN REEL',
        role: { it: 'AI Video Content Creator', en: 'AI Video Content Creator' },
        desc: {
            it: 'Produzione di un reel iper-realistico con workflow end-to-end basato su Intelligenza Artificiale: generazione visual fluidi, sintesi vocale del voiceover e sound design immersivo.',
            en: 'End-to-end AI-assisted reel production: fluid visual generation, synthetic voiceover integration, and immersive sound design built for high social engagement.'
        },
        skills: ['Generative AI Video', 'Sound Design', 'AI Workflow'],
        mediaType: 'GIF', 
        mediaSrc: 'jo reel.gif', 
        link: 'https://www.instagram.com/reel/DSDe7CkCOLv/?igsh=MTVhdmk0emNpd2V6Mw==', 
        linkText: { it: 'Guarda il Reel ↗', en: 'Watch Reel ↗' }
    },
];

const LANG = {
    it: {
        back: '← TORNA ALLA HOME',
        title: 'FREELANCE LAB',
        subtitle: 'Progetti Indipendenti, AR Hub & Sperimentazioni AI.',
        intro: 'Una selezione mirata di progetti indipendenti e sperimentazioni personali fuori dall’ambito aziendale e dai lavori accademici di gruppo: dalla Realtà Aumentata nata nel 2019 con AR Hub ai workflow AI video e brand 3D.',
    },
    en: {
        back: '← BACK TO HOME',
        title: 'FREELANCE LAB',
        subtitle: 'Independent Projects, AR Hub & AI Experiments.',
        intro: 'A focused selection of independent work and creative tech experiments outside company work and group academic installations: from 2019 Augmented Reality filters with AR Hub to AI video workflows and 3D branding.',
    }
};

// --- COMPONENTI UI ---

const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return <motion.h1 className="intro-text" style={{fontSize: 'clamp(2.5rem, 8vw, 4rem)'}} variants={container} initial="hidden" animate="visible">{letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}</motion.h1>;
};

const ProjectCard = ({ project, lang }) => {
    const [showAltMedia, setShowAltMedia] = useState(Boolean(project.altMediaSrc));
    const hasAlt = Boolean(project.altMediaSrc);

    return (
        <motion.div 
            className="freelance-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
        >
            <div className="card-media-wrapper">
                {hasAlt && showAltMedia ? (
                    <img loading="lazy" decoding="async" src={project.altMediaSrc} alt={`Banner ${project.title}`} className="card-media" />
                ) : project.mediaType === 'video' ? (
                    <video preload="metadata" poster={project.altMediaSrc || undefined} src={project.mediaSrc} autoPlay loop muted playsInline className="card-media" />
                ) : (
                    <img loading="lazy" decoding="async" src={project.mediaSrc} alt={`Progetto Freelance: ${project.title}`} className="card-media" />
                )}
                <div className="card-overlay">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-link-btn">
                        {project.linkText[lang]}
                    </a>
                </div>
            </div>

            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{project.title}</h3>
                    <span className="card-role">{project.role[lang]}</span>
                </div>
                <p className="card-desc">{project.desc[lang]}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: 'auto' }}>
                    <div className="card-tags">
                        {project.skills.map((skill, i) => (
                            <span key={i} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                    {hasAlt && (
                        <button
                            type="button"
                            onClick={() => setShowAltMedia((prev) => !prev)}
                            style={{
                                background: 'rgba(17,24,39,0.06)',
                                border: '1px solid rgba(17,24,39,0.14)',
                                borderRadius: '20px',
                                padding: '5px 12px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: '#1F2937',
                                cursor: 'pointer'
                            }}
                        >
                            {showAltMedia ? (lang === 'it' ? '▶ Demo Video' : '▶ Video Demo') : 'AR Hub Cover'}
                        </button>
                    )}
                </div>
                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1E3A5F', textDecoration: 'none' }}>
                        {project.linkText[lang]}
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Freelance = ({ lang, goBack }) => {
    const t = LANG[lang];
    const { scrollY } = useScroll();
    const introOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const introScale = useTransform(scrollY, [0, 300], [1, 0.9]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="app-container">
            
            <div className="gradient-bg">
                <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                    <WaterGradient />
                </ShaderGradientCanvas>
            </div>

            <header>
                <button onClick={goBack} className="lang-btn" style={{position:'fixed', left:'30px', zIndex:100}}>{t.back}</button>
            </header>

            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, scale: introScale, textAlign:'center', alignItems:'center' }}>
                <Typewriter text={t.title} />
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.5 }} 
                    style={{ marginTop: '1rem', fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6', padding: '0 20px' }}
                >
                    {t.subtitle}
                </motion.p>
            </motion.div>

            <div className="content-scroll-layer">
                
                <section className="glass-section" style={{ minHeight: 'auto', marginBottom: '4rem' }}>
                    <div className="bio-content-wrapper" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <h2 className="section-label" style={{ width:'100%', marginBottom:'20px' }}>INTRO</h2>
                        <p className="bio-text" style={{ maxWidth: '100%' }}>{t.intro}</p>
                    </div>
                </section>

                <section className="projects-grid-section">
                    {FREELANCE_PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} lang={lang || 'it'} />
                    ))}
                </section>

                <footer style={{textAlign: 'center', padding: 'clamp(3rem, 8vw, 6rem) 2rem', opacity: 0.5}}>
                    <p>© 2026 Angelo Russo | Creative Tech Freelance Projects.</p>
                </footer>
            </div>
        </div>
    );
};

function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

export default Freelance;
