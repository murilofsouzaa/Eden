import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './Main.css';
import {CategorySection} from './CategorySection/CategorySection';
import {VideoSection} from './VideoSection/VideoSection';
import {ReleaseSection} from './NewsSection/NewsSection';
import {Promotion} from './ModelingSection/ModelingSection'
import {Newsletter} from './Newsletter/Newsletter'
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

    // Estado e refs para NewsSection
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);

    // Estado e refs separados para Promotion
    const [currentIndexPromo, setCurrentIndexPromo] = useState(0);
    const [slideWidthPromo, setSlideWidthPromo] = useState(0);
    const [viewportWidthPromo, setViewportWidthPromo] = useState(0);
    const trackRefPromo = useRef<HTMLDivElement | null>(null);
    const viewportRefPromo = useRef<HTMLDivElement | null>(null);
    
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

    // Cálculos para Promotion
    const promoProducts = products.filter((product) => (product.discountPercentage ?? 0) > 0).slice(0, 10);
    const totalItemsPromo = promoProducts.length;
    
    const slidesPerViewPromo = useMemo(() => {
        if (slideWidthPromo === 0 || viewportWidthPromo === 0) return 1;
        return Math.max(Math.floor(viewportWidthPromo / slideWidthPromo), 1);
    }, [slideWidthPromo, viewportWidthPromo]);

    const maxIndexPromo = Math.max(totalItemsPromo - slidesPerViewPromo, 0);
    const safeIndexPromo = Math.min(currentIndexPromo, maxIndexPromo);
    const translateValuePromo = -(safeIndexPromo * slideWidthPromo);

    const nextPromo = () => {
        if (totalItemsPromo === 0) return;
        setCurrentIndexPromo((current) => Math.min(current + 1, maxIndexPromo));
    };

    const prevPromo = () => {
        if (totalItemsPromo === 0) return;
        setCurrentIndexPromo((current) => Math.max(current - 1, 0));
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

    const updateMetricsPromo = useCallback(() => {
        const track = trackRefPromo.current;
        const viewport = viewportRefPromo.current;
        if (!track || !viewport) return;

        const firstSlide = track.querySelector<HTMLElement>('[data-slide="true"]');
        if (!firstSlide) return;

        const styles = globalThis.getComputedStyle(track);
        const gapValue = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;

        setSlideWidthPromo(firstSlide.offsetWidth + gapValue);
        setViewportWidthPromo(viewport.offsetWidth);
    }, []);

    useEffect(() => {
        updateMetrics();
        updateMetricsPromo();
        window.addEventListener('resize', updateMetrics);
        window.addEventListener('resize', updateMetricsPromo);
        return () => {
            window.removeEventListener('resize', updateMetrics);
            window.removeEventListener('resize', updateMetricsPromo);
        };
    }, [updateMetrics, updateMetricsPromo, totalItems, totalItemsPromo]);

    const oversizedProducts = products.filter((product) => product?.modeling === 'Oversized');
    const displayedOversizedProducts = oversizedProducts.slice(0,7)


        return(
		<div className="mx-4 mt-10 mb-10 lg:m-16">
            <section className="mt-20">
                <h2 className="text-center text-5xl font-bold mb-6">{selectedBundle?.name ?? 'NOVIDADES'}</h2>
                <h3 className="text-center mb-6">A <span className="font-semibold">versatilidade</span> do lifestyle <span className="font-semibold">californiano</span> unida à tecnologia de ponta: conheça o caimento que redefiniu o conceito de essencial.</h3>
                <ReleaseSection
                    products={displayedProducts}
                    translateValue={translateValue}
                    trackRef={trackRef}
                    viewportRef={viewportRef}
                    next={next}
                    prev={prev}
                />
            </section>

            <section className="mt-40">
                <h2 className="text-center text-4xl font-bold mb-3">Oversized</h2>
                <h3 className="text-center mb-6">Tecidos de <span className="font-semibold">alto padrão</span>, corte impecável e a essência pioneira que <span className="font-semibold">transformou</span> o cenário Oversized no fitness nacional.</h3>
                <Promotion
                    products={displayedOversizedProducts}
                    translateValue={translateValuePromo}
                    trackRef={trackRefPromo}
                    viewportRef={viewportRefPromo}
                    next={nextPromo}
                    prev={prevPromo}
                ></Promotion>
            </section>
            
            <section className="mt-20">
                <CategorySection />
            </section>


            <section className="mt-20 -mx-4 lg:-mx-16">
                <VideoSection />
            </section>

            <section className="overflow-hidden mt-20 flex justify-center items-center">
                <Newsletter></Newsletter>
            </section>

            
                    
        </div>

    )
}