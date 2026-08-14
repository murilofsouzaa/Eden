import {Link} from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useRef } from 'react';
import type { RefObject } from 'react';
import PriceOffLabel from '../../../../../components/ui/PriceOffLabel'
import emptyBox from '../../../../../../public/icons/empty-box.png'

type SuggestionVariant = {
    price: number;
    stock: number;
    defaultVariant?: boolean;
};

export type SuggestionItem = {
    id: number;
    title: string;
    imageUrl: string;
    discountPercentage: number;
    variants?: SuggestionVariant[];
};

type ProductSuggestionProps = {
    readonly products?: SuggestionItem[];
    readonly translateValue?: number;
    readonly trackRef?: RefObject<HTMLDivElement | null>;
    readonly viewportRef?: RefObject<HTMLDivElement | null>;
    readonly prev?: () => void;
    readonly next?: () => void;
    readonly getHref?: (id: number) => string;
};

export function ProductSuggestion({
    products = [],
    translateValue = 0,
    trackRef,
    viewportRef,
    prev,
    next,
    getHref = (id: number) => `/product/${id}`,
}: ProductSuggestionProps) {
    const localTrackRef = useRef<HTMLDivElement | null>(null);
    const localViewportRef = useRef<HTMLDivElement | null>(null);
    const resolvedTrackRef = trackRef ?? localTrackRef;
    const resolvedViewportRef = viewportRef ?? localViewportRef;
    const totalItems = products.length;

    return (
        <section className="relative">
            {products.length == 0 ? (
                <div className="flex justify-center items-center m-10">
                        <div className="bg-gray-100 p-4 flex flex-col justify-center items-center rounded-4xl lg:w-[40%]">
                            <img src={emptyBox} alt="empty-box.png" className="opacity-20 h-30 w-auto"></img>
                            <p className="p-4 text-sm text-center w-full text-gray-500">Nenhum produto para sugerir</p>
                        </div>
                    </div>
            ):(
                <div>
                    <div className="overflow-hidden mb-40" ref={resolvedViewportRef}>
                        <div
                            ref={resolvedTrackRef}
                            className="flex flex-nowrap gap-3 py-5 transition-transform duration-500 ease-out"
                            style={{transform: `translateX(${translateValue}px)`}}
                        >
                            {products.map((product) => {
                                const variants = product.variants ?? [];
                                const defaultVariant = variants.find((variant) => variant.defaultVariant);
                                const variantToShow = defaultVariant ?? variants[0];
                                return (
                                    <div key={product.id} data-slide="true">
                                        {variantToShow && variantToShow?.stock > 0 && (
                                            <div className="flex flex-col justify-start items-start w-50 lg:w-60">
                                                <Link to={getHref(product.id)}>
                                                    <button type="button" className="hover:cursor-pointer">
                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.title}
                                                            className="product-image-catalog object-cover w-full h-70 lg:h-90"
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
                                    type="button"
                                    onClick={prev}
                                    aria-label="Item anterior"
                                    className="pointer-events-auto p-3 rounded-full shadow bg-black hover:invert hover:cursor-pointer "
                                >
                                    <ChevronLeft className="invert w-auto h-5 duration-100 hover:scale-110" />
                                </button>
                                <button
                                    type="button"
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