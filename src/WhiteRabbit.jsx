import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'; 

// --- CONFIGURAZIONE LINK (MODIFICA QUI I TUOI SOCIAL) ---
const SOCIAL_LINKS = {
    web: "https://www.brusselswhiterabbit.eu/?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
    ig: "https://www.instagram.com/white_rabbit_brussels?igsh=MmduaWZvamlqM3U=",
    ln: "https://www.linkedin.com/company/whiterabbithole/"
};

// --- ASSET ---
const PROMPT_IMG_RAW = "Reference_Edgar_raw.webp";
const PROMPT_IMG_GEN = "Reference_Edgar_Gen.webp";
const WR_VIDEO = "WR-RP-Endurance.mp4"; 
const EU_PDF_FILE = "PanAfGeo_Branding.pdf"; // <--- FILE PDF

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
        'slogan': 'Ingegnerizzare la creatività: flussi video neurali e Agenti AI.', 
        'prompt-text': '/imagine prompt: editorial photography, futuristic fashion, cinematic lighting --v 6.0',
        'btn-generate': 'GENERA', 'btn-done': 'COMPLETATO',
        'challenge-t': 'LA SFIDA', 'challenge-d': 'L’agenzia necessitava di un salto evolutivo nella produzione video per campagne internazionali. La sfida era superare i limiti di tempo e budget del rendering tradizionale, mantenendo una qualità cinematografica e un controllo autoriale preciso.', 
        'solution-t': 'LA SOLUZIONE', 'solution-d': 'Ho progettato una pipeline "AI-Augmented" proprietaria. Ho integrato Higgsfield (sfruttando modelli come Nano, Banana Pro e Veo) per la generazione video controllata, e sviluppato Agenti Gemini per automatizzare la fase di scripting e concept. Da giorni di lavoro a ore di generazione.', 
        'results-t': 'IMPATTO & RISULTATI', 'res-1': 'Time-to-Market: -60%', 'res-2': 'Workflow Ibrido', 'res-3': 'Agenti Autonomi', 'res-4': 'AI Pioneer Status', 
        'project-endurance': 'THE ENDURANCE PROJECT', 'project-desc': 'Corporate Storytelling Epico: un tributo alla resilienza del team ispirato alla storica spedizione del 1914. I dipendenti diventano i protagonisti cinematografici dell\'impresa grazie all\'integrazione di AI Face Swap.', 
        'step-1-t': 'AI World Building', 'step-1-d': 'Definizione dell’estetica tramite prompting avanzato e generazione di style-frames coerenti per il setting delle scene.', 
        'step-2-t': 'Hybrid Editing & Face Swap', 'step-2-d': 'Montaggio tradizionale su timeline integrato con tecniche di Neural Face Swap. Ho sostituito i volti dei soggetti generati con i character target approvati dal cliente, garantendo la continuità dell\'identità (Character Consistency) in ogni scena.', 
        'step-3-t': 'Sonic Branding', 'step-3-d': 'Sound design immersivo e sincronizzazione audio per dare profondità emotiva e peso realistico alle clip generate.', 
        'project-uk': 'URBAN KONG', 'project-uk-desc': 'Social Media Growth & Hybrid Content Strategy.',
        'uk-s1-t': 'AI Editorial Brain', 'uk-s1-d': 'Analisi trend e ideazione topic cluster tramite Agenti Gemini per un piano editoriale data-driven sempre aggiornato.',
        'uk-s2-t': 'Reels & Motion', 'uk-s2-d': 'Produzione video short-form. Editing dinamico, sound design e hook visivi per massimizzare la retention dell\'utente.',
        'uk-s3-t': 'Brand Aesthetics', 'uk-s3-d': 'Cura maniacale del feed e gestione della community per trasformare l\'identità visiva in engagement reale.',
        'ig-btn-label': 'VISITA @URBANKONG_',
        'project-eu': 'PANAFGEO / EU BRANDING', 'project-eu-desc': 'Visual Identity istituzionale conforme alle EU Guidelines.', 'eu-s1-t': 'EU Guidelines', 'eu-s1-d': 'Analisi dei gateway normativi e visivi dell\'Unione Europea.', 'eu-s2-t': 'Editorial Design', 'eu-s2-d': 'Impaginazione brochure rispettando griglie istituzionali.', 'eu-s3-t': 'Brand Application', 'eu-s3-d': 'Declinazione su supporti fisici (Rollup, Stand, Gadget).',
        'credits-title': 'CREDITS & TEAM', 'collab-name': 'Gennaro Grieco', 'collab-role': 'Graphic Designer | UI/UX '
    },
    en: {
        'back': '← BACK', 'title': 'WHITE RABBIT AGENCY', 'role-title': 'Generative AI Strategy & Visual Production', 'role-sub': 'Creative Designer & AI Specialist @ White Rabbit Agency', 'slogan': 'Engineering creativity: neural video flows and AI Agents.', 'prompt-text': '/imagine prompt: editorial photography, futuristic fashion, cinematic lighting --v 6.0', 'btn-generate': 'GENERATE', 'btn-done': 'DONE',
        'challenge-t': 'THE CHALLENGE', 'challenge-d': 'The agency needed an evolutionary leap in video production for international campaigns. The challenge was to overcome the time and budget limits of traditional rendering while maintaining cinematic quality and precise authorial control.',
        'solution-t': 'THE SOLUTION', 'solution-d': 'I designed a proprietary "AI-Augmented" pipeline. I integrated Higgsfield (leveraging models like Nano, Banana Pro, and Veo) for controlled video generation, and developed Gemini Agents to automate scripting and concept phases. From days of work to hours of generation.',
        'results-t': 'IMPACT & RESULTS', 'res-1': 'Time-to-Market: -60%', 'res-2': 'Hybrid Workflow', 'res-3': 'Autonomous Agents', 'res-4': 'AI Pioneer Status',
        'project-endurance': 'THE ENDURANCE PROJECT', 'project-desc': 'Orchestration of different generative video models to ensure temporal and visual coherence.',
        'step-1-t': 'AI World Building', 'step-1-d': 'Defining aesthetics through advanced prompting and generating coherent style-frames for scene setting.',
        'step-2-t': 'Hybrid Editing & Face Swap', 'step-2-d': 'Traditional timeline editing integrated with Neural Face Swap techniques. I replaced the faces of generated subjects with client-approved target characters, ensuring identity continuity (Character Consistency) in every scene.',
        'step-3-t': 'Sonic Branding', 'step-3-d': 'Immersive sound design and audio synchronization to give emotional depth and realistic weight to the generated clips.',
        'project-uk': 'URBAN KONG', 'project-uk-desc': 'Social Media Growth & Hybrid Content Strategy.', 'uk-s1-t': 'AI Editorial Brain', 'uk-s1-d': 'Trend analysis and topic cluster ideation via Gemini Agents for an always-on, data-driven editorial calendar.', 'uk-s2-t': 'Reels & Motion', 'uk-s2-d': 'Short-form video production. Dynamic editing, sound design, and visual hooks to maximize user retention.', 'uk-s3-t': 'Brand Aesthetics', 'uk-s3-d': 'Meticulous feed curation and community management to turn visual identity into real engagement.', 'ig-btn-label': 'VISIT @URBANKONG_',
        'project-eu': 'PANAFGEO / EU BRANDING', 'project-eu-desc': 'Institutional Visual Identity compliant with EU Guidelines.', 'eu-s1-t': 'EU Guidelines', 'eu-s1-d': 'Analysis of European Union visual and regulatory gateways.', 'eu-s2-t': 'Editorial Design', 'eu-s2-d': 'Brochure layout respecting institutional grids.', 'eu-s3-t': 'Brand Application', 'eu-s3-d': 'Adaptation on physical supports (Rollups, Stands).',
        'credits-title': 'CREDITS & TEAM', 'collab-name': 'Gennaro Grieco', 'collab-role': 'Co-Designer / Collaborator'
    }
};

// --- COMPONENTI INTERNI ---
const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return <motion.h1 className="intro-text" variants={container} initial="hidden" animate="visible">{letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}</motion.h1>;
};
const Reveal = ({ children }) => <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>{children}</motion.div>;

const SocialIconOnly = ({ type, link }) => { 
    const renderIcon = () => { 
        if(type === 'web') return <img src={ICON_WEB} alt="Web" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ig') return <img src={ICON_IG} alt="Instagram" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ln') return <img src={ICON_LN} alt="LinkedIn" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
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
    const imgRaw = PROMPT_IMG_RAW; 
    const imgFinal = PROMPT_IMG_GEN; 
    return (
        <div className="prompt-box-container">
            <div className="prompt-image-viewport">
                <motion.img src={imgRaw} className="prompt-img" animate={{ opacity: isGenerated ? 0 : 1 }} transition={{ duration: 0.5 }} />
                <motion.img src={imgFinal} className="prompt-img absolute-img" animate={{ opacity: isGenerated ? 1 : 0 }} transition={{ duration: 0.5 }} />
                {isGenerated && <motion.div className="scan-line" initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} />}
            </div>
            <div className="prompt-controls">
                <div className="prompt-input"><span className="prompt-cursor">_</span> {t['prompt-text']}</div>
                <button className={`prompt-btn ${isGenerated ? 'active' : ''}`} onClick={() => setIsGenerated(!isGenerated)}>{isGenerated ? t['btn-done'] : t['btn-generate']}</button>
            </div>
        </div>
    );
};

// --- NUOVO COMPONENTE PER IL PDF (SENZA BOTTONE DOWNLOAD) ---
const PdfViewer = ({ file }) => {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <div style={{
                width: '100%',
                height: '600px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                backgroundColor: '#f5f5f7'
            }}>
                <iframe 
                    src={`${file}#toolbar=0&navpanes=0&scrollbar=0`} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 'none' }}
                    title="PDF Viewer"
                />
            </div>
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
        <div className="app-container">
            {/* GRADIENTE WATER (Originale) */}
            <div className="gradient-bg" style={{pointerEvents: 'none'}}> 
                <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                    <WaterGradient />
                </ShaderGradientCanvas>
            </div>
            
            <header><button onClick={goBack} className="lang-btn" style={{position:'fixed', left:'30px', zIndex:100}}>{t['back']}</button></header>
            
            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, filter: introBlur, scale: introScale }}>
                <Typewriter text={t['title']} />
            </motion.div>
            
            <div className="content-scroll-layer">
                
                {/* HERO */}
                <section className="glass-section">
                    <Reveal>
                        <div className="wr-hero-grid">
                            <div className="wr-text-col">
                                <h2 className="bio-headline" style={{fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', marginBottom:'10px'}}>{t['role-title']}</h2>
                                <p className="bio-highlight" style={{marginBottom:'20px', fontWeight:600, color: '#ff6b42'}}>{t['role-sub']}</p>
                                <p className="bio-text" style={{marginBottom:'40px'}}>{t['slogan']}</p>
                                <div className="social-row" style={{position:'relative', zIndex:50}}>
                                    <SocialIconOnly type="web" link={SOCIAL_LINKS.web} />
                                    <SocialIconOnly type="ig" link={SOCIAL_LINKS.ig} />
                                    <SocialIconOnly type="ln" link={SOCIAL_LINKS.ln} />
                                </div>
                            </div>
                            <div className="wr-demo-col"><PromptSimulator t={t} /></div>
                        </div>
                    </Reveal>
                </section>

                {/* STORY */}
                <section className="glass-section story-section">
                    <Reveal>
                        <div className="bento-grid">
                            <div className="bento-card challenge-card">
                                <div className="card-content-wrap"><div className="card-icon">⚠️</div><h3>{t['challenge-t']}</h3><p>{t['challenge-d']}</p></div>
                                <img src={CASE_IMAGES.challenge_thumb} alt="Challenge Logo" className="floating-card-img" />
                            </div>
                            <div className="bento-card solution-card">
                                <div className="card-content-wrap"><div className="card-icon">⚡️</div><h3 style={{color: '#ff6b42'}}>{t['solution-t']}</h3><p>{t['solution-d']}</p></div>
                                <img src={CASE_IMAGES.solution_thumb} alt="Solution" className="floating-card-img" />
                            </div>
                            <div className="bento-card results-bar"><h3 className="bar-title">{t['results-t']}</h3><div className="results-grid"><div className="result-item"><span className="check-icon">✓</span> {t['res-1']}</div><div className="result-item"><span className="check-icon">✓</span> {t['res-2']}</div><div className="result-item"><span className="check-icon">✓</span> {t['res-3']}</div><div className="result-item"><span className="check-icon">✓</span> {t['res-4']}</div></div></div>
                        </div>
                    </Reveal>
                </section>

                {/* 1. ENDURANCE */}
                <section className="glass-section" style={{textAlign:'center'}}>
                    <Reveal>
                        <div className="section-label" style={{textAlign:'center', width:'100%'}}>{t['project-endurance']}</div>
                        <p className="section-desc" style={{textAlign:'center'}}>{t['project-desc']}</p>
                        <div className="process-pipeline">
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.process_step1} alt="Gen. Ai" className="process-thumb" /><span className="step-badge">01</span></div><h4>{t['step-1-t']}</h4><p>{t['step-1-d']}</p></div>
                            <div className="process-arrow">→</div>
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.process_step2} alt="Editing" className="process-thumb" /><span className="step-badge">02</span></div><h4>{t['step-2-t']}</h4><p>{t['step-2-d']}</p></div>
                            <div className="process-arrow">→</div>
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.process_step3} alt="Sound" className="process-thumb" /><span className="step-badge">03</span></div><h4>{t['step-3-t']}</h4><p>{t['step-3-d']}</p></div>
                        </div>
                        <div className="cinema-container">
                            <motion.video src={WR_VIDEO} controls poster={CASE_IMAGES.process_step1} style={{width:'100%', borderRadius:'12px', boxShadow:'0 30px 60px rgba(0,0,0,0.3)', border:'1px solid #333', backgroundColor:'#000'}} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} />
                        </div>
                    </Reveal>
                </section>

                {/* 2. URBAN KONG */}
                <section className="glass-section" style={{textAlign:'center', marginTop:'40px'}}>
                    <Reveal>
                        <div className="section-label" style={{textAlign:'center', width:'100%'}}>{t['project-uk']}</div>
                        <p className="section-desc" style={{textAlign:'center'}}>{t['project-uk-desc']}</p>
                        <div className="process-pipeline">
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.uk_step1} alt="Plan" className="process-thumb" /><span className="step-badge">01</span></div><h4>{t['uk-s1-t']}</h4><p>{t['uk-s1-d']}</p></div>
                            <div className="process-arrow">→</div>
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.uk_step2} alt="Create" className="process-thumb" /><span className="step-badge">02</span></div><h4>{t['uk-s2-t']}</h4><p>{t['uk-s2-d']}</p></div>
                            <div className="process-arrow">→</div>
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.uk_step3} alt="Manage" className="process-thumb" /><span className="step-badge">03</span></div><h4>{t['uk-s3-t']}</h4><p>{t['uk-s3-d']}</p></div>
                        </div>
                        <div className="uk-grid-showcase">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <div className="ig-phone-mockup">
                                    <div className="ig-header">
                                        <div className="ig-avatar" style={{backgroundImage: `url(${CASE_IMAGES.uk_profile_pic})`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
                                        <div className="ig-username">urbankong_</div>
                                    </div>
                                    <div className="ig-grid">
                                        {IG_CONTENT.map((post) => (
                                            <motion.div key={post.id} className="ig-post" style={{position: 'relative'}} whileHover={{ filter: "brightness(0.8)" }} onClick={() => setActivePost(post)}>
                                                <img src={post.thumb} alt="Post" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => {e.target.style.display='none'; e.target.parentElement.style.backgroundColor='#eee'}} />
                                                {post.type === 'video' && (<div style={{position:'absolute', top:5, right:5, color:'white', textShadow:'0 0 5px rgba(0,0,0,0.5)'}}>▶</div>)}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <motion.a href="https://www.instagram.com/urbankong_?igsh=aW8yb2h6aWwycDVn" target="_blank" className="ig-visit-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{t['ig-btn-label']} ↗</motion.a>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* 3. EU PROJECT CON PDF VIEWER */}
                <section className="glass-section" style={{textAlign:'center', marginTop:'40px'}}>
                    <Reveal>
                        <div className="section-label" style={{textAlign:'center', width:'100%'}}>{t['project-eu']}</div>
                        <p className="section-desc" style={{textAlign:'center'}}>{t['project-eu-desc']}</p>
                        
                        {/* Process Steps */}
                        <div className="process-pipeline">
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.eu_step1} alt="Step 1" className="process-thumb" /><span className="step-badge">01</span></div><h4>{t['eu-s1-t']}</h4><p>{t['eu-s1-d']}</p></div>
                            <div className="process-arrow">→</div>
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.eu_step2} alt="Step 2" className="process-thumb" /><span className="step-badge">02</span></div><h4>{t['eu-s2-t']}</h4><p>{t['eu-s2-d']}</p></div>
                            <div className="process-arrow">→</div>
                            <div className="process-step"><div className="process-thumb-container"><img src={CASE_IMAGES.eu_step3} alt="Step 3" className="process-thumb" /><span className="step-badge">03</span></div><h4>{t['eu-s3-t']}</h4><p>{t['eu-s3-d']}</p></div>
                        </div>

                        {/* PDF VIEWER AL POSTO DELLE SLIDE */}
                        <div style={{marginTop: '60px', width: '100%'}}>
                            <h4 style={{marginBottom:'20px', fontFamily:'Unbounded', textTransform:'uppercase', fontSize:'0.9rem', color:'#666'}}>Brand Guidelines Viewer</h4>
                            {/* Inseriamo il file PDF qui */}
                            <PdfViewer file={EU_PDF_FILE} />
                        </div>

                        <div className="credits-section">
                            <h4 className="credits-title-small">{t['credits-title']}</h4>
                            <motion.div className="collaborator-card" whileHover={{ scale: 1.02 }}>
                                <img src={CASE_IMAGES.collab_avatar} alt="Collaborator" className="collab-avatar" />
                                <div className="collab-info"><span className="collab-name">{t['collab-name']}</span><span className="collab-role">{t['collab-role']}</span></div>
                                <div className="collab-links"><SocialIconOnly type="ig" link="#" /><SocialIconOnly type="ln" link="#" /></div>
                            </motion.div>
                        </div>
                    </Reveal>
                </section>

                <footer style={{textAlign: 'center', padding: '6rem 2rem', opacity: 0.5}}><p>© 2025 White Rabbit Agency Case Study.</p></footer>
            </div>

            {/* MODALE LIGHTBOX (STRUTTURA CORRETTA) */}
            <AnimatePresence>
                {activePost && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.9)', zIndex: 1000,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => setActivePost(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            style={{
                                width: '90%', maxWidth: '500px', maxHeight: '80vh',
                                borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000',
                                position: 'relative'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setActivePost(null)}
                                style={{
                                    position: 'absolute', top: 10, right: 10, 
                                    background: 'rgba(0,0,0,0.5)', color: 'white', 
                                    border: 'none', borderRadius: '50%', width: 30, height: 30,
                                    cursor: 'pointer', zIndex: 10, fontSize: '16px', lineHeight: '30px', padding: 0
                                }}
                            >
                                ✕
                            </button>

                            {activePost.type === 'video' ? (
                                <video 
                                    src={activePost.src} 
                                    controls 
                                    autoPlay 
                                    style={{width: '100%', height: '100%', objectFit: 'contain'}} 
                                />
                            ) : (
                                <img 
                                    src={activePost.src} 
                                    alt="Full Post" 
                                    style={{width: '100%', height: 'auto', objectFit: 'contain', display: 'block'}} 
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

// --- GRADIENTE STANDARD ---
function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

export default WhiteRabbit;
