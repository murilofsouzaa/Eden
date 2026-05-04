import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './Main.css';
import {CategorySection} from './CategorySection/CategorySection';
import {VideoSection} from './VideoSection/VideoSection';
import {ReleaseSection} from './NewsSection/NewsSection';
import { api } from '../../../../services/api';

import type { Product } from '../../../../context/ProductContext';

type Bundle = {
    id: number;
    name: string;
};

type MainProps = {
    readonly products: Product[];
};

export function Main({ products }: MainProps) {

    const [bundles, setBundles] = useState<Bundle[]>([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    // Guardamos métricas da vitrine para deslocar exatamente um produto por clique
    
        const [slideWidth, setSlideWidth] = useState(0);
        const [viewportWidth, setViewportWidth] = useState(0);
        const trackRef = useRef<HTMLDivElement | null>(null);
        const viewportRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        api.get<Bundle[]>('/api/bundles')
            .then((response) => {
                setBundles(response.data);
            })
            .catch(() => {
                setBundles([]);
            });
    }, []);

        const selectedBundle = useMemo(() => {
            if (bundles.length === 0) return null;

            const bundlesWithProducts = bundles.filter((bundle) =>
                products.some((product) => product.bundleId === bundle.id)
            );

            if (bundlesWithProducts.length === 0) return null;

            return bundlesWithProducts
                .slice()
                .sort((a, b) => b.id - a.id)[0];
        }, [bundles, products]);

        const productsBySelectedBundle = useMemo(() => {
            if (!selectedBundle) return [];

            return products.filter((product) => product.bundleId === selectedBundle.id);
        }, [products, selectedBundle]);

        const displayedProducts = productsBySelectedBundle.slice(0, 7);
        const totalItems = displayedProducts.length;
        
    const next = () => {
        if (totalItems === 0) return;
        setCurrentIndex((currentIndex) => Math.min(currentIndex + 1, maxIndex));
    };
    
    const prev = () => {
        if (totalItems === 0) return;
        setCurrentIndex((currentIndex) => Math.max(currentIndex - 1, 0));
    };
    // Cada clique desloca exatamente a largura de um card (positivo para esquerda, por isso o sinal negativo)
    
    // Calcula quantos cards cabem de uma vez no viewport para limitar o índice máximo
    const slidesPerView = useMemo(() => {
        if (slideWidth === 0 || viewportWidth === 0) return 1;
        return Math.max(Math.floor(viewportWidth / slideWidth), 1);
    }, [slideWidth, viewportWidth]);


    const maxIndex = Math.max(totalItems - slidesPerView, 0);

    const safeIndex = Math.min(currentIndex, maxIndex);
    const translateValue = -(safeIndex * slideWidth);

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
        return () => window.removeEventListener('resize', updateMetrics);
    }, [updateMetrics, totalItems]);

        return(
		<div className="mx-4 mt-10 mb-10 lg:m-16">
            <h2 className="text-2xl font-bold mb-6">{selectedBundle?.name ?? 'NOVIDADES'}</h2>

            <section>
                <ReleaseSection
                    products={displayedProducts}
                    translateValue={translateValue}
                    trackRef={trackRef}
                    viewportRef={viewportRef}
                    next={next}
                    prev={prev}
                />
            </section>

            <section className="mt-20">
                <CategorySection />
            </section>

            <section className="mt-20 -mx-4 lg:-mx-16">
                <VideoSection />
            </section>

            
                    
        </div>

    )
}