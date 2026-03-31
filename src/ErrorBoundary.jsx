import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { motion } from 'framer-motion';

function WaterGradient() {
    return <ShaderGradient animate="on" axesHelper="off" bgColor1="#000000" bgColor2="#000000" brightness={1.2} cAzimuthAngle={180} cDistance={2.9} cPolarAngle={120} cameraZoom={1} color1="#ebedff" color2="#f3f2f8" color3="#dbf8ff" destination="onCanvas" embedMode="off" envPreset="city" format="gif" fov={45} frameRate={10} gizmoHelper="hide" grain="off" lightType="3d" pixelDensity={1} positionX={0} positionY={1.8} positionZ={0} range="disabled" reflection={0.1} rotationX={0} rotationY={0} rotationZ={-90} shader="defaults" type="waterPlane" uAmplitude={0} uDensity={1} uFrequency={5.5} uSpeed={0.3} uStrength={3} uTime={0.2} wireframe={false} />;
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary ha intercettato un errore:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="app-container">
                    <div className="gradient-bg">
                        <ShaderGradientCanvas style={{ width: '100%', height: '100%', pointerEvents: 'none' }} pixelDensity={1}>
                            <WaterGradient />
                        </ShaderGradientCanvas>
                    </div>

                    <div className="content-scroll-layer" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                        <header>
                            <button onClick={this.props.goBack ? this.props.goBack : () => window.location.reload()} className="lang-btn" style={{ padding: '8px 16px', width: 'auto' }}>
                                Indietro
                            </button>
                        </header>
                        
                        <section className="glass-section contact-section" style={{ maxWidth: '600px', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: '#111' }}>
                                    In Manutenzione
                                </h1>
                                <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: '2rem', lineHeight: '1.6' }}>
                                    Questa sezione è attualmente in fase di aggiornamento. <br/>
                                    Ritorna più tardi per scoprire le novità o ricontrolla tra poco.
                                </p>
                                
                                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <motion.button 
                                        onClick={this.props.goBack ? this.props.goBack : () => window.location.reload()}
                                        whileHover={{ scale: 1.05, backgroundColor: "#111", color: "#fff" }} 
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: '12px 24px',
                                            backgroundColor: 'transparent',
                                            color: '#111',
                                            border: '2px solid #111',
                                            borderRadius: '30px',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Torna alla Home
                                    </motion.button>
                                </div>
                            </motion.div>
                        </section>
                    </div>
                </div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
