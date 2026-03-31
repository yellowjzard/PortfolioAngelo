import React, { useState, useEffect, useRef } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// --- CONFIGURAZIONE LINK ---
const SOCIAL_LINKS = {
    ig: "https://www.instagram.com/gcerti.italy/",
    ln: "https://www.linkedin.com/company/gcerti-italy/",
    web: "https://www.gcerti.it/"
};

const GCERTI_LANG = {
    it: {
        'back': '← HOME',
        'title': 'GCERTI ITALY',
        'role-title': 'Da "Spesa Marketing" a Motore di Acquisizione B2B & B2C.',
        'subtitle': 'Strategia di Riposizionamento Brand, AI Creative Direction e Performance Marketing per Ente di Certificazione.',
        'slogan': 'Ottimizzazione Budget Ads, Brand Authority, Design Generativo e Lead Generation chirurgica.',
        'problem-title': 'Il Problema',
        'problem-desc': 'Dispersione del budget e sovrapposizione del tono di voce istituzionale.',
        'problem-content': [
            { icon: '🔴', title: 'Trappola del Consulente', body: 'Il tono di voce aziendale si sovrapponeva a quello dei consulenti esterni, diluendo l\'autorevolezza come Ente Terzo Indipendente.' },
            { icon: '📋', title: 'Contenuti Burocratici', body: 'La comunicazione era basata su elenchi normativi noiosi, ignorati dai Decision Maker.' },
            { icon: '💸', title: 'Emorragia di Budget Ads', body: 'Un approccio "generalista" su Google Ads con parole chiave a corrispondenza generica bruciava budget senza conversioni.' }
        ],
        'strategy-title': 'La Strategia',
        'strategy-name': 'I 3 Pilastri Strategici',
        'strategy-pillars': [
            { num: '01', title: 'Zero-Click Repositioning', body: 'Trasformazione di direttive complesse in Caroselli LinkedIn ad alto valore informativo e zero attrito.' },
            { num: '02', title: 'AI Visual Authority', body: 'Prompt Engineering avanzato per asset visivi "3D glossy photorealistic". Creatività corporate premium scalabili, costi di produzione abbattuti.' },
            { num: '03', title: 'Multichannel Perfect Trap', body: 'Ecosistema combinato: Search (esatta/frase) per domanda consapevole + Performance Max per retargeting visivo e creazione del bisogno.' }
        ],
        'execution-title': 'Esecuzione',
        'execution-items': [
            { step: 'Step 01', title: 'Editorial & Event Strategy', body: 'Produzione massiva di 32 asset in 28 giorni e copertura live per LetExpo Verona e Richmond HR Forum Rimini.' },
            { step: 'Step 02', title: 'Agilità B2B vs B2C', body: 'Funnel paralleli: targeting chirurgico alto-spendente per CEO (ISO 9001, Parità di Genere) e campagne "Fear vs Safety" per il mercato di massa (DigComp 2.2).' },
            { step: 'Step 03', title: 'Tracking & Data Clean-Up', body: 'Chiusura dei rubinetti degli sprechi, tracking conversioni avanzato via 123FormBuilder/Tag Google e protezione budget con Test Pilota controllati.' }
        ],
        'results-title': 'Risultati',
        'results-stats': [
            { value: '+542,8%', label: 'Instagram Engagement', sub: 'Crescita organica delle interazioni stabili', progress: 0.85 },
            { value: '465', label: 'LinkedIn Clicks / Giorno', sub: 'Picco storico B2B', progress: 1.0 },
            { value: '-24,3%', label: 'Ottimizzazione CPC', sub: 'Riduzione costo per clic qualificato', progress: 0.75 },
            { value: '100%', label: 'Budget Protection', sub: 'Investimento veicolato su query di acquisto o lead form tracciati', progress: 1.0 }
        ],
        'takeaway-title': 'Key Takeaway',
        'takeaway-desc': 'Interpretare le complesse direttive di legge, trasformarle in ganci visivi generati tramite AI e distribuirle su ecosistemi Google Ads blindati, ha permesso a GCERTI Italy di smettere di "comprare clic" e iniziare a costruire un asset finanziario scalabile.'
    },
    en: {
        'back': '← HOME',
        'title': 'GCERTI ITALY',
        'role-title': 'From "Marketing Expense" to B2B Acquisition Engine.',
        'subtitle': 'Brand Repositioning Strategy, AI Creative Direction and Performance Marketing for a Certification Body.',
        'slogan': 'Ads Budget Optimization, Brand Authority, Generative Design and Qualified Lead Generation.',
        'problem-title': 'The Problem',
        'problem-desc': 'Budget dispersion and institutional voice overlap.',
        'problem-content': [
            { icon: '🔴', title: 'Consultant Trap', body: 'Corporate voice overlapped with external consultants, undermining authority as an Independent Third Party.' },
            { icon: '📋', title: 'Bureaucratic Content', body: 'Communication relied on dry regulatory lists, failing to engage high-level Decision Makers.' },
            { icon: '💸', title: 'Ads Budget Hemorrhage', body: 'Generic "spray and pray" approach with broad-match keywords burning budget without conversions.' }
        ],
        'strategy-title': 'The Strategy',
        'strategy-name': '3 Strategic Pillars',
        'strategy-pillars': [
            { num: '01', title: 'Zero-Click Repositioning', body: 'Transforming complex legal directives into high-value LinkedIn Carousels with zero friction.' },
            { num: '02', title: 'AI Visual Authority', body: 'Advanced Prompt Engineering for 3D glossy photorealistic assets. Premium corporate creatives at scale, slashing production costs.' },
            { num: '03', title: 'Multichannel Perfect Trap', body: 'Combined ecosystem: Search (exact/phrase) for conscious demand + Performance Max for visual retargeting and need creation.' }
        ],
        'execution-title': 'Execution',
        'execution-items': [
            { step: 'Step 01', title: 'Editorial & Event Strategy', body: 'Massive production of 32 assets in 28 days and live coverage for LetExpo Verona and Richmond HR Forum Rimini.' },
            { step: 'Step 02', title: 'B2B vs B2C Agility', body: 'Parallel funnels: surgical high-spend targeting for CEOs (ISO 9001, Gender Equality) and "Fear vs Safety" campaigns for mass market (DigComp 2.2).' },
            { step: 'Step 03', title: 'Tracking & Data Clean-Up', body: 'Stopping wasted spend, implementing advanced conversion tracking via 123FormBuilder/Google Tag and protecting budget with controlled Pilot Tests.' }
        ],
        'results-title': 'Results',
        'results-stats': [
            { value: '+542.8%', label: 'Instagram Engagement', sub: 'Stable organic interaction growth', progress: 0.85 },
            { value: '465', label: 'LinkedIn Clicks / Day', sub: 'Historical B2B peak', progress: 1.0 },
            { value: '-24.3%', label: 'CPC Optimization', sub: 'Reduced cost per qualified click', progress: 0.75 },
            { value: '100%', label: 'Budget Protection', sub: 'Investment routed on purchase-intent queries or tracked lead forms', progress: 1.0 }
        ],
        'takeaway-title': 'Key Takeaway',
        'takeaway-desc': 'By translating complex legal directives into AI-generated visual hooks and distributing them across locked-down Google Ads ecosystems, GCERTI Italy stopped buying clicks and started building a scalable financial asset.'
    }
};

// --- CURSOR PERSONALIZZATO ---
const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
    const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
        const over = (e) => { if (e.target.closest('button, a, [data-hover]')) setIsHovering(true); };
        const out = () => setIsHovering(false);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseover', over);
        window.addEventListener('mouseout', out);
        return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); window.removeEventListener('mouseout', out); };
    }, []);

    return (
        <motion.div style={{ x: springX, y: springY, position: 'fixed', top: -12, left: -12, width: 24, height: 24, borderRadius: '50%', background: isHovering ? 'rgba(8,82,87,0.8)' : 'rgba(8,82,87,0.4)', border: '1.5px solid rgba(8,82,87,0.6)', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'multiply', scale: isHovering ? 1.8 : 1, transition: 'background 0.2s, scale 0.2s' }} />
    );
};

// --- TYPEWRITER ANIMATO ---
const Typewriter = ({ text }) => {
    const words = text.split(" ");
    return (
        <motion.h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, letterSpacing: '-3px', color: '#085257', lineHeight: 1, textAlign: 'center', fontFamily: '"Playfair Display", serif', margin: 0 }}>
            {words.map((word, wi) => (
                <motion.span key={wi} style={{ display: 'inline-block', marginRight: '0.25em' }} initial={{ opacity: 0, y: 60, rotateX: -40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: wi * 0.15, duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}>
                    {word}
                </motion.span>
            ))}
        </motion.h1>
    );
};

// --- REVEAL AL SCROLL ---
const Reveal = ({ children, delay = 0 }) => (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut", delay }}>
        {children}
    </motion.div>
);

// --- METRIC CARD INTERATTIVA ---
const MetricCard = ({ value, label, sub, progress, index }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            data-hover
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            whileHover={{ y: -8, boxShadow: '0 30px 60px -10px rgba(8,82,87,0.25)' }}
            style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem)', borderRadius: '20px', background: hovered ? 'rgba(8,82,87,0.06)' : 'rgba(255,255,255,0.7)', border: `1px solid ${hovered ? 'rgba(8,82,87,0.3)' : 'rgba(255,255,255,0.9)'}`, backdropFilter: 'blur(12px)', cursor: 'default', transition: 'background 0.3s, border 0.3s', position: 'relative', overflow: 'hidden' }}
        >
            {/* glow di sfondo */}
            <motion.div animate={{ opacity: hovered ? 1 : 0 }} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(8,82,87,0.08), transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#085257', letterSpacing: '-2px', fontFamily: '"Playfair Display", serif', lineHeight: 1.1 }}>{value}</div>

            <div style={{ margin: '14px 0', height: '3px', background: 'rgba(8,82,87,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${progress * 100}%` }} viewport={{ once: true }} transition={{ delay: 0.4 + index * 0.1, duration: 1.2, ease: "easeOut" }} style={{ height: '100%', background: 'linear-gradient(90deg, #085257, #20b8c4)', borderRadius: '2px', position: 'relative' }}>
                    <motion.div animate={{ x: ['0%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear', delay: 1.5 }} style={{ position: 'absolute', top: 0, left: '-30%', width: '30%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }} />
                </motion.div>
            </div>

            <div style={{ fontWeight: 700, color: '#111', marginBottom: '6px', fontSize: '1rem', letterSpacing: '0.02em' }}>{label}</div>
            <div style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.5 }}>{sub}</div>
        </motion.div>
    );
};

// --- PILLAR CARD INTERATTIVA ---
const PillarCard = ({ num, title, body, index }) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <motion.div
            data-hover
            onClick={() => setFlipped(!flipped)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            style={{ cursor: 'pointer', perspective: '1000px', height: '220px' }}
            title="Click to flip"
        >
            <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }} style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}>
                {/* Front */}
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.9)', padding: 'clamp(1.2rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(8,82,87,0.12)', fontFamily: '"Playfair Display", serif', lineHeight: 1 }}>{num}</span>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#085257', marginBottom: '8px' }}>{title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#085257', opacity: 0.6, fontWeight: 500 }}>Click per dettagli →</div>
                    </div>
                </div>
                {/* Back */}
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #085257, #0d7a82)', borderRadius: '20px', padding: 'clamp(1.2rem, 3vw, 2rem)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ color: 'white', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{body}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- TIMELINE ESECUZIONE ---
const ExecutionTimeline = ({ items }) => (
    <div style={{ position: 'relative', paddingLeft: '24px' }}>
        <div style={{ position: 'absolute', top: 10, left: '36px', width: '2px', height: 'calc(100% - 20px)', background: 'linear-gradient(180deg, #085257, rgba(8,82,87,0.1))' }} />
        {items.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, type: 'spring', stiffness: 60 }}
                style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '28px', position: 'relative' }}>
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.2 + 0.2, type: 'spring' }}
                    style={{ minWidth: '26px', height: '26px', borderRadius: '50%', background: '#085257', border: '3px solid #fff', boxShadow: '0 0 0 3px rgba(8,82,87,0.2)', zIndex: 2, marginTop: '16px' }} />
                <motion.div data-hover whileHover={{ x: 6 }} style={{ marginLeft: '22px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', padding: 'clamp(1rem, 3vw, 1.4rem) clamp(1.2rem, 3.5vw, 1.8rem)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.9)', flex: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', cursor: 'default' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#085257', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>{item.step}</div>
                    <div style={{ fontWeight: 800, color: '#111', marginBottom: '8px', fontSize: '1.05rem' }}>{item.title}</div>
                    <p style={{ margin: 0, color: '#444', lineHeight: 1.65, fontSize: '0.95rem' }}>{item.body}</p>
                </motion.div>
            </motion.div>
        ))}
    </div>
);

// --- SECTION LABEL ---
const SectionLabel = ({ children, color = '#085257' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ width: '32px', height: '2px', background: color }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color, letterSpacing: '3px', textTransform: 'uppercase' }}>{children}</span>
    </div>
);

// --- PROBLEM CARD CON HOVER ---
const ProblemCard = ({ icon, title, body, index }) => (
    <motion.div data-hover initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}
        whileHover={{ x: 8, backgroundColor: 'rgba(239,68,68,0.08)' }}
        style={{ padding: 'clamp(1.2rem, 3vw, 1.8rem) clamp(1.2rem, 3vw, 2rem)', background: 'rgba(239,68,68,0.04)', borderRadius: '16px', borderLeft: '4px solid #ef4444', cursor: 'default', transition: 'background 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{icon}</span>
            <div>
                <div style={{ fontWeight: 800, color: '#111', marginBottom: '6px', fontSize: '1.05rem' }}>{title}</div>
                <p style={{ margin: 0, color: '#444', lineHeight: 1.6, fontSize: '0.95rem' }}>{body}</p>
            </div>
        </div>
    </motion.div>
);

// --- SCROLL PROGRESS BAR ---
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'linear-gradient(90deg, #085257, #20b8c4)', transformOrigin: 'left', scaleX: scrollYProgress, zIndex: 200 }} />
    );
};

// --- SFONDO SHADER ---
function WaterGradient() {
    return <ShaderGradient
        animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000"
        brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120}
        cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff"
        destination="onCanvas" embedMode="off" envPreset="city" format="gif"
        fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d"
        pixelDensity={1} positionX={0} positionY={1.8} positionZ={0}
        range="disabled" rangeEnd={40} rangeStart={0} reflection={0.1}
        rotationX={0} rotationY={0} rotationZ={-90} shader="defaults"
        type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5}
        uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false}
    />;
}

// --- LANGUAGE TOGGLE ---
const LangToggle = ({ lang, setLang }) => (
    <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: '30px', padding: '4px', border: '1px solid rgba(255,255,255,0.9)' }}>
        {['it', 'en'].map(l => (
            <button key={l} data-hover onClick={() => setLang(l)}
                style={{ padding: '7px 16px', borderRadius: '24px', border: 'none', background: lang === l ? '#085257' : 'transparent', color: lang === l ? '#fff' : '#085257', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}>
                {l}
            </button>
        ))}
    </motion.div>
);

// ============================================================
// COMPONENTE PRINCIPALE
// ============================================================
const GCerti = ({ lang: initialLang = 'it', goBack }) => {
    const [lang, setLang] = useState(initialLang);
    const t = GCERTI_LANG[lang];
    const { scrollY } = useScroll();

    const introOpacity = useTransform(scrollY, [0, 380], [1, 0]);
    const introBlur = useTransform(scrollY, [0, 380], ["blur(0px)", "blur(16px)"]);
    const introScale = useTransform(scrollY, [0, 380], [1, 0.94]);
    const introY = useTransform(scrollY, [0, 380], [0, -40]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Inietta Google Fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700;800&display=swap';
        document.head.appendChild(link);
        document.body.style.cursor = 'none';
        return () => { document.body.style.cursor = ''; };
    }, []);

    return (
        <div style={{ fontFamily: '"DM Sans", sans-serif', minHeight: '100vh' }}>
            <style>{`
                * { box-sizing: border-box; }
                ::selection { background: rgba(8,82,87,0.2); }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(8,82,87,0.3); border-radius: 3px; }
            `}</style>

            <CustomCursor />
            <ScrollProgress />

            {/* SFONDO FISSO */}
            <div style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
                <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                    <WaterGradient />
                </ShaderGradientCanvas>
            </div>

            {/* HEADER FISSO */}
            <motion.header initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button data-hover onClick={goBack} style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.9)', padding: '9px 20px', borderRadius: '30px', fontWeight: 700, fontSize: '0.8rem', cursor: 'none', color: '#085257', letterSpacing: '0.5px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s' }}>
                    {t['back']}
                </button>
                <LangToggle lang={lang} setLang={setLang} />
            </motion.header>

            {/* HERO ANIMATO */}
            <motion.div style={{ opacity: introOpacity, filter: introBlur, scale: introScale, y: introY, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '0 24px', position: 'relative', zIndex: 5 }}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                    style={{ fontSize: '0.72rem', fontWeight: 700, color: '#085257', letterSpacing: '4px', textTransform: 'uppercase', background: 'rgba(8,82,87,0.08)', padding: '7px 18px', borderRadius: '20px', border: '1px solid rgba(8,82,87,0.15)' }}>
                    Case Study
                </motion.div>
                <Typewriter text={t['title']} />
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
                    style={{ maxWidth: '580px', textAlign: 'center', fontSize: '1.05rem', color: '#444', lineHeight: 1.7, margin: 0 }}>
                    {t['subtitle']}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: '#085257', opacity: 0.5, textTransform: 'uppercase' }}>Scroll</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, #085257, transparent)' }} />
                </motion.div>
            </motion.div>

            {/* CONTENUTO SCROLL */}
            <div style={{ position: 'relative', zIndex: 10, paddingBottom: '120px' }}>

                {/* TAGLINE */}
                <section style={{ maxWidth: '1000px', margin: '0 auto 50px auto', padding: '4rem 2rem' }}>
                    <Reveal>
                        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', borderRadius: '28px', padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 900, color: '#085257', fontFamily: '"Playfair Display", serif', letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.2 }}>{t['role-title']}</h2>
                            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>{t['slogan']}</p>
                        </div>
                    </Reveal>
                </section>

                {/* PROBLEMA */}
                <section style={{ maxWidth: '1000px', margin: '0 auto 50px auto', padding: '0 2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', borderRadius: '28px', padding: 'clamp(1.5rem, 5vw, 3.5rem)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                        <Reveal>
                            <SectionLabel color="#ef4444">{t['problem-title']}</SectionLabel>
                            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#111', fontFamily: '"Playfair Display", serif', letterSpacing: '-0.5px', marginBottom: '2rem', marginTop: '8px' }}>{t['problem-desc']}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {t['problem-content'].map((item, i) => <ProblemCard key={i} {...item} index={i} />)}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* STRATEGIA — CARD FLIPPABILI */}
                <section style={{ maxWidth: '1000px', margin: '0 auto 50px auto', padding: '0 2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', borderRadius: '28px', padding: 'clamp(1.5rem, 5vw, 3.5rem)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                        <Reveal>
                            <SectionLabel>{t['strategy-title']}</SectionLabel>
                            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#111', fontFamily: '"Playfair Display", serif', letterSpacing: '-0.5px', marginBottom: '10px', marginTop: '8px' }}>{t['strategy-name']}</h3>
                            <p style={{ fontSize: '0.85rem', color: '#085257', opacity: 0.6, marginBottom: '2rem', letterSpacing: '0.5px' }}>← Click su ogni card per i dettagli</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                {t['strategy-pillars'].map((p, i) => <PillarCard key={i} {...p} index={i} />)}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ESECUZIONE */}
                <section style={{ maxWidth: '1000px', margin: '0 auto 50px auto', padding: '0 2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', borderRadius: '28px', padding: 'clamp(1.5rem, 5vw, 3.5rem)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                        <Reveal>
                            <SectionLabel>{t['execution-title']}</SectionLabel>
                            <ExecutionTimeline items={t['execution-items']} />
                        </Reveal>
                    </div>
                </section>

                {/* RISULTATI */}
                <section style={{ maxWidth: '1000px', margin: '0 auto 50px auto', padding: '0 2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', borderRadius: '28px', padding: 'clamp(1.5rem, 5vw, 3.5rem)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
                        <Reveal>
                            <SectionLabel>{t['results-title']}</SectionLabel>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginTop: '2rem' }}>
                                {t['results-stats'].map((stat, i) => <MetricCard key={i} {...stat} index={i} />)}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* KEY TAKEAWAY */}
                <section style={{ maxWidth: '1000px', margin: '0 auto 50px auto', padding: '0 2rem' }}>
                    <Reveal>
                        <motion.div data-hover whileHover={{ scale: 1.01 }} style={{ background: 'linear-gradient(135deg, #085257 0%, #0d8a94 100%)', borderRadius: '28px', padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)', position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                            {/* Decorazioni */}
                            <div style={{ position: 'absolute', top: -40, right: -40, width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                            <div style={{ position: 'absolute', bottom: -20, left: '20%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                            <SectionLabel color="rgba(255,255,255,0.6)">{t['takeaway-title']}</SectionLabel>
                            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', lineHeight: 1.8, fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', fontWeight: 500, margin: '16px 0 0 0', position: 'relative', zIndex: 2 }}>
                                "{t['takeaway-desc']}"
                            </p>
                        </motion.div>
                    </Reveal>
                </section>

                {/* FOOTER */}
                <footer style={{ textAlign: 'center', padding: 'clamp(2rem, 5vw, 4rem) 2rem 2rem', opacity: 0.5 }}>
                    <p style={{ color: '#085257', fontWeight: 600, letterSpacing: '1px', fontSize: '0.85rem' }}>© 2026 Angelo Russo — Strategic B2B Branding</p>
                </footer>
            </div>
        </div>
    );
};

export default GCerti;