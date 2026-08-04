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
    profile_pic: "nerologo.jpg" 
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
        'back': '← TORNA',
        'title': 'NERO ESPRESSO',
        'role-title': 'Retail Brand Architecture & Operations',
        'slogan': 'Dal concept tridimensionale al posizionamento di mercato: un sistema visivo e operativo integrato per scalare l\'identità retail.',
        
        'comm-title': 'Brand Positioning & Digital Growth',
        'comm-desc': 'Direzione creativa e coordinamento dei canali digitali (IG/LinkedIn) orientati alla conversione e alla percezione di lusso accessibile del brand.',
        'ops-title': 'Retail Prototyping & Supply Chain Coordination',
        'ops-desc': 'Ingegnerizzazione del prodotto e pre-visualizzazione 3D (render di insegne e prototipi) per azzerare gli errori di produzione e blindare il rapporto con i fornitori.',
        
        'feed-title': 'VISUAL IDENTITY & SOCIAL FEED',
        'feed-desc': 'Cura maniacale dell\'estetica digitale per riflettere l\'esperienza sensoriale e premium del prodotto.',
        'ig-btn-label': 'ANALIZZA @NEROESPRESSO_OFFICIAL', 

        'proto-title': 'RITAGLIO OPERATIVO E PROTOTIPAZIONE',
        'proto-desc': 'Sviluppo di specifiche tecniche avanzate e asset tridimensionali per la validazione industriale prima della messa in opera.'
    },
    en: {
        'back': '← BACK',
        'title': 'NERO ESPRESSO',
        'role-title': 'Retail Brand Architecture & Operations',
        'slogan': 'From 3D concept to market positioning: an integrated visual and operational system to scale retail identity.',
        'comm-title': 'Brand Positioning & Digital Growth', 
        'comm-desc': 'Creative direction and coordination of digital channels (IG/LinkedIn) focused on conversion and the brand\'s premium perception.',
        'ops-title': 'Retail Prototyping & Supply Chain Coordination', 
        'ops-desc': 'Product engineering and 3D pre-visualization (signage and prototypes) to eliminate manufacturing errors and streamline supplier workflows.',
        'feed-title': 'VISUAL IDENTITY & SOCIAL FEED', 
        'feed-desc': 'Meticulous curation of digital aesthetics to reflect the sensory and premium experience of the product.',
        'ig-btn-label': 'ANALYZE @NEROESPRESSO_OFFICIAL',
        'proto-title': 'OPERATIVE PROTOTYPING & SPECIFICATIONS', 
        'proto-desc': 'Development of advanced technical specifications and 3D assets for industrial validation prior to execution.'
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
        if(type === 'web') return <img loading="lazy" decoding="async" src={ICON_WEB} alt="Website" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ig') return <img loading="lazy" decoding="async" src={ICON_IG} alt="Instagram" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ln') return <img loading="lazy" decoding="async" src={ICON_LN} alt="LinkedIn" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        return null; 
    }; 
    
    if (!link) return null;

    return (
        <motion.a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-btn-circle" 
            whileHover={{ scale: 1.1, backgroundColor: "#fff" }} 
            whileTap={{ scale: 0.95 }}
            style={{padding: '10px', pointerEvents: 'auto', position: 'relative', zIndex: 50, margin: '0 5px'}} 
        >
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
                        
                        <p className="bio-text" style={{
                            textAlign: 'center',
                            margin: '0 auto 40px auto',
                            maxWidth: '700px',
                            width: '90%',
                            lineHeight: '1.6',
                            fontSize: '1.1rem'
                        }}>
                            {t['slogan']}
                        </p>

                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '60px', position: 'relative', zIndex: 50}}>
                            <SocialIconOnly type="web" link={SOCIAL_LINKS.web} />
                            <SocialIconOnly type="ig" link={SOCIAL_LINKS.ig} />
                            <SocialIconOnly type="ln" link={SOCIAL_LINKS.ln} />
                        </div>

                        <div className="bento-grid">
                            <div className="bento-card solution-card"> 
                                <div className="card-icon">📈</div>
                                <h3>{t['comm-title']}</h3>
                                <p>{t['comm-desc']}</p>
                            </div>
                            <div className="bento-card challenge-card">
                                <div className="card-icon">📐</div>
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
                                            <motion.div 
                                                key={post.id} 
                                                className="ig-post" 
                                                style={{position: 'relative'}}
                                                whileHover={{ filter: "brightness(0.8)" }}
                                                onClick={() => setActivePost(post)}
                                            >
                                                <img 
                                                    src={post.thumb} 
                                                    alt={`Nero Espresso Social Post ${post.id}`} 
                                                    style={{width: '100%', height: '100%', objectFit: 'cover'}} 
                                                    onError={(e) => {e.target.style.display='none'; e.target.parentElement.style.backgroundColor='#eee'}}
                                                />
                                                {post.type === 'video' && (
                                                    <div style={{position:'absolute', top:5, right:5, color:'white', textShadow:'0 0 5px rgba(0,0,0,0.5)'}}>▶</div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                
                                <motion.a 
                                    href={SOCIAL_LINKS.ig} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="ig-visit-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
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
                                    <img loading="lazy" decoding="async" src={img} alt={`Nero Espresso Technical Prototype ${i + 1}`} />
                                    <span className="item-badge">TECH SPEC {i+1}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                <footer style={{textAlign: 'center', padding: 'clamp(3rem, 8vw, 6rem) 2rem', opacity: 0.5}}>
                    <p>© 2026 Nero Espresso Case Study | Brand Architecture by Angelo Russo.</p>
                </footer>

            </div>

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
                                <video preload="metadata" 
                                    src={activePost.src} 
                                    controls 
                                    autoPlay 
                                    style={{width: '100%', height: '100%', objectFit: 'contain'}} 
                                />
                            ) : (
                                <img 
                                    src={activePost.src} 
                                    alt="Full Size Social Content" 
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

function WaterGradient() {
    return (
        <ShaderGradient 
            animate="on" 
            axesHelper="off" 
            bgColor1="#000000" 
            bgColor2="#000000" 
            brightness={1.2} 
            cAzimuthAngle={180} 
            cDistance={2.9} 
            cPolarAngle={120} 
            cameraZoom={1} 
            color1="#ebedff" 
            color2="#f3f2f8" 
            color3="#dbf8ff" 
            destination="onCanvas" 
            embedMode="off" 
            envPreset="city" 
            format="gif" 
            fov={45} 
            frameRate={10} 
            gizmoHelper="hide" 
            grain="off" 
            lightType="3d" 
            pixelDensity={1} 
            positionX={0} 
            positionY={1.8} 
            positionZ={0} 
            range="disabled" 
            rangeEnd={40} 
            rangeStart={0} 
            reflection={0.1} 
            rotationX={0} 
            rotationY={0} 
            rotationZ={-90} 
            shader="defaults" 
            type="waterPlane" 
            uAmplitude={0} 
            uDensity={1} 
            uFrequency={5.5} 
            uSpeed={0.3} 
            uStrength={3} 
            uTime={0.2} 
            wireframe={false} 
        />
    );
}

export default NeroEspresso;
