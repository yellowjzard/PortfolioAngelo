import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- CONFIGURAZIONE LINK ---
const SOCIAL_LINKS = {
    ig: "https://www.instagram.com/gcerti_certificazioni?igsh=aHcwcjhiNzd1YWZq&utm_source=qr", 
    ln: "https://www.linkedin.com/company/gcerticertificazioni/", 
    web: "https://www.gcerti.it/" 
};

// --- ASSET IMMAGINI ---
const GCERTI_ASSETS = {
    proto1: "gcerti-proto-1.jpg",
    proto2: "gcerti-proto-2.jpg",
    proto3: "gcerti-proto-3.jpg",
    proto4: "gcerti-proto-4.jpg",
    profile_pic: "gcerti_logo.jpg",
    hero_graph: "gcerti-grafico-risultati.png" 
};

// --- ICONE SOCIAL ---
const ICON_IG = "Icona_instagram.webp";
const ICON_LN = "Icona_linkedin.webp";
const ICON_WEB = "Icona_site.webp";

// --- DATI FEED INSTAGRAM ---
const IG_CONTENT = [
    { id: 1, type: 'image', thumb: 'gcerti1.jpg', src: 'gcerti1.jpg' },
    { id: 2, type: 'image', thumb: 'gcerti2.jpg', src: 'gcerti2.jpg' },
    { id: 3, type: 'image', thumb: 'gcerti3.jpg', src: 'gcerti3.jpg' },
    { id: 4, type: 'video', thumb: 'gcerti4.jpg', src: 'gcerti4.mp4' },
    { id: 5, type: 'image', thumb: 'gcerti5.jpg', src: 'gcerti5.jpg' },
    { id: 6, type: 'image', thumb: 'gcerti6.jpg', src: 'gcerti6.jpg' },
];

const GCERTI_LANG = {
    it: {
        'back': '← TORNA',
        'title': 'GCERTI ITALY',
        'role-title': 'Da "Spesa Marketing" a Motore di Acquisizione B2B',
        'subtitle': 'Strategia di Riposizionamento per un Ente di Certificazione',
        'slogan': 'Riposizionamento del Brand, Ottimizzazione Budget Ads e Generazione di Lead Qualificati.',
        
        'problem-title': '🚨 Il Problema',
        'problem-desc': 'Dispersione del Budget e Sovrapposizione del Tono di Voce',
        'problem-content': [
            'Trappola del Consulente: Il tono di voce aziendale si sovrapponeva a quello dei consulenti esterni, diluendo l\'autorevolezza di GCERTI come Ente Terzo Indipendente.',
            'Contenuti Burocratici: I post social erano meri elenchi normativi, ignorati dai Decision Maker che percepivano le certificazioni solo come un costo burocratico.',
            'Inefficienza Pubblicitaria: Un approccio generalista con spese fino a 9.000€ ogni 20 giorni su parole chiave non profilate.'
        ],

        'strategy-title': '🧠 La Strategia',
        'strategy-name': '"Zero-Click Authority" e Rigore Istituzionale',
        'strategy-p1': 'Ho rimosso ogni riferimento alla "consulenza" per riposizionare GCERTI come giudice imparziale del mercato. Non forniamo supporto operativo: misuriamo la tenuta aziendale attraverso indici qualitativi e punteggi oggettivi.',
        'strategy-p2': 'Ho trasformato i trend normativi (Bando ISI INAIL, Patente a Crediti, AI Act) in contenuti Deep-Dive su LinkedIn, applicando la strategia dello Zero-Click Content per massimizzare l\'autorità immediata.',

        'execution-title': '⚙️ Esecuzione Strategica',
        'execution-items': [
            'Digital Content Strategy: Produzione di 32 contenuti in 28 giorni (posizionamento al 75° percentile di settore).',
            'Event Coverage & Networking: Gestione della comunicazione per LetExpo Verona, Richmond HR Forum e Unione Industriali Napoli.',
            'Ads Micro-Targeting: Campagne chirurgiche su Parità di Genere (Bando Umbria), ISO 27001 (NIS2) e Gare SOA.'
        ],

        'results-title': '📈 Risultati Misurabili',
        'results-stats': [
            { value: '+542,8%', label: 'Instagram Engagement', sub: 'Crescita organica delle interazioni stabili' },
            { value: '465', label: 'LinkedIn One-Day Clicks', sub: 'Picco storico di traffico qualificato' },
            { value: '-24,3%', label: 'Riduzione CPC', sub: 'Ottimizzazione costi su campagne core' },
            { value: '468€', label: 'Budget Ads (20 gg)', sub: 'A fronte dei 9.280€ della gestione precedente' }
        ],

        'takeaway-title': '🎯 Key Takeaway',
        'takeaway-desc': 'Interpretare le direttive di legge e trasformarle in ganci di marketing (normative FOMO), ottimizzando chirurgicamente il budget, ha permesso a GCERTI Italy di trasformare il marketing da centro di costo ad asset finanziario scalabile.',

        'feed-title': 'SOCIAL AUTHORITY',
        'feed-desc': 'Cura del feed LinkedIn e Instagram per consolidare l\'autorità istituzionale B2B.',
        'ig-btn-label': 'VISITA @GCERTI.ITALY'
    },
    en: {
        'back': '← BACK',
        'title': 'GCERTI ITALY',
        'role-title': 'From "Marketing Expense" to B2B Acquisition Engine',
        'subtitle': 'Brand Repositioning Strategy for a Certification Body',
        'slogan': 'Brand Strategy, Ads Budget Optimization, and High-Quality Lead Generation.',
        
        'problem-title': '🚨 The Challenge',
        'problem-desc': 'Budget Inefficiency and Brand Dilution',
        'problem-content': [
            'Consultant Trap: The corporate voice was indistinguishable from consultants, undermining GCERTI\'s authority as an Independent Third Party.',
            'Bureaucratic Content: Social media was used for dry regulatory lists, failing to engage Decision Makers.',
            'Spending Inefficiency: A "spray and pray" approach with expenditures reaching €9,000 every 20 days on generic keywords.'
        ],

        'strategy-title': '🧠 The Strategy',
        'strategy-name': '"Zero-Click Authority" & Institutional Rigor',
        'strategy-p1': 'I eliminated all "consulting-style" language to reposition GCERTI as an impartial market judge. We don\'t perform the work for clients; we measure their performance through objective scoring.',
        'strategy-p2': 'I leveraged regulatory trends (ISI INAIL, AI Act) into Deep-Dive LinkedIn Carousels, utilizing Zero-Click Content to establish immediate market leadership.',

        'execution-title': '⚙️ Execution',
        'execution-items': [
            'Content Lifecycle Management: 32 high-value assets produced in 28 days (Industry top tier).',
            'Live Event Strategy: Communication management for major forums like LetExpo and Richmond HR.',
            'Micro-Targeted Ads: Precision campaigns focused on Gender Equality, ISO 27001, and Public Tenders.'
        ],

        'results-title': '📈 Results',
        'results-stats': [
            { value: '+542.8%', label: 'Instagram Engagement', sub: 'Consistent organic interaction growth' },
            { value: '465', label: 'LinkedIn Daily Clicks', sub: 'Historical peak for qualified B2B traffic' },
            { value: '-24.3%', label: 'CPC Reduction', sub: 'Smarter bidding on high-intent keywords' },
            { value: '€468', label: 'Ads Budget (20 days)', sub: 'Successfully replaced the previous €9,280 spend' }
        ],

        'takeaway-title': '🎯 Key Takeaway',
        'takeaway-desc': 'Translating legal directives into marketing hooks and surgically optimizing the budget allowed GCERTI Italy to transform its marketing department into a scalable financial asset.',

        'feed-title': 'SOCIAL AUTHORITY',
        'feed-desc': 'LinkedIn and Instagram feed curation for B2B institutional authority.',
        'ig-btn-label': 'VISIT @GCERTI.ITALY'
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
        if(type === 'web') return <img src={ICON_WEB} alt="Corporate Website" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ig') return <img src={ICON_IG} alt="Instagram Feed" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ln') return <img src={ICON_LN} alt="LinkedIn Profile" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        return null; 
    }; 
    if (!link) return null;
    return (
        <motion.a href={link} target="_blank" rel="noopener noreferrer" className="social-btn-circle" whileHover={{ scale: 1.1, backgroundColor: "#fff" }} whileTap={{ scale: 0.95 }} style={{padding: '10px', pointerEvents: 'auto', position: 'relative', zIndex: 50, margin: '0 5px'}}>
            {renderIcon()}
        </motion.a>
    ); 
};

const MetricCard = ({ value, label, sub }) => (
    <motion.div className="metric-card" whileHover={{ scale: 1.05, backgroundColor: 'rgba(37, 99, 235, 0.1)' }} style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.5rem' }}>{value}</div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: '#fff' }}>{label}</div>
        <div style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: '1.3' }}>{sub}</div>
    </motion.div>
);

// --- MAIN COMPONENT ---
const GCerti = ({ lang, goBack }) => {
    const t = GCERTI_LANG[lang];
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
                        <h3 style={{textAlign:'center', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', opacity: 0.7, fontWeight: 400, marginBottom: '40px'}}>{t['subtitle']}</h3>
                        <p className="bio-text" style={{ textAlign: 'center', margin: '0 auto 40px auto', maxWidth: '750px', width: '90%', lineHeight: '1.7', fontSize: '1.1rem' }}>
                            {t['slogan']}
                        </p>
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px', position: 'relative', zIndex: 50}}>
                            <SocialIconOnly type="web" link={SOCIAL_LINKS.web} />
                            <SocialIconOnly type="ig" link={SOCIAL_LINKS.ig} />
                            <SocialIconOnly type="ln" link={SOCIAL_LINKS.ln} />
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section">
                    <Reveal>
                        <h2 className="section-label">{t['problem-title']}</h2>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '25px', fontWeight: 700 }}>{t['problem-desc']}</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {t['problem-content'].map((item, index) => (
                                <motion.li key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} style={{ marginBottom: '15px', padding: '20px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </Reveal>
                </section>

                <section className="glass-section">
                    <Reveal>
                        <h2 className="section-label">{t['strategy-title']}</h2>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '25px', fontWeight: 700 }}>{t['strategy-name']}</h3>
                        <div className="bento-grid">
                            <div className="bento-card" style={{ background: 'rgba(37,99,235,0.08)', padding: '25px' }}>
                                <p style={{ lineHeight: '1.8' }}>{t['strategy-p1']}</p>
                            </div>
                            <div className="bento-card" style={{ background: 'rgba(37,99,235,0.08)', padding: '25px' }}>
                                <p style={{ lineHeight: '1.8' }}>{t['strategy-p2']}</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section">
                    <Reveal>
                        <h2 className="section-label">{t['results-title']}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '30px' }}>
                            {t['results-stats'].map((stat, index) => (
                                <MetricCard key={index} {...stat} />
                            ))}
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section">
                    <Reveal>
                        <h2 className="section-label">{t['takeaway-title']}</h2>
                        <div style={{ padding: '35px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', marginTop: '20px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#2563eb' }}></div>
                            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', fontStyle: 'italic', color: '#eee' }}>
                                "{t['takeaway-desc']}"
                            </p>
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section" style={{textAlign:'center'}}>
                    <Reveal>
                        <h2 className="section-label" style={{textAlign:'center', width:'100%', display:'block'}}>{t['feed-title']}</h2>
                        <p className="section-desc" style={{textAlign:'center', marginBottom: '40px'}}>{t['feed-desc']}</p>
                        <div className="uk-grid-showcase">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <div className="ig-phone-mockup">
                                    <div className="ig-header">
                                        <div className="ig-avatar" style={{backgroundImage: `url(${GCERTI_ASSETS.profile_pic})`, backgroundSize:'cover'}}></div>
                                        <div className="ig-username">gcerti.italy</div>
                                    </div>
                                    <div className="ig-grid">
                                        {IG_CONTENT.map((post) => (
                                            <motion.div key={post.id} className="ig-post" whileHover={{ filter: "brightness(0.8)" }} onClick={() => setActivePost(post)}>
                                                <img src={post.thumb} alt={`GCERTI Institutional Content ${post.id}`} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
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

                <footer style={{textAlign: 'center', padding: '6rem 2rem', opacity: 0.5}}>
                    <p>© 2026 Angelo Russo | B2B Brand Strategist. Case Study: GCERTI Italy.</p>
                </footer>
            </div>

            <AnimatePresence>
                {activePost && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActivePost(null)}>
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} style={{ width: '90%', maxWidth: '500px', maxHeight: '80vh', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setActivePost(null)} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', zIndex: 10 }}>✕</button>
                            {activePost.type === 'video' ? <video src={activePost.src} controls autoPlay style={{width: '100%', height: '100%'}} /> : <img src={activePost.src} alt="Case Result Detail" style={{width: '100%', height: 'auto'}} />}
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

export default GCerti;
