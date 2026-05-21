import {CreditCard} from 'lucide-react';
import type {Product, ProductVariant} from '../../../../../context/ProductContext';
import PriceOffLabel from '../../../../../components/ui/PriceOffLabel';
import SizeButtons from '../SizeButtons/SizeButtons';
import Description from '../Description/Description';
import AddToCartButton from '../AddToCartBtn/AddToCartButton';
import PromotionsGreenLabel from '../PromotionsGreenLabel/PromotionsGreenLabel';
import ProductDetails from '../ProductDetails/ProductDetails';
import DetailSuggestions, {type CarouselControls} from '../DetailSuggestions/DetailSuggestions';
import type {SuggestionItem} from '../ProductSuggestion/ProductSuggestion';

type ProductDetailViewProps = Readonly<{
    product: Product;
    defaultVariant: ProductVariant;
    hasDiscount: boolean;
    discountedPrice: string;
    installmentPrice: string;
    cashbackText: string;
    selectedSize: string;
    onSelectSize: (value: string) => void;
    isOutOfStock: boolean;
    suggestions: SuggestionItem[];
    carousel: CarouselControls;
}>;

export default function ProductDetailView({
    product,
    defaultVariant,
    hasDiscount,
    discountedPrice,
    installmentPrice,
    cashbackText,
    selectedSize,
    onSelectSize,
    isOutOfStock,
    suggestions,
    carousel,
}: ProductDetailViewProps) {
    return (
        <>
            <div className="overflow-x-hidden p-5 lg:grid lg:grid-cols-4 lg:col-start-2 lg:p-5 lg:flex-row">
                <div className="col-start-2">
                    <div className="flex justify-center items-center">
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full object-cover sm:w-auto sm:h-100 md:w-auto md:h-140 lg:w-auto lg:h-195 xl:w-auto xl:h-220"
                        />
                    </div>
                </div>

                <div className="col-start-3 w-full">
                    <div className="flex flex-col justify-center items-center mt-6 p-5 lg:justify-baseline lg:items-start lg:mx-18 w-full">
                        <h1 className="text-lg lg:text-xl font-semibold">{product.title}</h1>

                        <div className="flex flex-col my-4">
                            {hasDiscount && (
                                <div className="flex justify-center items-center gap-3">
                                    <label className="text-lg text-black/50 line-through">R$ {defaultVariant.price.toFixed(2).toString().replace('.', ',')}</label>
                                    <PriceOffLabel defaultVariant={defaultVariant} selectedProduct={product} />
                                </div>
                            )}
                            <label className="text-3xl text-black font-semibold">R$ {discountedPrice.toString().replace('.', ',')}</label>
                        </div>

                        <label className="text-[15px] flex gap-2 mt-1">
                            <span className="text-black/70">
                                <div className="flex justify-center items-center">
                                    <CreditCard className="h-5 w-auto" />
                                </div>
                            </span>
                            <span className="text-black/70">Em até</span><span className="font-semibold">12x</span><span className="text-black/70">de</span><span className="font-semibold">R${installmentPrice}</span>
                        </label>

                        <div className="w-75 mt-5 ">
                            <span className="text-center bg-green-100 text-green-600 text-sm py-2 px-4 rounded-2xl md:w-full lg:w-full">
                                {cashbackText}
                            </span>
                        </div>

                        <div className="mt-5">
                            <SizeButtons selectedSize={selectedSize} handleSizeClick={onSelectSize} />
                        </div>

                        <AddToCartButton selectedProduct={product} isOutOfStock={isOutOfStock} selectedSize={selectedSize} />
                        <p className="mt-4 text-sm">Frete grátis nas compras acima de R$299</p>

                        <Description selectedProduct={product} />
                        <ProductDetails selectedProduct={product} />
                    </div>
                </div>

                <div className="mt-3 row-start-2 col-start-2">
                    <PromotionsGreenLabel />
                </div>
            </div>

            <DetailSuggestions suggestions={suggestions} carousel={carousel} />
        </>
    );
}