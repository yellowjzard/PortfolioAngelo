import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- CONFIGURAZIONE LINK (MODIFICA QUI I TUOI SOCIAL) ---
const SOCIAL_LINKS = {
    ig: "https://www.instagram.com/gcerti.italy/", // <--- LINK INSTAGRAM
    ln: "https://www.linkedin.com/company/gcerti-italy/", // <--- LINK LINKEDIN
    web: "https://www.gcerti.it/" // <--- SITO WEB
};

// --- ASSET IMMAGINI ---
const GCERTI_ASSETS = {
    proto1: "gcerti-proto-1.jpg",
    proto2: "gcerti-proto-2.jpg",
    proto3: "gcerti-proto-3.jpg",
    proto4: "gcerti-proto-4.jpg",
    profile_pic: "gcerti_logo.jpg",
    hero_graph: "gcerti-grafico-risultati.png" // Grafico con i risultati
};

// --- ICONE SOCIAL ---
const ICON_IG = "Icona_instagram.webp";
const ICON_LN = "Icona_linkedin.webp";
const ICON_WEB = "Icona_site.webp";

// --- DATI FEED INSTAGRAM (DA SOSTITUIRE CON QUELLI REALI) ---
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
        'title': 'GCERTI Italy',
        'role-title': 'Da "Spesa Marketing" a Motore di Acquisizione B2B',
        'subtitle': 'Il Riposizionamento di un Ente di Certificazione',
        'slogan': 'Riposizionamento del Brand, Ottimizzazione Budget Ads e Generazione di Lead Qualificati.',
        
        'problem-title': '🚨 Il Problema',
        'problem-desc': 'La dispersione del budget e il "Tono Consulenziale"',
        'problem-content': [
            'Trappola del Consulente: Il tono di voce aziendale si sovrapponeva a quello dei consulenti, diluendo l\'autorevolezza del brand come Ente Terzo Indipendente.',
            'Contenuti "Burocratici": I post social erano meri elenchi normativi, ignorati dai Decision Maker che vedevano le certificazioni solo come burocrazia.',
            'Budget Ads inefficiente: Approccio "spray and pray" con spese fino a 9.000€ ogni 20 giorni su parole chiave generiche.'
        ],

        'strategy-title': '🧠 La Strategia',
        'strategy-name': '"Zero-Click Authority" e il Rigore Istituzionale',
        'strategy-p1': 'Ho eliminato ogni verbo legato al "supporto" o alla "consulenza". GCERTI è stata riposizionata come il giudice imparziale del mercato: noi non facciamo i compiti per le aziende, noi misuriamo la loro tenuta attraverso indici qualitativi e un punteggio oggettivo.',
        'strategy-p2': 'Ho intercettato i trend normativi più caldi (Bando ISI INAIL da 600M€, Patente a Crediti, AI Act) e li ho trasformati in Caroselli Deep-Dive su LinkedIn, applicando la regola dello Zero-Click Content.',

        'execution-title': '⚙️ Esecuzione',
        'execution-items': [
            'Piano Editoriale (PED): 32 contenuti in 28 giorni (75° percentile del settore)',
            'Copertura Eventi: LetExpo Verona, Richmond HR Forum Rimini, Unione Industriali Napoli',
            'Google Ads Micro-Targeting: Parità di Genere (Bando Umbria), ISO 27001 (NIS2), Edilizia & Gare SOA'
        ],

        'results-title': '📈 I Risultati',
        'results-stats': [
            { value: '+542,8%', label: 'Engagement su Instagram', sub: 'Da 21 a 135 interazioni stabili' },
            { value: '465', label: 'Clic organici LinkedIn', sub: 'Picco storico in un giorno (Tasso 1,57%)' },
            { value: '-24,3%', label: 'CPC Campaign', sub: 'Da 0,82€ a 0,62€ su Parità di Genere' },
            { value: '468€', label: 'Budget Ads (20 giorni)', sub: 'vs 9.280€ della gestione precedente' }
        ],

        'takeaway-title': '🎯 Key Takeaway',
        'takeaway-desc': 'Leggere le direttive di legge, trasformarle in un gancio di marketing (Fear of Missing Out normativo) e ottimizzare chirurgicamente il budget pubblicitario ha permesso a GCERTI Italy non solo di aumentare la propria visibilità, ma di trasformare il dipartimento marketing in un vero e proprio asset finanziario e di acquisizione scalabile.',

        'feed-title': 'SOCIAL FEED',
        'feed-desc': 'Cura del feed LinkedIn e Instagram per l\'autorità istituzionale B2B.',
        'ig-btn-label': 'VISITA @GCERTI.ITALY'
    },
    en: {
        'back': '← BACK',
        'title': 'GCERTI Italy',
        'role-title': 'From "Marketing Expense" to B2B Acquisition Engine',
        'subtitle': 'The Repositioning of a Certification Body',
        'slogan': 'Brand Repositioning, Ads Budget Optimization and Qualified Lead Generation.',
        
        'problem-title': '🚨 The Problem',
        'problem-desc': 'Budget dispersion and the "Consultant Tone"',
        'problem-content': [
            'Consultant Trap: The corporate voice overlapped with consultants, diluting brand authority as an Independent Third Party.',
            '"Bureaucratic" Content: Social posts were mere regulatory lists, ignored by Decision Makers.',
            'Inefficient Ads Budget: "Spray and pray" approach with spending up to €9,000 every 20 days.'
        ],

        'strategy-title': '🧠 The Strategy',
        'strategy-name': '"Zero-Click Authority" and Institutional Rigor',
        'strategy-p1': 'I eliminated every verb related to "support" or "consulting". GCERTI was repositioned as the impartial market judge.',
        'strategy-p2': 'I intercepted hottest regulatory trends and turned them into Deep-Dive Carousels on LinkedIn, applying Zero-Click Content.',

        'execution-title': '⚙️ Execution',
        'execution-items': [
            'Editorial Plan: 32 contents in 28 days (75th industry percentile)',
            'Event Coverage: LetExpo Verona, Richmond HR Forum Rimini',
            'Google Ads Micro-Targeting: Gender Equality, ISO 27001, Construction'
        ],

        'results-title': '📈 Results',
        'results-stats': [
            { value: '+542.8%', label: 'Instagram Engagement', sub: 'From 21 to 135 stable interactions' },
            { value: '465', label: 'LinkedIn organic clicks', sub: 'Historical peak (1.57% rate)' },
            { value: '-24.3%', label: 'Campaign CPC', sub: 'From €0.82 to €0.62' },
            { value: '€468', label: 'Ads Budget (20 days)', sub: 'vs €9,280 previous management' }
        ],

        'takeaway-title': '🎯 Key Takeaway',
        'takeaway-desc': 'Reading regulations, turning them into marketing hooks (regulatory FOMO) and surgically optimizing the advertising budget transformed the marketing department into a true financial and scalable acquisition asset.',

        'feed-title': 'SOCIAL FEED',
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

// --- COMPONENTE SOCIAL ICONE ---
const SocialIconOnly = ({ type, link }) => { 
    const renderIcon = () => { 
        if(type === 'web') return <img src={ICON_WEB} alt="Web" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ig') return <img src={ICON_IG} alt="Instagram" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
        if(type === 'ln') return <img src={ICON_LN} alt="LinkedIn" style={{width:'100%', height:'100%', objectFit:'contain'}} />;
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

// --- METRIC CARD COMPONENT ---
const MetricCard = ({ value, label, sub }) => (
    <motion.div 
        className="metric-card"
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(37, 99, 235, 0.1)' }}
        style={{
            padding: '1.5rem',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
        }}
    >
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.5rem' }}>{value}</div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{label}</div>
        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>{sub}</div>
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
            
            {/* SFONDO GRADIENTE */}
            <div className="gradient-bg" style={{pointerEvents: 'none'}}>
                <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                    <WaterGradient />
                </ShaderGradientCanvas>
            </div>
            
            <header><button onClick={goBack} className="lang-btn" style={{position:'fixed', left:'30px', zIndex:100}}>{t['back']}</button></header>

            {/* INTRO */}
            <motion.div className="fixed-intro-layer" style={{ opacity: introOpacity, filter: introBlur, scale: introScale }}>
                <Typewriter text={t['title']} />
            </motion.div>

            <div className="content-scroll-layer">
                
                {/* HERO SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <h2 className="bio-headline" style={{textAlign:'center', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '15px'}}>{t['role-title']}</h2>
                        <h3 style={{textAlign:'center', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', opacity: 0.9, marginBottom: '20px'}}>{t['subtitle']}</h3>
                        
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

                        {/* SOCIAL ICONS */}
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '60px', position: 'relative', zIndex: 50}}>
                            <SocialIconOnly type="web" link={SOCIAL_LINKS.web} />
                            <SocialIconOnly type="ig" link={SOCIAL_LINKS.ig} />
                            <SocialIconOnly type="ln" link={SOCIAL_LINKS.ln} />
                        </div>
                    </Reveal>
                </section>

                {/* PROBLEM SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <div className="section-label">{t['problem-title']}</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{t['problem-desc']}</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {t['problem-content'].map((item, index) => (
                                <motion.li 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{ 
                                        marginBottom: '15px', 
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '12px',
                                        borderLeft: '3px solid #ef4444'
                                    }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </Reveal>
                </section>

                {/* STRATEGY SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <div className="section-label">{t['strategy-title']}</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{t['strategy-name']}</h3>
                        <div className="bento-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <div className="bento-card" style={{ background: 'rgba(37,99,235,0.05)' }}>
                                <p>{t['strategy-p1']}</p>
                            </div>
                            <div className="bento-card" style={{ background: 'rgba(37,99,235,0.05)' }}>
                                <p>{t['strategy-p2']}</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* EXECUTION SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <div className="section-label">{t['execution-title']}</div>
                        <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
                            {t['execution-items'].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '12px',
                                        borderLeft: '3px solid #2563eb'
                                    }}
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* RESULTS SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <div className="section-label">{t['results-title']}</div>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                            marginTop: '30px'
                        }}>
                            {t['results-stats'].map((stat, index) => (
                                <MetricCard key={index} {...stat} />
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* TAKEAWAY SECTION */}
                <section className="glass-section">
                    <Reveal>
                        <div className="section-label">{t['takeaway-title']}</div>
                        <div style={{
                            padding: '30px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            marginTop: '20px'
                        }}>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', fontStyle: 'italic' }}>
                                "{t['takeaway-desc']}"
                            </p>
                        </div>
                    </Reveal>
                </section>

                {/* SOCIAL FEED */}
                <section className="glass-section" style={{textAlign:'center'}}>
                    <Reveal>
                        <div className="section-label" style={{textAlign:'center', width:'100%'}}>{t['feed-title']}</div>
                        <p className="section-desc" style={{textAlign:'center'}}>{t['feed-desc']}</p>
                        
                        <div className="uk-grid-showcase">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                {/* Phone Mockup */}
                                <div className="ig-phone-mockup">
                                    <div className="ig-header">
                                        <div className="ig-avatar" style={{backgroundImage: `url(${GCERTI_ASSETS.profile_pic})`, backgroundSize:'cover'}}></div>
                                        <div className="ig-username">gcerti.italy</div>
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
                                                    alt="Post" 
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
                                
                                {/* Link Esterno */}
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

                <footer style={{textAlign: 'center', padding: '6rem 2rem', opacity: 0.5}}>
                    <p>© 2025 GCERTI Italy Case Study.</p>
                </footer>

            </div>

            {/* MODALE LIGHTBOX */}
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

// --- GRADIENTE WATER ---
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

export default GCerti;
