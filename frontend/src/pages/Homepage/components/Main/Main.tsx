import './Main.css';
import {CategorySection} from './CategorySection/CategorySection';
import {VideoSection} from './VideoSection/VideoSection';
import {ReleaseSection} from './NewsSection/NewsSection';
import {Promotion} from './ModelingSection/ModelingSection'
import {Newsletter} from './Newsletter/Newsletter'
import { useCarousel } from '../../../../hooks/useCarousel';
import { useBundles } from '../../../../hooks/useBundles';
import { useProductsFilter } from '../../../../hooks/useProductsFilter';

import type { Product } from '../../../../context/ProductContext';

type MainProps = {
    readonly products: Product[];
};

export function Main({ products }: MainProps) {
    // Bundles logic
    const { selectedBundle, displayedProducts } = useBundles(products);

    // News carousel
    const newsCarousel = useCarousel({ totalItems: displayedProducts.length });

    // Oversized products filter
    const { displayedProducts: displayedOversizedProducts } = useProductsFilter({
        products,
        filter: (product) => product?.modeling === 'Oversized',
        limit: 7,
    });

    // Oversized carousel
    const promoCarousel = useCarousel({ totalItems: displayedOversizedProducts.length });


        return(
		<div className="mx-4 mt-10 mb-10 lg:m-16">
            <section className="mt-20">
                <h2 className="text-center text-5xl font-bold mb-6">{selectedBundle?.name ?? 'NOVIDADES'}</h2>
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

            <section className="mt-40">
                <h2 className="text-center text-4xl font-bold mb-3">Oversized</h2>
                <h3 className="text-center mb-6">Tecidos de <span className="font-semibold">alto padrão</span>, corte impecável e a essência pioneira que <span className="font-semibold">transformou</span> o cenário Oversized no fitness nacional.</h3>
                <Promotion
                    products={displayedOversizedProducts}
                    translateValue={promoCarousel.translateValue}
                    trackRef={promoCarousel.trackRef}
                    viewportRef={promoCarousel.viewportRef}
                    next={promoCarousel.next}
                    prev={promoCarousel.prev}
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