import React, { useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform } from 'framer-motion'; 

// --- ASSET E LINK ---
const STAMPATELL_IMG = "stampatell.png"; 

// --- DATI DEI PROGETTI FREELANCE ---
const FREELANCE_PROJECTS = [
    {
        id: 'stampatell',
        title: 'STAMPATELL',
        role: 'Brand Identity & Content Creation',
        desc: 'Progetto focalizzato sulla stampa 3D. Ho curato l\'intero sviluppo della brand identity e la strategia di content creation, coordinando collaborazioni strategiche per eventi e fiere di settore.',
        skills: ['Brand Design', 'Social Strategy', 'Event Planning'],
        mediaType: 'GIF',
        mediaSrc: 'stampatell.gif', 
        link: 'https://www.instagram.com/stampatell?igsh=dzVvdjBhYWNpNW0=/', 
        linkText: 'Vedi su Instagram ↗'
    },
    {
        id: 'spark-ar-tv',
        title: 'SOCIAL AR & VIRAL MKTG',
        role: 'AR Developer & Co-Creator',
        desc: 'Early Adopter della tecnologia Meta Spark AR dal 2019. Progettazione di filtri interattivi per il personal branding di figure pubbliche televisive, utilizzando la gamification per generare viralità organica su Instagram. Progetto realizzato in collaborazione con Gaetano Romano.',
        skills: ['Meta Spark AR', '3D Interaction', 'Viral Strategy'],
        mediaType: 'video',
        mediaSrc: "0110.mp4", 
        link: 'https://youtu.be/YWD7XNna0Gk?si=yua8zYGp_mRCEWCB', 
        linkText: 'Guarda il Case Study ↗'
    },
    {
        id: 'emanuele-jordan',
        title: 'EMANUELE JORDAN REEL',
        role: 'AI Video Content Creator',
        desc: 'Produzione di un reel iper-realistico attraverso un workflow integrale basato su Intelligenza Artificiale. Dalla generazione dei visual fluidi alla sintesi vocale del voiceover, fino al sound design immersivo progettato per massimizzare engagement e credibilità.',
        skills: ['Generative AI Video', 'Immersive Sound Design', 'Hyper-realism'],
        mediaType: 'GIF', 
        mediaSrc: 'jo reel.gif', 
        link: 'https://www.instagram.com/reel/DSDe7CkCOLv/?igsh=MTVhdmk0emNpd2V6Mw==', 
        linkText: 'Guarda il Reel ↗'
    },
];

const LANG = {
    it: {
        back: '← TORNA ALLA HOME',
        title: 'FREELANCE LAB',
        subtitle: 'Progetti, Collaborazioni & Sperimentazioni Digitali.',
        intro: 'Uno spazio dedicato ai miei progetti indipendenti e alle collaborazioni esterne, dove sperimento nuove tecnologie e affino skill trasversali tra design e innovazione.',
    },
    en: {
        back: '← BACK TO HOME',
        title: 'FREELANCE LAB',
        subtitle: 'Projects, Collaborations & Digital Experiments.',
        intro: 'A creative space dedicated to independent projects and external collaborations, where I test emerging technologies and refine skills across design and innovation.',
    }
};

// --- COMPONENTI UI ---

const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return <motion.h1 className="intro-text" style={{fontSize: 'clamp(2.5rem, 8vw, 4rem)'}} variants={container} initial="hidden" animate="visible">{letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}</motion.h1>;
};

const ProjectCard = ({ project }) => {
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
                {project.mediaType === 'video' ? (
                    <video preload="metadata" src={project.mediaSrc} autoPlay loop muted playsInline className="card-media" />
                ) : (
                    <img loading="lazy" decoding="async" src={project.mediaSrc} alt={`Progetto Freelance: ${project.title}`} className="card-media" />
                )}
                <div className="card-overlay">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-link-btn">
                        {project.linkText}
                    </a>
                </div>
            </div>

            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{project.title}</h3>
                    <span className="card-role">{project.role}</span>
                </div>
                <p className="card-desc">{project.desc}</p>
                <div className="card-tags">
                    {project.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                    ))}
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

            <div className="content-scroll-layer" style={{ paddingTop: '100vh' }}>
                
                <section className="glass-section" style={{ minHeight: 'auto', marginBottom: '4rem' }}>
                    <div className="bio-content-wrapper" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <h2 className="section-label" style={{ width:'100%', marginBottom:'20px' }}>INTRO</h2>
                        <p className="bio-text" style={{ maxWidth: '100%' }}>{t.intro}</p>
                    </div>
                </section>

                <section className="projects-grid-section">
                    {FREELANCE_PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
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
