import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- CONFIGURAZIONE LINK ---
const SOCIAL_LINKS = {
    ig: "https://www.instagram.com/gcerti.italy/", 
    ln: "https://www.linkedin.com/company/gcerti-italy/", 
    web: "https://www.gcerti.it/" 
};

// --- ASSET IMMAGINI ---
const GCERTI_ASSETS = {
    profile_pic: "gcerti_logo.jpg",
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
        'back': '← TORNA ALLA HOME',
        'title': 'GCERTI ITALY',
        'role-title': 'Da "Spesa Marketing" a Motore di Acquisizione B2B',
        'subtitle': 'Strategia di Riposizionamento Brand per Ente di Certificazione',
        'slogan': 'Ottimizzazione Budget Ads, Brand Authority e Lead Generation qualificata.',
        
        'problem-title': '🚨 L\'Analisi del Problema',
        'problem-desc': 'Dispersione del budget e sovrapposizione del tono di voce istituzionale.',
        'problem-content': [
            'Trappola del Consulente: Il tono di voce aziendale si sovrapponeva a quello dei consulenti esterni, diluendo l\'autorevolezza come Ente Terzo Indipendente.',
            'Contenuti Burocratici: Comunicazione basata su meri elenchi normativi, ignorati dai Decision Maker che percepivano le certificazioni solo come burocrazia.',
            'Inefficienza Budget Ads: Approccio generalista con spese fino a 9.000€ ogni 20 giorni su parole chiave non profilate.'
        ],

        'strategy-title': '🧠 La Strategia AI-Driven',
        'strategy-name': '"Zero-Click Authority" e Rigore Istituzionale',
        'strategy-p1': 'Ho eliminato ogni verbo legato al "supporto" per riposizionare GCERTI come giudice imparziale. Noi non facciamo i compiti per le aziende, noi misuriamo la loro conformità attraverso standard oggettivi.',
        'strategy-p2': 'Ho trasformato i trend normativi caldi (ISI INAIL, Patente a Crediti, AI Act) in Caroselli Deep-Dive su LinkedIn, applicando la regola dello Zero-Click Content per valore immediato.',

        'execution-title': '⚙️ Esecuzione Strategica',
        'execution-items': [
            'Editorial Strategy: 32 asset prodotti in 28 giorni (posizionamento al 75° percentile del settore).',
            'Event Coverage: Gestione comunicazione live per LetExpo Verona e Richmond HR Forum Rimini.',
            'Google Ads Targeting: Campagne chirurgiche su Parità di Genere, ISO 27001 (NIS2) ed Edilizia.'
        ],

        'results-title': '📈 Risultati Tangibili',
        'results-stats': [
            { value: '+542,8%', label: 'Instagram Engagement', sub: 'Crescita organica delle interazioni stabili' },
            { value: '465', label: 'LinkedIn One-Day Clicks', sub: 'Picco storico di traffico qualificato B2B' },
            { value: '-24,3%', label: 'Ottimizzazione CPC', sub: 'Riduzione costo per clic su campagne core' },
            { value: '468€', label: 'Budget Ads (20 gg)', sub: 'Invece dei 9.280€ della gestione precedente' }
        ],

        'takeaway-title': '🎯 Key Takeaway',
        'takeaway-desc': 'Interpretare le direttive di legge e trasformarle in ganci di marketing ottimizzando il budget ha permesso a GCERTI Italy di trasformare il marketing in un asset finanziario scalabile.',

        'feed-title': 'SOCIAL AUTHORITY',
        'feed-desc': 'Cura del feed LinkedIn e Instagram per consolidare l\'autorità B2B.',
        'ig-btn-label': 'VISITA @GCERTI.ITALY'
    },
    en: {
        'back': '← BACK TO HOME',
        'title': 'GCERTI ITALY',
        'role-title': 'From "Marketing Expense" to B2B Acquisition Engine',
        'subtitle': 'Brand Repositioning Strategy for a Certification Body',
        'slogan': 'Ads Budget Optimization, Brand Authority, and Qualified Lead Generation.',
        
        'problem-title': '🚨 The Challenge',
        'problem-desc': 'Budget dispersion and institutional voice overlap.',
        'problem-content': [
            'Consultant Trap: Corporate voice overlapped with external consultants, undermining authority as an Independent Third Party.',
            'Bureaucratic Content: Communication relied on dry regulatory lists, failing to engage high-level Decision Makers.',
            'Inefficient Ads Spend: Generic "spray and pray" approach with expenditures reaching €9,000 every 20 days.'
        ],

        'strategy-title': '🧠 Strategic Approach',
        'strategy-name': '"Zero-Click Authority" & Institutional Rigor',
        'strategy-p1': 'Repositioned GCERTI as an impartial market judge by eliminating "consulting-style" support language. We don\'t do the work; we measure its quality.',
        'strategy-p2': 'Leveraged regulatory trends (ISI INAIL, AI Act) into Deep-Dive LinkedIn carousels using Zero-Click Content strategies to build instant trust.',

        'execution-title': '⚙️ Strategic Execution',
        'execution-items': [
            'Content Lifecycle: 32 high-value assets produced in 28 days (Industry top 25%).',
            'Event Management: Full digital coverage for LetExpo Verona and Richmond HR Forum.',
            'Micro-Targeted Ads: Precision campaigns on Gender Equality, ISO 27001, and Public Tenders.'
        ],

        'results-title': '📈 Measurable Impact',
        'results-stats': [
            { value: '+542.8%', label: 'Instagram Engagement', sub: 'Significant organic interaction growth' },
            { value: '465', label: 'LinkedIn Daily Clicks', sub: 'Historical peak for qualified B2B traffic' },
            { value: '-24.3%', label: 'CPC Reduction', sub: 'Optimized bidding on high-intent keywords' },
            { value: '€468', label: 'Ads Budget (20 days)', sub: 'Successfully replaced the previous €9,280 spend' }
        ],

        'takeaway-title': '🎯 Key Takeaway',
        'takeaway-desc': 'By translating legal directives into marketing hooks and surgically optimizing the budget, GCERTI Italy transformed its marketing department into a scalable financial asset.',

        'feed-title': 'SOCIAL AUTHORITY',
        'feed-desc': 'Curated LinkedIn and Instagram presence for institutional B2B authority.',
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

const Reveal = ({ children }) => <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}>{children}</motion.div>;

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
    <motion.div className="metric-card" whileHover={{ scale: 1.05, backgroundColor: 'rgba(37, 99, 235, 0.12)' }} style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.5rem' }}>{value}</div>
        <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>{label}</div>
        <div style={{ fontSize: '0.85rem', opacity: 0.7, color: '#444', lineHeight: '1.4' }}>{sub}</div>
    </motion.div>
);

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
            
            <header><button onClick={goBack} className="lang-btn" style={{position:'fixed', left:'30px', zIndex:100, backdropFilter: 'blur(5px)'}}>{t['back']}</button></header>

            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, filter: introBlur, scale: introScale }}>
                <Typewriter text={t['title']} />
            </motion.div>

            <div className="content-scroll-layer">
                
                <section className="glass-section" style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(15px)' }}>
                    <Reveal>
                        <h2 className="bio-headline" style={{textAlign:'center', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', marginBottom: '15px', color: '#111'}}>{t['role-title']}</h2>
                        <h3 style={{textAlign:'center', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', opacity: 0.8, fontWeight: 500, marginBottom: '40px', color: '#333'}}>{t['subtitle']}</h3>
                        <p className="bio-text" style={{ textAlign: 'center', margin: '0 auto 40px auto', maxWidth: '800px', width: '95%', lineHeight: '1.8', fontSize: '1.15rem', color: '#222' }}>
                            {t['slogan']}
                        </p>
                    </Reveal>
                </section>

                <section className="glass-section" style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(15px)' }}>
                    <Reveal>
                        <h2 className="section-label">{t['problem-title']}</h2>
                        <h3 style={{ fontSize: '1.7rem', marginBottom: '25px', fontWeight: 800, color: '#111' }}>{t['problem-desc']}</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {t['problem-content'].map((item, index) => (
                                <motion.li key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} style={{ marginBottom: '18px', padding: '25px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '16px', borderLeft: '5px solid #ef4444', color: '#222', lineHeight: '1.6' }}>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </Reveal>
                </section>

                <section className="glass-section" style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(15px)' }}>
                    <Reveal>
                        <h2 className="section-label">{t['strategy-title']}</h2>
                        <h3 style={{ fontSize: '1.7rem', marginBottom: '25px', fontWeight: 800, color: '#111' }}>{t['strategy-name']}</h3>
                        <div className="bento-grid" style={{ gap: '20px' }}>
                            <div className="bento-card" style={{ background: 'rgba(37,99,235,0.1)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(37,99,235,0.2)' }}>
                                <p style={{ lineHeight: '1.9', fontSize: '1.05rem', color: '#111' }}>{t['strategy-p1']}</p>
                            </div>
                            <div className="bento-card" style={{ background: 'rgba(37,99,235,0.1)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(37,99,235,0.2)' }}>
                                <p style={{ lineHeight: '1.9', fontSize: '1.05rem', color: '#111' }}>{t['strategy-p2']}</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* SEZIONE RISULTATI - CORRETTA: Titolo allineato a sinistra come gli altri */}
                <section className="glass-section" style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(15px)' }}>
                    <Reveal>
                        <h2 className="section-label" style={{ textAlign: 'left' }}>{t['results-title']}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginTop: '30px' }}>
                            {t['results-stats'].map((stat, index) => (
                                <MetricCard key={index} {...stat} />
                            ))}
                        </div>
                    </Reveal>
                </section>

                <section className="glass-section" style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)' }}>
                    <Reveal>
                        <h2 className="section-label">{t['takeaway-title']}</h2>
                        <div style={{ padding: '40px', background: 'rgba(37,99,235,0.05)', borderRadius: '24px', border: '1px solid rgba(37,99,235,0.1)', marginTop: '20px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: '#2563eb' }}></div>
                            <p style={{ fontSize: '1.3rem', lineHeight: '1.9', fontStyle: 'italic', color: '#111', fontWeight: 500 }}>
                                "{t['takeaway-desc']}"
                            </p>
                        </div>
                    </Reveal>
                </section>

                <footer style={{textAlign: 'center', padding: '6rem 2rem', opacity: 0.7}}>
                    <p style={{ color: '#111', fontWeight: 600 }}>© 2026 Angelo Russo | Strategic B2B Branding.</p>
                </footer>
            </div>
        </div>
    );
};

// --- FUNZIONE WATERGRADIENT CORRETTA (IDENTICA ALLE ALTRE PAGINE) ---
function WaterGradient() {
    return <ShaderGradient 
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
    />;
}

export default GCerti;
