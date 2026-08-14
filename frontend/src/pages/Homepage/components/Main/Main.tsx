import './Main.css';
import {CategorySection} from './CategorySection/CategorySection';
import {VideoSection} from './VideoSection/VideoSection';
import {ReleaseSection} from './NewsSection/NewsSection';
import {Newsletter} from './Newsletter/Newsletter'
import { useCarousel } from '../../../../hooks/useCarousel';
import {FilteredProducts} from './FilteredProducts/FilteredProducts'
import {AcessoriesSection} from './AcessoriesSection/AcessoriesSection'

import type { Product } from '../../../../context/ProductContext';

type MainProps = {
    readonly products: Product[];
};

export function Main({ products }: MainProps) {

    const displayedProducts = products;
    const displayedOversizedProducts = products.filter(p => p.modeling === 'Oversized');

    const newsCarousel = useCarousel({ totalItems: displayedProducts.length });
    const promoCarousel = useCarousel({ totalItems: displayedOversizedProducts.length });

        return(
		<div className="mt-10 mb-10 overflow-x-hidden ">
            <section className="mt-20 mx-4 lg:mx-30 ">
                <h2 className="text-center text-6xl lg:text-9xl font-bold mb-6">NOVIDADES</h2>
                <h3 className="text-center mb-6">A <span className="font-semibold">versatilidade</span> do lifestyle <span className="font-semibold">californiano</span> unida à tecnologia de ponta: conheça o caimento que redefiniu o conceito de essencial.</h3>
                <ReleaseSection
                    products={displayedProducts}
                    translateValue={newsCarousel.translateValue}
                    trackRef={newsCarousel.trackRef}
                    viewportRef={newsCarousel.viewportRef}
                    next={newsCarousel.next}
                    prev={newsCarousel.prev}
                />
            </section>

            <section className="mt-20 mx-4 lg:mx-30 ">
                <h2 className="text-center text-5xl lg:text-7xl font-bold mb-3">OVERSIZED</h2>
                <h3 className="text-center mb-6">Tecidos de <span className="font-semibold">alto padrão</span>, corte impecável e a essência pioneira que <span className="font-semibold">transformou</span> o cenário Oversized no fitness nacional.</h3>
                <FilteredProducts
                    products={displayedOversizedProducts}
                    translateValue={promoCarousel.translateValue}
                    trackRef={promoCarousel.trackRef}
                    viewportRef={promoCarousel.viewportRef}
                    next={promoCarousel.next}
                    prev={promoCarousel.prev}
                    filterType="oversized"
                ></FilteredProducts>
            </section>
            
            <section className="mt-20 mx-4 lg:mx-30 ">
                <CategorySection />
            </section>



            <section className="mt-20 w-screen mx-0">
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