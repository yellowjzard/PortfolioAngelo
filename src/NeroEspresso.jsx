import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'; 

// --- CONFIGURAZIONE LINK ---
const SOCIAL_LINKS = {
    ig: "https://www.instagram.com/neroespresso_official?igsh=bHR6MzY1d3A4ZThq", 
    ln: "https://www.linkedin.com/company/neroespresso/", 
    web: "https://www.neroespresso.com/" 
};

// --- ASSET IMMAGINI ---
const NE_ASSETS = {
    proto1: "NE-prerender-insegna.png", 
    proto2: "prototipo-neroespresso-1.png", 
    proto3: "prototipo-neroespresso-4.png",
    proto4: "prototipo-neroespresso-3.png", 
    profile_pic: "nero_logo.jpg" 
};

// --- ICONE SOCIAL ---
const ICON_IG = "Icona_instagram.webp";
const ICON_LN = "Icona_linkedin.webp";
const ICON_WEB = "Icona_site.webp";

// --- DATI FEED INSTAGRAM ---
const IG_CONTENT = [
    { id: 1, type: 'video', thumb: 'nero1.png', src: 'nero1.mp4' },
    { id: 2, type: 'image', thumb: 'nero2.jpg', src: 'nero2.jpg' },
    { id: 3, type: 'image', thumb: 'nero3.jpg', src: 'nero3.jpg' },
    { id: 4, type: 'image', thumb: 'nero4.jpg', src: 'nero4.jpg' }, 
    { id: 5, type: 'image', thumb: 'nero5.jpg', src: 'nero5.jpg' },
    { id: 6, type: 'image', thumb: 'nero6.jpg', src: 'nero6.jpg' },
];

const NE_LANG = {
    it: {
        'back': '← TORNA ALLA HOME',
        'title': 'NERO ESPRESSO',
        'role-title': 'Brand Identity e Visual Design a Napoli',
        'slogan': 'Un ecosistema visivo coerente e multifunzionale ad Afragola: dal social design al supporto vendite strategico.',
        
        'comm-title': 'Social & Visual Strategy',
        'comm-desc': 'Gestione professionale dei canali Instagram e LinkedIn. Sviluppo di grafiche editoriali e Reels dinamici per il posizionamento del brand nel mercato campano.',
        'ops-title': 'Sales & Operations Design',
        'ops-desc': 'Il design come leva di profitto: render 3D fotorealistici, pre-visualizzazioni tecniche e coordinamento operativo con i fornitori locali.',
        
        'feed-title': 'SOCIAL CONTENT PRODUCTION',
        'feed-desc': 'Cura estetica del feed Instagram per comunicare l\'identità premium e l\'aroma del caffè napoletano.',
        'ig-btn-label': 'VISITA IL PROFILO UFFICIALE', 

        'proto-title': 'PROTOTIPAZIONE TECNICA 3D',
        'proto-desc': 'Sviluppo di concept grafici e schede tecniche per la produzione di insegne e materiali promozionali fisici.'
    },
    en: {
        'back': '← BACK TO HOME',
        'title': 'NERO ESPRESSO',
        'role-title': 'Brand Identity & Visual Design in Naples',
        'slogan': 'A coherent and multifunctional visual ecosystem in Afragola: from social design to strategic sales support.',
        'comm-title': 'Social & Visual Strategy', 
        'comm-desc': 'Full management of Instagram/LinkedIn. Creation of editorial graphics and dynamic Reels to strengthen digital positioning.',
        'ops-title': 'Sales & Operations Design', 
        'ops-desc': 'Design as a sales tool: 3D renders, pre-visualizations, and operational flow management with local suppliers.',
        'feed-title': 'SOCIAL CONTENT PRODUCTION', 
        'feed-desc': 'Curation of the Instagram feed to convey the premium identity of Neapolitan coffee.',
        'ig-btn-label': 'VISIT @NEROESPRESSO',
        'proto-title': '3D TECHNICAL PROTOTYPING', 
        'proto-desc': 'Development of detailed concepts and technical sheets to support product production.'
    }
};

// --- COMPONENTI UI ---
const Typewriter = ({ text }) => {
    const letters = text.split("");
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };
    return <motion.h1 className="intro-text" variants={container} initial="hidden" animate="visible">{letters.map((char, index) => <motion.span key={index} variants={child}>{char}</motion.span>)}</motion.h1>;
};
const Reveal = ({ children }) => <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>{children}</motion.div>;

const SocialIconOnly = ({ type, link }) => { 
    const renderIcon = () => { 
        if(type === 'web') return <img src={ICON_WEB} alt="Sito Web Nero Espresso" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ig') return <img src={ICON_IG} alt="Instagram Nero Espresso" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ln') return <img src={ICON_LN} alt="LinkedIn Nero Espresso" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        return null; 
    }; 
    if (!link) return null;
    return (
        <motion.a href={link} target="_blank" rel="noopener noreferrer" className="social-btn-circle" whileHover={{ scale: 1.1, backgroundColor: "#fff" }} whileTap={{ scale: 0.95 }} style={{padding: '10px', pointerEvents: 'auto', position: 'relative', zIndex: 50, margin: '0 5px'}}>
            {renderIcon()}
        </motion.a>
    ); 
};

// --- MAIN COMPONENT ---
const NeroEspresso = ({ lang, goBack }) => {
    const t = NE_LANG[lang];
    const { scrollY } = useScroll();
    const [activePost, setActivePost] = useState(null); 

    const introOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const introBlur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(20px)"]);
    const introScale = useTransform(scrollY, [0, 400], [1, 0.9]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="app-container">
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
                <section className="glass-section">
                    <Reveal>
                        <h2 className="bio-headline" style={{textAlign:'center', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '15px'}}>{t['role-title']}</h2>
                        <p className="bio-text" style={{ textAlign: 'center', margin: '0 auto 40px auto', maxWidth: '700px', width: '90%', lineHeight: '1.6', fontSize: '1.1rem' }}>
                            {t['slogan']}
                        </p>

                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '60px', position: 'relative', zIndex: 50}}>
                            <SocialIconOnly type="web" link={SOCIAL_LINKS.web} />
                            <SocialIconOnly type="ig" link={SOCIAL_LINKS.ig} />
                            <SocialIconOnly type="ln" link={SOCIAL_LINKS.ln} />
                        </div>

                        <div className="bento-grid">
                            <div className="bento-card solution-card"> 
                                <div className="card-icon">📱</div>
                                <h3>{t['comm-title']}</h3>
                                <p>{t['comm-desc']}</p>
                            </div>
                            <div className="bento-card challenge-card">
                                <div className="card-icon">⚙️</div>
                                <h3>{t['ops-title']}</h3>
                                <p>{t['ops-desc']}</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section" style={{textAlign:'center'}}>
                    <Reveal>
                        <h2 className="section-label" style={{textAlign:'center', width:'100%', display:'block'}}>{t['feed-title']}</h2>
                        <p className="section-desc" style={{textAlign:'center'}}>{t['feed-desc']}</p>
                        
                        <div className="uk-grid-showcase">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <div className="ig-phone-mockup">
                                    <div className="ig-header">
                                        <div className="ig-avatar" style={{backgroundImage: `url(${NE_ASSETS.profile_pic})`, backgroundSize:'cover'}}></div>
                                        <div className="ig-username">neroespresso_official</div>
                                    </div>
                                    <div className="ig-grid">
                                        {IG_CONTENT.map((post) => (
                                            <motion.div key={post.id} className="ig-post" whileHover={{ filter: "brightness(0.8)" }} onClick={() => setActivePost(post)}>
                                                <img src={post.thumb} alt="Angelo Russo Social Work" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                                {post.type === 'video' && <div style={{position:'absolute', top:5, right:5, color:'white'}}>▶</div>}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <motion.a href={SOCIAL_LINKS.ig} target="_blank" rel="noopener noreferrer" className="ig-visit-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    {t['ig-btn-label']} ↗
                                </motion.a>
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section">
                    <Reveal>
                        <h2 className="section-label">{t['proto-title']}</h2>
                        <p className="section-desc">{t['proto-desc']}</p>
                        <div className="horizontal-gallery-track">
                            {[NE_ASSETS.proto1, NE_ASSETS.proto2, NE_ASSETS.proto3, NE_ASSETS.proto4].map((img, i) => (
                                <div key={i} className="gallery-item-proto">
                                    <img src={img} alt="Render 3D Angelo Russo Designer" />
                                    <span className="item-badge">SPECS {i+1}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                <footer style={{textAlign: 'center', padding: '6rem 2rem', opacity: 0.5}}>
                    <p>© 2026 Angelo Russo | Graphic Designer & Creative Specialist Afragola.</p>
                </footer>
            </div>

            <AnimatePresence>
                {activePost && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActivePost(null)}>
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} style={{ width: '90%', maxWidth: '500px', maxHeight: '80vh', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setActivePost(null)} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', zIndex: 10 }}>✕</button>
                            {activePost.type === 'video' ? <video src={activePost.src} controls autoPlay style={{width: '100%', height: '100%'}} /> : <img src={activePost.src} alt="Full Post Angelo Russo" style={{width: '100%', height: 'auto'}} />}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

export default NeroEspresso;
