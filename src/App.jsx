import React, { useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform } from 'framer-motion'; 

// Import delle Pagine Progetti Interne
import WhiteRabbit from './WhiteRabbit';
import NeroEspresso from './NeroEspresso';
import Freelance from './Freelance';

// --- ASSET STATICI ---
const PROFILE_IMG = "Portrait-Angelo-Russo.webp"; 
const WR_ICON = "Icona_whiterabbit.webp"; 
const CUORE_ICON = "Icona_cuoredinapoli.webp";
const NTA_ICON = "Icona_NTA.webp"; 
const GCERTI_ICON = "Icona_gcerti.webp"; // Nuova icona per GCERTI Italy

// ICONE SOCIAL
const ICON_IG = "Icona_instagram.webp";
const ICON_LN = "Icona_linkedin.webp";

const LANG_DATA = {
    it: {
        'welcome': 'BENVENUTI',
        'scroll-hint': 'Scorri per entrare',
        
        'bio-title': 'Angelo Russo.',
        'bio-sub': 'New Media Artist.',
        
        // BIO STRUTTURATA
        'bio-intro': [
            `Il mio approccio al design è agnostico rispetto agli strumenti: non parto dalla tecnologia, ma dall'idea. Come New Media Artist, considero i software non come vincoli, ma come mezzi flessibili da orchestrare per trovare la soluzione più efficace. La mia missione è trasformare la complessità tecnologica in narrazioni visive potenti, garantendo che la tecnica sia sempre al servizio del concept.`,
            `Dall'esperienza internazionale a Bruxelles presso White Rabbit, dove ho ingegnerizzato workflow creativi integrando modelli avanzati come Higgsfield e Agenti Gemini, fino alle radici nell'arte relazionale con #CUOREDINAPOLI, ho imparato a muovermi fluidamente tra mondi diversi. Passo dal rigore del graphic design tradizionale alla sperimentazione generativa, unendo sensibilità artistica e precisione operativa.`
        ],
        'bio-skills-title': 'Cosa porto nei progetti:',
        'bio-skills-list': [
            { title: 'Versatilità Strategica:', desc: 'Capacità di selezionare il medium perfetto per ogni progetto, spaziando dal print design al video editing, fino alle installazioni interattive.' },
            { title: 'AI Pipeline Architecture:', desc: 'Ottimizzazione dei processi creativi tramite l\'uso mirato di Generative AI per ridurre i tempi di produzione senza sacrificare la qualità autoriale.' },
            { title: 'Creative Problem Solving:', desc: 'Un mindset che supera i limiti tecnici dei singoli software, esplorando soluzioni ibride per esaltare l\'idea originale.' }
        ],
        'bio-philosophy': 'Credo in un design che non sia solo guardato, ma vissuto. Un approccio dove la tecnologia non sostituisce l\'umano, ma ne amplifica le possibilità.',

        'btn-cv': 'SCARICA CV (PDF)',
        'btn-read-more': 'LEGGI DI PIÙ',
        'btn-read-less': 'MOSTRA MENO',
        'works-title': 'Selected Works',
        'contact-title': 'CONTACT ME',
        'form-name': 'Nome', 'form-name-ph': 'Il tuo nome',
        'form-email': 'Email', 'form-email-ph': 'tua@email.com',
        'form-msg': 'Messaggio', 'form-msg-ph': 'Come posso aiutarti?',
        'form-btn': 'INVIA MESSAGGIO'
    },
    en: {
        'welcome': 'WELCOME', 
        'scroll-hint': 'Scroll to enter',
        
        'bio-title': 'Angelo Russo.',
        'bio-sub': 'New Media Artist.',
        
        'bio-intro': [
            `My approach to design is tool-agnostic: I don't start with technology, but with the idea. As a New Media Artist, I see software not as constraints, but as flexible means to orchestrate the most effective solution. My mission is to transform technological complexity into powerful visual narratives, ensuring that technique always serves the concept.`,
            `From international experience in Brussels at White Rabbit, engineering creative workflows integrating advanced models like Higgsfield and Gemini Agents, to my roots in relational art with #CUOREDINAPOLI, I have learned to move fluidly between worlds. I transition from the rigor of traditional graphic design to generative experimentation, blending artistic sensitivity with operational precision.`
        ],
        'bio-skills-title': 'What I bring to projects:',
        'bio-skills-list': [
            { title: 'Strategic Versatility:', desc: 'Ability to select the perfect medium for each project, ranging from print design to video editing and interactive installations.' },
            { title: 'AI Pipeline Architecture:', desc: 'Optimizing creative processes through targeted Generative AI use to reduce production times without sacrificing authorial quality.' },
            { title: 'Creative Problem Solving:', desc: 'A mindset that transcends technical software limits, exploring hybrid solutions to enhance the original idea.' }
        ],
        'bio-philosophy': 'I believe in design that is not just seen, but lived. An approach where technology amplifies human potential rather than replacing it.',

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
            case 'gcerti': return <motion.img src={GCERTI_ICON} alt="GCERTI Italy" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'whiterabbit': return <motion.img src={WR_ICON} alt="White Rabbit" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'nero': return <motion.svg viewBox="0 0 100 100" className="folder-pop-icon" variants={iconVariants}><path d="M30 40 L 30 70 Q 30 85 50 85 Q 70 85 70 70 L 70 40 Z" fill="#4b3621" /><path d="M70 50 Q 85 50 85 60 Q 85 70 70 70" fill="none" stroke="#4b3621" strokeWidth="3" /></motion.svg>;
            case 'cuore': return <motion.img src={CUORE_ICON} alt="#CuorediNapoli" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'noiumani': return <motion.img src={NTA_ICON} alt="Noi Umani" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
            case 'procida': return <motion.img src={NTA_ICON} alt="Non io ma noi" className="folder-pop-icon" variants={iconVariants} style={{ objectFit: 'contain' }} />;
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
        <motion.a href={link} target="_blank" style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(0,0,0,0.1)', margin: '0 10px' }} whileHover={{ scale: 1.1, backgroundColor: '#fff' }} whileTap={{ scale: 0.95 }}>
            <img src={icon} alt="Social" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
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

    if (view === 'whiterabbit') return <WhiteRabbit lang={lang} goBack={() => setView('home')} />;
    if (view === 'nero') return <NeroEspresso lang={lang} goBack={() => setView('home')} />;
    if (view === 'freelance') return <Freelance lang={lang} goBack={() => setView('home')} />;

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
                <header><button onClick={toggleLang} className="lang-btn">{lang === 'it' ? 'EN' : 'IT'}</button></header>

                {/* BIO SECTION CON LEGGI DI PIÙ */}
                <section className="glass-section bio-section">
                    <Reveal>
                        <div className="bio-content-wrapper">
                            <div className="bio-image-col">
                                <img src={PROFILE_IMG} alt="Angelo Russo" className="profile-photo" />
                            </div>

                            <div className="bio-text-col">
                                <h1 className="bio-headline">
                                    {LANG_DATA[lang]['bio-title']} <br />
                                    <span className="bio-highlight">{LANG_DATA[lang]['bio-sub']}</span>
                                </h1>
                                
                                {/* Primo paragrafo (sempre visibile) */}
                                <p className="bio-text" style={{ marginBottom: '20px' }}>
                                    {LANG_DATA[lang]['bio-intro'][0]}
                                </p>

                                {/* Contenuto espandibile */}
                                <motion.div
                                    initial={false}
                                    animate={{ height: showFullBio ? 'auto' : 0, opacity: showFullBio ? 1 : 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    {/* Secondo paragrafo */}
                                    <p className="bio-text" style={{ marginBottom: '20px' }}>
                                        {LANG_DATA[lang]['bio-intro'][1]}
                                    </p>

                                    {/* Skills List */}
                                    <div style={{ marginBottom: '30px', marginTop: '10px' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '15px', color: '#111' }}>
                                            {LANG_DATA[lang]['bio-skills-title']}
                                        </h4>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {LANG_DATA[lang]['bio-skills-list'].map((skill, index) => (
                                                <li key={index} style={{ marginBottom: '12px', fontSize: '1rem', color: '#444', lineHeight: '1.5' }}>
                                                    <span style={{ fontWeight: 700, color: '#2563eb' }}>• {skill.title}</span> {skill.desc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Philosophy */}
                                    <p className="bio-text" style={{ fontStyle: 'italic', color: '#555', borderLeft: '3px solid #ccc', paddingLeft: '15px' }}>
                                        {LANG_DATA[lang]['bio-philosophy']}
                                    </p>
                                </motion.div>

                                {/* Pulsanti */}
                                <div style={{ display: 'flex', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
                                    <motion.button
                                        onClick={() => setShowFullBio(!showFullBio)}
                                        className="read-more-btn"
                                        whileHover={{ scale: 1.05, backgroundColor: "#2563eb", color: "#fff" }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: '12px 24px',
                                            backgroundColor: showFullBio ? '#2563eb' : 'transparent',
                                            color: showFullBio ? '#fff' : '#2563eb',
                                            border: '2px solid #2563eb',
                                            borderRadius: '30px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {showFullBio ? LANG_DATA[lang]['btn-read-less'] : LANG_DATA[lang]['btn-read-more']}
                                    </motion.button>

                                    <motion.a
                                        href="/Curriculum_Angelo_Russo.pdf"
                                        download="Curriculum_Angelo_Russo"
                                        className="cv-download-btn"
                                        whileHover={{ scale: 1.05, backgroundColor: "#111", color: "#fff" }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: '12px 24px',
                                            backgroundColor: '#111',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '30px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'10px'}}>
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
                        <div className="section-label">01 / {LANG_DATA[lang]['works-title']}</div>
                        <div className="folders-grid">
                            {/* GCERTI Italy aggiunto davanti a White Rabbit */}
                            <FolderItem title="GCERTI Italy" type="gcerti" onClick={() => window.open('https://www.gcerti.it/', '_blank')} />
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
                        <div className="section-label" style={{textAlign:'center', width:'100%'}}>02 / {LANG_DATA[lang]['contact-title']}</div>
                        <form action="https://formspree.io/f/mrbnlyyl" method="POST" className="contact-form">
                            <div className="form-group"><label>{LANG_DATA[lang]['form-name']}</label><input type="text" name="name" placeholder={LANG_DATA[lang]['form-name-ph']} required className="form-input" /></div>
                            <div className="form-group"><label>{LANG_DATA[lang]['form-email']}</label><input type="email" name="email" placeholder={LANG_DATA[lang]['form-email-ph']} required className="form-input" /></div>
                            <div className="form-group"><label>{LANG_DATA[lang]['form-msg']}</label><textarea name="message" rows="5" placeholder={LANG_DATA[lang]['form-msg-ph']} required className="form-input"></textarea></div>
                            <motion.button type="submit" className="form-submit-btn" whileHover={{ scale: 1.02, backgroundColor: "#111", color: "#fff" }} whileTap={{ scale: 0.95 }}>{LANG_DATA[lang]['form-btn']}</motion.button>
                        </form>
                    </Reveal>
                </section>

                <footer style={{textAlign: 'center', padding: '6rem 2rem', opacity: 0.8}}>
                    <div style={{marginBottom: '20px'}}>
                        <FooterSocialBtn icon={ICON_LN} link="https://www.linkedin.com/in/angelo-russo-0964a8183?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" />
                        <FooterSocialBtn icon={ICON_IG} link="https://www.instagram.com/yellowjzard?igsh=MTNmMDNwZ24zYXY0eg%3D%3D&utm_source=qr" />
                    </div>
                    <p style={{opacity: 0.6}}>© 2025 Angelo Russo. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

export default App;
