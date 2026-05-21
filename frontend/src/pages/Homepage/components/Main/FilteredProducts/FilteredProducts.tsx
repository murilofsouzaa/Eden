import {Link} from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'react-feather';
import type { RefObject } from 'react';
import type {Product} from '../../../../../context/ProductContext';
import PriceOffLabel from '../../../../../components/ui/PriceOffLabel'
import emptyBox from '../../../../../../public/icons/empty-box.png'


type FilteredProductsProps = {
    readonly products: Product[];
    readonly translateValue: number;
    readonly trackRef: RefObject<HTMLDivElement | null>;
    readonly viewportRef: RefObject<HTMLDivElement | null>;
    readonly prev: () => void;
    readonly next: () => void;
    readonly filterType?: 'oversized' | 'accessories';
};

export function FilteredProducts({
    products,
    translateValue,
    trackRef,
    viewportRef,
    prev,
    next,
    filterType = 'oversized',
}: FilteredProductsProps) {
    const totalItems = products.length;

    return (
        <section className="relative">
            <div className="overflow-hidden border-b border-b-gray-300 py-10" ref={viewportRef}>
                <div
                    ref={trackRef}
                    className="flex flex-nowrap gap-5 transition-transform duration-500 ease-out"
                    style={{transform: `translateX(${translateValue}px)`}}
                >
                    {products.map((product: Product) => {
                        const variants = product.variants ?? [];
                        const defaultVariant = variants.find((variant) => variant.defaultVariant);
                        const variantToShow = defaultVariant ?? variants[0];
                        
                        const shouldShow = filterType === 'accessories' ? true : product.modeling === 'Oversized';
                        
                        return (
                            <div key={product.id} data-slide="true">
                                {variantToShow && shouldShow && (
                                    <div className="flex flex-col justify-start items-start shrink-0 w-64 sm:w-72 md:w-80">
                                        <Link to={`/product/${product.id}`}>
                                            <button type="button" className="hover:cursor-pointer">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.title}
                                                    className="product-image-catalog object-cover w-full h-96 lg:h-144"
                                                />
                                            </button>
                                        </Link>

                                            <p className="mt-2 text-md">{product.title}</p>
                                            {variantToShow?.price != null && (
                                                <div>
                                                    <div>
                                                        {product.discountPercentage > 0 ? (
                                                            <p className={`mt-1 text-black/50 line-through `}>R${variantToShow?.price.toFixed(2)}</p>
                                                        ):
                                                            <p className={`font-semibold mt-1 text-black`}>R${variantToShow?.price.toFixed(2)}</p>
                                                        }
                                                        {product.discountPercentage > 0 && (
                                                            <div className="flex justify-center items-center gap-3">
                                                                <label className="text-md font-semibold text-green-600">R$ { (variantToShow.price - (variantToShow.price * product.discountPercentage/100)).toFixed(2).toString().replace(".", ",")}</label>
                                                                <PriceOffLabel defaultVariant={variantToShow} selectedProduct={product}/>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="w-full">
                    <Link to="/products?type=modeling&value=Oversized" className="block w-full">
                        <p className="text-end mt-10 font-semibold underline hover:cursor-pointer">Ver todos</p>
                    </Link>
                </div>

                {totalItems === 0 && (
                    <div className="flex justify-center items-center m-10">
                        <div className="bg-gray-100 p-4 flex flex-col justify-center items-center rounded-4xl lg:w-[40%]">
                            <img src={emptyBox} alt="empty-box.png" className="opacity-20 h-30 w-auto"></img>
                            <p className="p-4 text-sm text-center w-full text-gray-500">Nenhum produto em acessórios</p>
                        </div>
                    </div>
                )}
            </div>
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
        </section>
    );
}