import './Main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

import { CategorySection } from './CategorySection/CategorySection';
import { VideoSection } from './VideoSection/VideoSection';
import { ReleaseSection } from './NewsSection/NewsSection';
import { Newsletter } from './Newsletter/Newsletter';
import { useCarousel } from '../../../../hooks/useCarousel';
import { FilteredProducts } from './FilteredProducts/FilteredProducts';
import { AcessoriesSection } from './AcessoriesSection/AcessoriesSection';

import type { Product } from '../../../../context/ProductContext';

// Registre o plugin fora do componente
gsap.registerPlugin(ScrollTrigger);

type MainProps = {
    readonly products: Product[];
};

export function Main({ products }: MainProps) {
    const mainRef = useRef<HTMLDivElement>(null)
    const releaseSectionRef = useRef<HTMLDivElement>(null);
    const oversizedSectionRef = useRef<HTMLDivElement>(null);

    const displayedProducts = products;
    const displayedOversizedProducts = products.filter(p => p.modeling === 'Oversized');

    const newsCarousel = useCarousel({ totalItems: displayedProducts.length });
    const promoCarousel = useCarousel({ totalItems: displayedOversizedProducts.length });

    useLayoutEffect(() => { //Somente roda o código abaixo, quando estiver tudo renderizado
        if (!products || products.length === 0) return; 
        // Usa o contexto do GSAP para limpar automaticamente animações ao desmontar
        const ctx = gsap.context(() => {
            gsap.to(releaseSectionRef.current, {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: releaseSectionRef.current,
                    start: "top 90%", 
                    end: "top 20%",
                    scrub: 2.5
                }
            });

            gsap.to(oversizedSectionRef.current, {
                x: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger:{
                    trigger: oversizedSectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 3
                }
            })
        }, mainRef);

        return () => ctx.revert(); // Cleanup limpo para React
    }, [products]);


    return (
        <div ref={mainRef} className="mt-10 mb-10 overflow-x-hidden">
            <section className="release-section mx-3 lg:mx-30">
                <h2 className="text-center text-4xl lg:text-9xl font-bold mb-6">NOVIDADES</h2>
                <h3 className="text-center mb-6 text-sm lg:text-lg">
                    A <span className="font-semibold">versatilidade</span> do lifestyle <span className="font-semibold">californiano</span> unida à tecnologia de ponta: conheça o caimento que redefiniu o conceito de essencial.
                </h3>
                <div ref={releaseSectionRef} className="opacity-20 translate-y-25">
                    <ReleaseSection
                        products={displayedProducts}
                        translateValue={newsCarousel.translateValue}
                        trackRef={newsCarousel.trackRef}
                        viewportRef={newsCarousel.viewportRef}
                        next={newsCarousel.next}
                        prev={newsCarousel.prev}
                    />
                </div>
            </section>

            <section className="mt-20 mx-4 lg:mx-30 ">
                <h2 className="text-center text-4xl lg:text-7xl font-bold mb-3">OVERSIZED</h2>
                <h3 className="text-center mb-6">Tecidos de <span className="font-semibold">alto padrão</span>, corte impecável e a essência pioneira que <span className="font-semibold">transformou</span> o cenário Oversized no fitness nacional.</h3>
                <div ref={oversizedSectionRef} className="opacity-0 translate-x-0 lg:-translate-x-100">
                    <FilteredProducts
                        products={displayedOversizedProducts}
                        translateValue={promoCarousel.translateValue}
                        trackRef={promoCarousel.trackRef}
                        viewportRef={promoCarousel.viewportRef}
                        next={promoCarousel.next}
                        prev={promoCarousel.prev}
                        filterType="oversized"
                    ></FilteredProducts>
                </div>
            </section>
            
            <section className="mt-20 mx-4 lg:mx-30 ">
                <CategorySection />
            </section>

            <section className="mt-20 w-full mx-0">
                <VideoSection />
            </section>

            <section className="mx-4 lg:mx-30 ">
                <AcessoriesSection />
            </section>

            <section className="mt-20 px-4 flex w-full items-center justify-center overflow-x-hidden">
                <Newsletter></Newsletter>
            </section>


            
                    
        </div>

    )
}