// --- COMPONENTE MOCKUP 3D PER PANAFGEO CON TESTO CORRETTO ---
const BrandGuidelines3D = ({ file, coverImg, t }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    // Testo specifico per PanAfgeo (basato sulla tua proposal)
    const panAfgeoText = {
        it: {
            title: "PANAFGEO",
            subtitle: "EU Branding Guidelines",
            description: "Sviluppo dell'identità visiva per il progetto PanAfgeo, conforme alle linee guida dell'Unione Europea. Il documento include specifiche per brand identity, griglie editoriali, applicazioni su supporti fisici e digitali per le campagne istituzionali."
        },
        en: {
            title: "PANAFGEO",
            subtitle: "EU Branding Guidelines",
            description: "Development of visual identity for the PanAfgeo project, compliant with European Union guidelines. The document includes specifications for brand identity, editorial grids, applications on physical and digital supports for institutional campaigns."
        }
    };
    
    const currentText = lang === 'it' ? panAfgeoText.it : panAfgeoText.en;
    
    return (
        <div style={{
            perspective: '2000px',
            marginTop: '40px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <motion.div
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    aspectRatio: '16/11',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer'
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                onClick={() => setIsFlipped(!isFlipped)}
                whileHover={{ scale: 1.02 }}
            >
                {/* Fronte - Copertina del PDF */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <img
                        src={coverImg}
                        alt="PanAfgeo Brand Guidelines Cover"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                        }}
                    />
                    
                    {/* Overlay con titolo PanAfgeo */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '30px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                        color: 'white'
                    }}>
                        <h3 style={{
                            margin: 0,
                            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                            fontWeight: 700,
                            fontFamily: 'Unbounded, sans-serif'
                        }}>
                            {currentText.title}
                        </h3>
                        <p style={{
                            opacity: 0.8,
                            margin: '5px 0 0',
                            fontSize: 'clamp(0.8rem, 1.5vw, 1rem)'
                        }}>
                            {currentText.subtitle}
                        </p>
                    </div>
                    
                    {/* Hint visivo per girare */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        padding: '8px 15px',
                        borderRadius: '30px',
                        color: 'white',
                        fontSize: '0.8rem',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        {t['flip-hint']} ↻
                    </div>
                </motion.div>
                
                {/* Retro - Download con descrizione PanAfgeo */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '15px',
                        padding: '30px',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
                    }}
                >
                    {/* Icona PDF animata */}
                    <motion.div
                        animate={{ 
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            fontSize: '4rem',
                            filter: 'drop-shadow(0 10px 20px rgba(255,107,66,0.3))'
                        }}
                    >
                        📄
                    </motion.div>
                    
                    <h3 style={{
                        color: 'white',
                        margin: 0,
                        fontSize: '1.5rem',
                        fontFamily: 'Unbounded, sans-serif',
                        textAlign: 'center'
                    }}>
                        {currentText.title}
                    </h3>
                    
                    {/* Descrizione specifica PanAfgeo */}
                    <p style={{
                        color: 'rgba(255,255,255,0.9)',
                        textAlign: 'center',
                        maxWidth: '400px',
                        margin: '10px 0',
                        lineHeight: '1.6',
                        fontSize: '0.95rem'
                    }}>
                        {currentText.description}
                    </p>
                    
                    {/* Dettagli aggiuntivi dal case study */}
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        marginTop: '5px',
                        marginBottom: '10px'
                    }}>
                        <span style={{
                            padding: '4px 12px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            color: '#ff6b42',
                            fontSize: '0.8rem'
                        }}>
                            EU Guidelines
                        </span>
                        <span style={{
                            padding: '4px 12px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            color: '#ff6b42',
                            fontSize: '0.8rem'
                        }}>
                            Institutional Design
                        </span>
                    </div>
                    
                    <motion.a
                        href={file}
                        download
                        style={{
                            padding: '15px 40px',
                            background: '#ff6b42',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '40px',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '10px',
                            boxShadow: '0 10px 20px rgba(255,107,66,0.3)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                        whileHover={{ 
                            scale: 1.05,
                            background: '#ff8259',
                            boxShadow: '0 15px 30px rgba(255,107,66,0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        {t['download-pdf']}
                    </motion.a>
                    
                    <p style={{
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: '0.75rem',
                        marginTop: '15px'
                    }}>
                        {t['flip-hint']} per tornare alla copertina
                    </p>
                </motion.div>
            </motion.div>
            
            {/* Indicatore di interazione */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                    marginTop: '20px',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }}
            >
                <span>👆</span>
                <span>Clicca sul mockup per esplorare le PanAfgeo Guidelines</span>
            </motion.div>
        </div>
    );
};
