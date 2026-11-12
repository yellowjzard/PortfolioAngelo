import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * InteractiveMarquee
 * Combina scorrimento automatico continuo fluido (marquee), pausa su hover,
 * e piena interattività manuale: drag con mouse, swipe touch su mobile,
 * scorrimento orizzontale con rotellina/trackpad, e pulsanti freccia prev/next.
 */
export default function InteractiveMarquee({
    children,
    speed = 0.65, // pixel per frame
    className = '',
    itemGap = 46, // gap in pixel
    showArrows = true,
    ariaLabel = 'Galleria a scorrimento interattivo'
}) {
    const containerRef = useRef(null);
    const groupARef = useRef(null);
    const isHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);
    const isUserScrollingRef = useRef(false);
    const startXRef = useRef(0);
    const startScrollLeftRef = useRef(0);
    const hasDraggedRef = useRef(false);
    const resumeTimerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [isGrabbing, setIsGrabbing] = useState(false);

    // Gestione del wrap infinito senza scatti
    const handleLoop = useCallback(() => {
        const container = containerRef.current;
        const group = groupARef.current;
        if (!container || !group) return;

        const singleWidth = group.offsetWidth;
        if (singleWidth <= 0) return;

        // Se supera 2 set completi, riavvolgi di un set
        if (container.scrollLeft >= singleWidth * 2) {
            container.scrollLeft -= singleWidth;
        } else if (container.scrollLeft <= singleWidth * 0.1) {
            // Se scorre troppo a sinistra, aggiungi un set
            container.scrollLeft += singleWidth;
        }
    }, []);

    // Inizializzazione posizione al set centrale (Set 2)
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

        // Esegui subito e dopo un frame per garantire il render dei font/svg
        initPos();
        const t = setTimeout(initPos, 100);
        window.addEventListener('resize', initPos);
        return () => {
            clearTimeout(t);
            window.removeEventListener('resize', initPos);
        };
    }, []);

    // Loop di animazione per il marquee continuo
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const tick = () => {
            const container = containerRef.current;
            const group = groupARef.current;

            if (container && group) {
                const canAutoScroll = !isHoveredRef.current && !isDraggingRef.current && !isUserScrollingRef.current;
                if (canAutoScroll) {
                    container.scrollLeft += speed;
                    const singleWidth = group.offsetWidth;
                    if (singleWidth > 0 && container.scrollLeft >= singleWidth * 2) {
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

    // Gestione Drag con Mouse
    const handleMouseDown = (e) => {
        // Solo pulsante sinistro
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

    // Prevenzione click accidentale sui link/bottoni interni se l'utente ha trascinato
    const handleClickCapture = (e) => {
        if (hasDraggedRef.current) {
            e.stopPropagation();
            e.preventDefault();
            hasDraggedRef.current = false;
        }
    };

    // Pausa temporanea su wheel / scroll touch manuale
    const handleScroll = () => {
        handleLoop();
        isUserScrollingRef.current = true;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            isUserScrollingRef.current = false;
        }, 1200);
    };

    // Frecce Prev / Next
    const handleScrollStep = (direction) => {
        const container = containerRef.current;
        const group = groupARef.current;
        if (!container || !group) return;

        const step = Math.min(320, group.offsetWidth / 3);
        container.scrollBy({
            left: direction * step,
            behavior: 'smooth'
        });

        // Pausa temporanea per consentire lo scorrimento fluido
        isUserScrollingRef.current = true;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            isUserScrollingRef.current = false;
        }, 1500);
    };

    return (
        <div
            className={`interactive-marquee-wrapper ${className}`}
            style={{ position: 'relative', width: '100%' }}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => {
                isHoveredRef.current = false;
                if (isDraggingRef.current) {
                    isDraggingRef.current = false;
                    setIsGrabbing(false);
                }
            }}
            aria-label={ariaLabel}
        >
            {/* Freccia Sinistra (Prev) */}
            {showArrows && (
                <button
                    type="button"
                    className="marquee-arrow-btn marquee-arrow-prev"
                    onClick={() => handleScrollStep(-1)}
                    aria-label="Scorri indietro"
                    title="Scorri indietro"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
            )}

            {/* Contenitore scorrevole */}
            <div
                ref={containerRef}
                className="interactive-marquee-scroll"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClickCapture={handleClickCapture}
                onScroll={handleScroll}
                style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    display: 'flex',
                    cursor: isGrabbing ? 'grabbing' : 'grab',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    touchAction: 'pan-y',
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

                    {/* Set 2 (Centrale, punto di partenza iniziale) */}
                    <div
                        className="interactive-marquee-group"
                        aria-hidden="true"
                        style={{ display: 'flex', alignItems: 'flex-start', gap: `${itemGap}px`, paddingRight: `${itemGap}px` }}
                    >
                        {children}
                    </div>

                    {/* Set 3 (Buffer destro per scorrimento infinito continuo) */}
                    <div
                        className="interactive-marquee-group"
                        aria-hidden="true"
                        style={{ display: 'flex', alignItems: 'flex-start', gap: `${itemGap}px`, paddingRight: `${itemGap}px` }}
                    >
                        {children}
                    </div>
                </div>
            </div>

            {/* Freccia Destra (Next) */}
            {showArrows && (
                <button
                    type="button"
                    className="marquee-arrow-btn marquee-arrow-next"
                    onClick={() => handleScrollStep(1)}
                    aria-label="Scorri avanti"
                    title="Scorri avanti"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            )}
        </div>
    );
}
