import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

//TODO DIVIDA TECNICA

export interface CarouselState {
    currentIndex: number;
    slideWidth: number;
    viewportWidth: number;
    trackRef: React.RefObject<HTMLDivElement | null>;
    viewportRef: React.RefObject<HTMLDivElement | null>;
    slidesPerView: number;
    maxIndex: number;
    safeIndex: number;
    translateValue: number;
    next: () => void;
    prev: () => void;
}

interface UseCarouselProps {
    totalItems: number;
    onUpdateMetrics?: () => void;
}

export function useCarousel({ totalItems }: UseCarouselProps): CarouselState {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);

    const slidesPerView = useMemo(() => {
        if (slideWidth === 0 || viewportWidth === 0) return 1;
        return Math.max(Math.floor(viewportWidth / slideWidth), 1);
    }, [slideWidth, viewportWidth]);

    const maxIndex = Math.max(totalItems - slidesPerView, 0);
    const safeIndex = Math.min(currentIndex, maxIndex);
    const translateValue = -(safeIndex * slideWidth);

    const next = () => {
        if (totalItems === 0) return;
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prev = () => {
        if (totalItems === 0) return;
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const updateMetrics = useCallback(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;

        const firstSlide = track.querySelector<HTMLElement>('[data-slide="true"]');
        if (!firstSlide) return;

        const styles = globalThis.getComputedStyle(track);
        const gapValue = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;

        setSlideWidth(firstSlide.offsetWidth + gapValue);
        setViewportWidth(viewport.offsetWidth);
    }, []);

    useEffect(() => {
        updateMetrics();
        window.addEventListener('resize', updateMetrics);
        return () => {
            window.removeEventListener('resize', updateMetrics);
        };
    }, [updateMetrics, totalItems]);

    return {
        currentIndex,
        slideWidth,
        viewportWidth,
        trackRef,
        viewportRef,
        slidesPerView,
        maxIndex,
        safeIndex,
        translateValue,
        next,
        prev,
    };
}
