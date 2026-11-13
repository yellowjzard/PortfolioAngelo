import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * InteractiveMarquee
 * - Scorrimento automatico continuo fluido (marquee).
 * - Supporto touch completo per mobile: swipe avanti e indietro con il dito (touch gestures bidirezionali).
 * - Supporto desktop completo: drag con mouse (grab/grabbing), hover pause (solo su dispositivi con cursore fine/mouse reale).
 * - Frecce di navigazione responsive:
 *   * Desktop: frecce fluttuanti laterali discrete.
 *   * Mobile: barra di navigazione dedicata in basso con pulsanti touch spaziosi e indicatore di scorrimento, evitando sovrapposizioni sgradevoli sulle cartelle.
 */
export default function InteractiveMarquee({
    children,
    speed = 0.65,
    className = '',
    itemGap = 46,
    showArrows = true,
    ariaLabel = 'Galleria a scorrimento interattivo'
}) {
    const containerRef = useRef(null);
    const groupARef = useRef(null);
    const isHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);
    const isTouchingRef = useRef(false);
    const isUserScrollingRef = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const startScrollLeftRef = useRef(0);
    const hasDraggedRef = useRef(false);
    const resumeTimerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [isGrabbing, setIsGrabbing] = useState(false);

    // Controlla se il dispositivo supporta un vero puntatore mouse (hover reale)
    const canHover = () => {
        if (typeof window === 'undefined') return true;
        return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    };

    // Gestione del wrap continuo (3 set identici: Set 1, Set 2 [centro], Set 3)
    const handleLoop = useCallback(() => {
        const container = containerRef.current;
        const group = groupARef.current;
        if (!container || !group) return;

        const singleWidth = group.offsetWidth;
        if (singleWidth <= 0) return;

        // Se supera Set 2 verso destra (entrando in Set 3), riavvolgi a Set 2
        if (container.scrollLeft >= singleWidth * 1.85) {
            container.scrollLeft -= singleWidth;
        } else if (container.scrollLeft <= singleWidth * 0.15) {
            // Se scorre all'indietro verso sinistra (entrando in Set 1), avanza a Set 2
            container.scrollLeft += singleWidth;
        }
    }, []);

    // Inizializza la posizione su Set 2 (centrale)
    useEffect(() => {
        const container = containerRef.current;
        const group = groupARef.current;
        if (!container || !group) return;

        const initPos = () => {
            const singleWidth = group.offsetWidth;
            if (singleWidth > 0 && container.scrollLeft === 0) {
                container.scrollLeft = singleWidth;
            }
        };

        initPos();
        const t = setTimeout(initPos, 80);
        window.addEventListener('resize', initPos);
        return () => {
            clearTimeout(t);
            window.removeEventListener('resize', initPos);
        };
    }, []);

    // Ticker di animazione continua
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const tick = () => {
            const container = containerRef.current;
            const group = groupARef.current;

            if (container && group) {
                const canAutoScroll =
                    !isHoveredRef.current &&
                    !isDraggingRef.current &&
                    !isTouchingRef.current &&
                    !isUserScrollingRef.current;

                if (canAutoScroll) {
                    container.scrollLeft += speed;
                    const singleWidth = group.offsetWidth;
                    if (singleWidth > 0 && container.scrollLeft >= singleWidth * 1.85) {
                        container.scrollLeft -= singleWidth;
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(tick);
        };

        animationFrameRef.current = requestAnimationFrame(tick);
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [speed]);

    // --- MOUSE DRAG (DESKTOP) ---
    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        const container = containerRef.current;
        if (!container) return;

        isDraggingRef.current = true;
        hasDraggedRef.current = false;
        startXRef.current = e.pageX;
        startScrollLeftRef.current = container.scrollLeft;
        setIsGrabbing(true);
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        const container = containerRef.current;
        if (!container) return;

        const delta = e.pageX - startXRef.current;
        if (Math.abs(delta) > 5) {
            hasDraggedRef.current = true;
        }
        container.scrollLeft = startScrollLeftRef.current - delta;
        handleLoop();
    };

    const handleMouseUp = () => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsGrabbing(false);
    };

    // --- TOUCH GESTURES (MOBILE / TABLET) ---
    const handleTouchStart = (e) => {
        const container = containerRef.current;
        if (!container || !e.touches || e.touches.length === 0) return;

        const touch = e.touches[0];
        startXRef.current = touch.clientX;
        startYRef.current = touch.clientY;
        startScrollLeftRef.current = container.scrollLeft;
        isTouchingRef.current = true;
        hasDraggedRef.current = false;
        isUserScrollingRef.current = true;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    const handleTouchMove = (e) => {
        if (!isTouchingRef.current) return;
        const container = containerRef.current;
        if (!container || !e.touches || e.touches.length === 0) return;

        const touch = e.touches[0];
        const dx = touch.clientX - startXRef.current;
        const dy = touch.clientY - startYRef.current;

        // Se il gesto è prevalentemente orizzontale, trascina il nastro
        if (Math.abs(dx) > Math.abs(dy)) {
            if (Math.abs(dx) > 6) {
                hasDraggedRef.current = true;
            }
            container.scrollLeft = startScrollLeftRef.current - dx;
            handleLoop();
        }
    };

    const handleTouchEnd = () => {
        isTouchingRef.current = false;
        // Riprendi l'auto-scroll dopo 2.5 secondi di inattività
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            isUserScrollingRef.current = false;
        }, 2500);
    };

    // Prevenzione click accidentale sui link interni durante drag/swipe
    const handleClickCapture = (e) => {
        if (hasDraggedRef.current) {
            e.stopPropagation();
            e.preventDefault();
            hasDraggedRef.current = false;
        }
    };

    // Pausa temporanea su wheel / scroll nativo
    const handleScroll = () => {
        handleLoop();
        if (!isTouchingRef.current && !isDraggingRef.current) {
            isUserScrollingRef.current = true;
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
            resumeTimerRef.current = setTimeout(() => {
                isUserScrollingRef.current = false;
            }, 1500);
        }
    };

    // Pulsanti Prev / Next (avanti / indietro)
    const handleScrollStep = (direction) => {
        const container = containerRef.current;
        const group = groupARef.current;
        if (!container || !group) return;

        const step = Math.min(300, group.offsetWidth / 3.2);
        container.scrollBy({
            left: direction * step,
            behavior: 'smooth'
        });

        isUserScrollingRef.current = true;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            isUserScrollingRef.current = false;
        }, 2000);
    };

    return (
        <div
            className={`interactive-marquee-wrapper ${className}`}
            style={{ position: 'relative', width: '100%' }}
            onMouseEnter={() => {
                if (canHover()) isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
                if (canHover()) {
                    isHoveredRef.current = false;
                    if (isDraggingRef.current) {
                        isDraggingRef.current = false;
                        setIsGrabbing(false);
                    }
                }
            }}
            aria-label={ariaLabel}
        >
            {/* Freccia Desktop Sinistra (Prev) */}
            {showArrows && (
                <button
                    type="button"
                    className="marquee-arrow-btn marquee-arrow-side marquee-arrow-prev"
                    onClick={() => handleScrollStep(-1)}
                    aria-label="Scorri indietro"
                    title="Scorri indietro"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
            )}

            {/* Contenitore scorrevole (Desktop drag + Mobile touch swipe nativo) */}
            <div
                ref={containerRef}
                className="interactive-marquee-scroll"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                onClickCapture={handleClickCapture}
                onScroll={handleScroll}
                style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    display: 'flex',
                    cursor: isGrabbing ? 'grabbing' : 'grab',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    touchAction: 'pan-x pan-y',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                <div
                    className="interactive-marquee-track"
                    style={{
                        display: 'flex',
                        width: 'max-content',
                        alignItems: 'flex-start'
                    }}
                >
                    {/* Set 1 */}
                    <div
                        ref={groupARef}
                        className="interactive-marquee-group"
                        style={{ display: 'flex', alignItems: 'flex-start', gap: `${itemGap}px`, paddingRight: `${itemGap}px` }}
                    >
                        {children}
                    </div>

                    {/* Set 2 (Centrale, posizione di partenza) */}
                    <div
                        className="interactive-marquee-group"
                        aria-hidden="true"
                        style={{ display: 'flex', alignItems: 'flex-start', gap: `${itemGap}px`, paddingRight: `${itemGap}px` }}
                    >
                        {children}
                    </div>

                    {/* Set 3 (Buffer infinito) */}
                    <div
                        className="interactive-marquee-group"
                        aria-hidden="true"
                        style={{ display: 'flex', alignItems: 'flex-start', gap: `${itemGap}px`, paddingRight: `${itemGap}px` }}
                    >
                        {children}
                    </div>
                </div>
            </div>

            {/* Freccia Desktop Destra (Next) */}
            {showArrows && (
                <button
                    type="button"
                    className="marquee-arrow-btn marquee-arrow-side marquee-arrow-next"
                    onClick={() => handleScrollStep(1)}
                    aria-label="Scorri avanti"
                    title="Scorri avanti"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            )}

            {/* Barra Controlli Dedicata per Mobile (visibile solo su mobile/tablet, evita sovrapposizioni) */}
            {showArrows && (
                <div className="marquee-mobile-controls" aria-label="Controlli di scorrimento">
                    <button
                        type="button"
                        className="marquee-mobile-btn"
                        onClick={() => handleScrollStep(-1)}
                        aria-label="Scorri indietro"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <div className="marquee-mobile-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="7 17 2 12 7 7" />
                            <polyline points="17 7 22 12 17 17" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                        </svg>
                        <span>Scorri con il dito</span>
                    </div>
                    <button
                        type="button"
                        className="marquee-mobile-btn"
                        onClick={() => handleScrollStep(1)}
                        aria-label="Scorri avanti"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
