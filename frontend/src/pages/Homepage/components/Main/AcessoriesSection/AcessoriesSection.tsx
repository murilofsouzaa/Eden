import useAccessories from '../../../../../../hooks/useAccessories';
import emptyBox from '../../../../../../public/icons/empty-box.png';
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'react-feather';
import {useEffect, useRef} from 'react';
import PriceOffLabel from '../../../../../components/ui/PriceOffLabel'

export function AcessoriesSection() {
    const accessories = useAccessories();
    const viewportRef = useRef<HTMLDivElement | null>(null);

    const formatPrice = (price: number) => price.toFixed(2).replace('.', ',');

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        viewport.scrollLeft = 0;
    }, [accessories.length]);

    const scrollByCards = (direction: 'prev' | 'next') => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const slide = viewport.querySelector<HTMLElement>('[data-slide="true"]');
        const slideWidth = slide?.offsetWidth ?? 320;
        const gap = 20;
        const amount = slideWidth + gap;

        viewport.scrollBy({
            left: direction === 'next' ? amount : -amount,
            behavior: 'smooth',
        });
    };

    return (
        <section className="mt-20">
            <h2 className="text-center text-7xl font-bold mb-3">ACESSÓRIOS</h2>
            <h3 className="text-center mb-6">
                Os detalhes que completam o visual com a mesma curadoria dos nossos demais produtos.
            </h3>

            <section className="relative">
                <div
                    ref={viewportRef}
                    className="overflow-x-auto scroll-smooth border-y border-y-gray-300 py-10"
                    style={{scrollbarWidth: 'none'}}
                >
                    <div className="flex flex-nowrap gap-5 pb-2">
                        {accessories.map((accessory) => (
                            <div key={accessory.id} data-slide="true" className="shrink-0 w-64 sm:w-72 md:w-80">
                                <div className="flex flex-col justify-start items-start">
                                    <Link to={`/acessories/${accessory.id}`} className="hover:cursor-pointer block w-full">
                                        <img
                                            src={accessory.imageUrl}
                                            alt={accessory.title}
                                            className="product-image-catalog object-cover w-full h-96 lg:h-144"
                                        />
                                    </Link>
                                    <p className="mt-2 text-md">{accessory.title}</p>

                                    <div className="mt-1">
                                        {accessory.price != null && (
                                            <div>
                                                {accessory.discountPercentage > 0 ? (
                                                    <p className="mt-1 text-black/50 line-through">R$ {formatPrice(accessory.price)}</p>
                                                ) : (
                                                    <p className="font-semibold mt-1 text-black">R$ {formatPrice(accessory.price)}</p>
                                                )}

                                                {accessory.discountPercentage > 0 && (
                                                    <div className="flex items-center gap-3">
                                                        <label className="text-md font-semibold text-green-600">R$ {formatPrice(accessory.price - (accessory.price * accessory.discountPercentage / 100))}</label>
                                                        <PriceOffLabel discountPercentage={accessory.discountPercentage} />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {accessories.length === 0 && (
                        <div className="flex justify-center items-center m-10">
                            <div className="bg-gray-100 p-4 flex flex-col justify-center items-center rounded-4xl lg:w-[40%]">
                                <img src={emptyBox} alt="empty-box.png" className="opacity-20 h-30 w-auto" />
                                <p className="p-4 text-sm text-center w-full text-gray-500">Nenhum acessório cadastrado</p>
                            </div>
                        </div>
                    )}
                </div>

                {accessories.length > 0 && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
                        <button
                            onClick={() => scrollByCards('prev')}
                            aria-label="Item anterior"
                            className="pointer-events-auto p-3 rounded-full shadow bg-black hover:invert hover:cursor-pointer"
                        >
                            <ChevronLeft className="invert w-auto h-5 duration-100 hover:scale-110" />
                        </button>
                        <button
                            onClick={() => scrollByCards('next')}
                            aria-label="Próximo item"
                            className="pointer-events-auto p-3 rounded-full shadow hover:invert bg-black hover:cursor-pointer"
                        >
                            <ChevronRight className="invert w-auto h-5 duration-100 hover:scale-110" />
                        </button>
                    </div>
                )}
            </section>
        </section>
    );
}