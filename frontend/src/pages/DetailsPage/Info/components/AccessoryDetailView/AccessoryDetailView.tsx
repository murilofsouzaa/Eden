import {CreditCard} from 'lucide-react';
import type {Accessory} from '../../../../../context/AccessoriesContext';
import PriceOffLabel from '../../../../../components/ui/PriceOffLabel';
import AddToCartButton from '../AddToCartBtn/AddToCartButton'
import Description from '../Description/Description';
import ProductDetails from '../ProductDetails/ProductDetails';
import PromotionsGreenLabel from '../PromotionsGreenLabel/PromotionsGreenLabel';
import DetailSuggestions, {type CarouselControls} from '../DetailSuggestions/DetailSuggestions';
import type {SuggestionItem} from '../ProductSuggestion/ProductSuggestion';
import type {Product} from '../../../../../context/ProductContext';

type AccessoryDetailViewProps = Readonly<{
    accessory: Accessory;
    accessoryHasDiscount: boolean;
    accessoryDiscountedPrice: number;
    accessoryInstallmentPrice: string;
    accessorySuggestions: SuggestionItem[];
    accessoryCarousel: CarouselControls;
}>;

export default function AccessoryDetailView({
    accessory,
    accessoryHasDiscount,
    accessoryDiscountedPrice,
    accessoryInstallmentPrice,
    accessorySuggestions,
    accessoryCarousel,
}: AccessoryDetailViewProps) {
    const accessoryAsProduct: Product = {
        id: accessory.id,
        title: accessory.title,
        description: `Acessório da marca ${accessory.brand}.`,
        material: accessory.material,
        modeling: accessory.brand,
        weight: `${accessory.weight}g`,
        discountPercentage: accessory.discountPercentage,
        bundleId: null,
        imageUrl: accessory.imageUrl,
        variants: [
            {
                id: accessory.id,
                productId: accessory.id,
                price: accessory.price,
                defaultVariant: true,
                size: '',
                category: 'accessory',
                gender: 'unisex',
                stock: accessory.stock,
                description: accessory.title,
            },
        ],
        tags: accessory.brand,
    };

    return (
        <>
            <div className="overflow-x-hidden p-5 lg:grid lg:grid-cols-4 lg:col-start-2 lg:p-5 lg:flex-row">
                <div className="col-start-2">
                    <div className="flex justify-center items-center">
                        <img
                            src={accessory.imageUrl}
                            alt={accessory.title}
                            className="w-full object-cover sm:w-auto sm:h-100 md:w-auto md:h-140 lg:w-auto lg:h-195 xl:w-auto xl:h-220"
                        />
                    </div>
                </div>

                <div className="col-start-3 w-full">
                    <div className="flex flex-col justify-center items-center mt-6 p-5 lg:justify-baseline lg:items-start lg:mx-18 w-full">
                        <h1 className="text-lg lg:text-xl font-semibold">{accessory.title}</h1>

                        <div className="flex flex-col my-4">
                            {accessoryHasDiscount ? (
                                <div className="flex justify-center items-center gap-3">
                                    <label className="text-lg text-black/50 line-through">R$ {accessory.price.toFixed(2).replace('.', ',')}</label>
                                    <PriceOffLabel discountPercentage={accessory.discountPercentage} />
                                </div>
                            ) : null}
                            <label className="text-3xl text-black font-semibold">R$ {((accessoryHasDiscount ? accessoryDiscountedPrice : accessory.price)).toFixed(2).replace('.', ',')}</label>
                        </div>

                        <label className="text-[15px] flex gap-2 mt-1">
                            <span className="text-black/70">
                                <div className="flex justify-center items-center">
                                    <CreditCard className="h-5 w-auto" />
                                </div>
                            </span>
                            <span className="text-black/70">Em até</span><span className="font-semibold">12x</span><span className="text-black/70">de</span><span className="font-semibold">R${accessoryInstallmentPrice}</span>
                        </label>

                        <div className="mt-5 ">
                            <span className="text-center bg-green-100 text-green-600 text-sm py-2 px-4 rounded-2xl md:w-full lg:w-full">
                                Frete grátis nas compras acima de R$299
                            </span>
                        </div>

                        <div className="mt-5 w-full text-sm text-black/70 space-y-1">
                            <p><span className="font-semibold">Marca:</span> {accessory.brand}</p>
                            <p><span className="font-semibold">Material:</span> {accessory.material}</p>
                            <p><span className="font-semibold">Peso:</span> {accessory.weight}g</p>
                        </div>

                        <div className="mt-5">
                            <AddToCartButton selectedProduct={accessoryAsProduct} isOutOfStock={accessory.stock === 0} selectedSize="" />
                        </div>

                        <Description selectedProduct={accessoryAsProduct} />
                        <ProductDetails selectedProduct={accessoryAsProduct} />
                    </div>
                </div>
            </div>

            <div className="mt-3 row-start-2 col-start-2">
                <PromotionsGreenLabel />
            </div>

            <DetailSuggestions
                suggestions={accessorySuggestions}
                carousel={accessoryCarousel}
                getHref={(itemId) => `/acessories/${itemId}`}
            />
        </>
    );
}