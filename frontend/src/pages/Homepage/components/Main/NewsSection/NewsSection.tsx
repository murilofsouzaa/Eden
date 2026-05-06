import {Link} from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'react-feather';
import type { MutableRefObject } from 'react';
import type {Product} from '../../../../../context/ProductContext';
import PriceOffLabel from '../../../../../components/ui/PriceOffLabel'

type ReleaseSectionProps = {
    readonly products: Product[];
    readonly translateValue: number;
    readonly trackRef: MutableRefObject<HTMLDivElement | null>;
    readonly viewportRef: MutableRefObject<HTMLDivElement | null>;
    readonly prev: () => void;
    readonly next: () => void;
};

export function ReleaseSection({
    products,
    translateValue,
    trackRef,
    viewportRef,
    prev,
    next,
}: ReleaseSectionProps) {
    const totalItems = products.length;

    return (
        <section className="relative">
            {products.length == 0 ? (
                <div className="p-4 text-sm text-gray-500">Nenhum produto em novidades</div>
            ):(
                <div>
                    <div className="overflow-hidden" ref={viewportRef}>
                        <div
                            ref={trackRef}
                            className="flex flex-nowrap gap-5 transition-transform duration-500 ease-out"
                            style={{transform: `translateX(${translateValue}px)`}}
                        >
                            {products.map((product: Product) => {
                                const variants = product.variants ?? [];
                                const defaultVariant = variants.find((variant) => variant.defaultVariant);
                                const variantToShow = defaultVariant ?? variants[0];
                                return (
                                    <div key={product.id} data-slide="true">
                                        {variantToShow && variantToShow?.stock > 0 && (
                                            <div className="flex flex-col justify-start items-start shrink-0 w-64 sm:w-72 md:w-80">
                                                <Link to={`/product/${product.id}`}>
                                                    <button type="button" className="hover:cursor-pointer">
                                                        <img
                                                            src={`/${product.imageUrl}`}
                                                            alt={product.title}
                                                            className="product-image-catalog object-cover w-full h-96 lg:h-144"
                                                        />
                                                    </button>
                                                </Link>
                                                    <p className="mt-2 text-md">{product.title}</p>
                                                    {variantToShow?.price !== undefined && variantToShow?.price !== null && (
                                                        <div className="flex gap-3 justify-center">
                                                            <div>
                                                                <p className="text-md font-light line-through text-black/60 ">R$ {variantToShow.price.toFixed(2).toString().replace(".", ",")}</p>
                                                                <p className="text-md font-semibold text-green-600/80">R$ {( variantToShow.price -  (product.discountPercentage/100) * variantToShow.price).toFixed(2).toString().replace(".", ",")}</p>
                                                            </div>
                                                            <div className="">
                                                                <PriceOffLabel defaultVariant={variantToShow} selectedProduct={product}/>   
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        {totalItems > 0 && (
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
                                <button
                                    onClick={prev}
                                    aria-label="Item anterior"
                                    className="pointer-events-auto p-3 rounded-full shadow bg-black hover:invert hover:cursor-pointer "
                                >
                                    <ChevronLeft className="invert w-auto h-5 duration-100 hover:scale-110" />
                                </button>
                                <button
                                    onClick={next}
                                    aria-label="Próximo item"
                                    className="pointer-events-auto p-3 rounded-full shadow hover:invert bg-black hover:cursor-pointer "
                                >
                                    <ChevronRight className="invert w-auto h-5 duration-100 hover:scale-110" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}