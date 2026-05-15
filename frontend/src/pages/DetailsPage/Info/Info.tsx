import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import  './Info.css'
import useProducts from '../../../../hooks/useProducts'
import { useCarousel } from '../../../hooks/useCarousel'
import SizeButtons from './components/SizeButtons/SizeButtons'
import type {Product, ProductVariant} from '../../../context/ProductContext'
import {CreditCard} from 'lucide-react'
import Description from './components/Description/Description'
import AddToCartButton from './components/AddToCartBtn/AddToCartButton'
import PromotionsGreenLabel from './components/PromotionsGreenLabel/PromotionsGreenLabel'
import ProductDetails from './components/ProductDetails/ProductDetails'
import PriceOffLabel from '../../../components/ui/PriceOffLabel'
import {ProductSuggestion} from '../ProductSuggestion/ProductSuggestion'

const Info = () => {

        const [selectedSize, setSelectedSize] = useState<string>("P");
        const {id} = useParams();
        const products = useProducts();
    
        const selectedProduct = products.find((product:Product) => product.id === Number(id));
        const selectedProductId = selectedProduct?.id;
        const selectedProductVariants = selectedProduct?.variants ?? [];
        const suggestedProducts = selectedProductId == null
            ? []
            : products
                .filter((product) => product.id !== selectedProductId)
                .slice()
                .sort((a, b) => {
                    const score = (value: number) => (value * 9301 + selectedProductId * 49297) % 233280;
                    return score(a.id) - score(b.id);
                })
                .slice(0, 7);
        const suggestionCarousel = useCarousel({ totalItems: suggestedProducts.length });

        const defaultVariant = selectedProductVariants.length > 0 
            ? (selectedProductVariants.find((product:ProductVariant) => product?.defaultVariant) ?? selectedProductVariants[0])
            : undefined;
        
        const selectedVariant = defaultVariant ? (
            selectedProductVariants.find((variant: ProductVariant) => variant.size === selectedSize) ?? defaultVariant
        ) : undefined;
        const isOutOfStock = !selectedVariant || (selectedVariant?.stock ?? 0) === 0;
        const pageTitle = selectedProduct == undefined ? "EDEN" : `${selectedProduct.title.slice(0, 20)}...`;

        useEffect(() => {
            const titleElement = document.querySelector('title');
            if (titleElement) {
                titleElement.textContent = pageTitle;
            }
        }, [pageTitle]);

    return (
        <>
            {selectedProduct && defaultVariant ? (
                <div className="overflow-x-hidden p-5 lg:grid lg:grid-cols-4 lg:col-start-2 lg:p-5 lg:flex-row">
                    <div className="col-start-2">  
                        <div className="flex justify-center items-center">
                            <img
                                src={`/${selectedProduct.imageUrl}`}
                                alt={selectedProduct.title}
                                className="
                                w-full object-cover
                                sm:w-auto sm:h-100 
                                md:w-auto md:h-140
                                lg:w-auto lg:h-195
                                xl:w-auto xl:h-220"
                                />
                        </div>
                    </div>
                    <div className="col-start-3 w-full">
                        <div className="flex flex-col justify-center items-center mt-6 p-5 lg:justify-baseline lg:items-start lg:mx-18 w-full">
                            <h1 className="text-lg lg:text-xl font-semibold">{selectedProduct.title}</h1>
                            {defaultVariant?.price !== undefined && (
                            <div className="flex flex-col my-4">
                                    {selectedProduct.discountPercentage > 0 && (
                                        <div className="flex justify-center items-center gap-3">
                                            <label className="text-lg text-black/50 line-through">R$ {defaultVariant.price.toFixed(2).toString().replace(".", ",")}</label>
                                            <PriceOffLabel defaultVariant={defaultVariant} selectedProduct={selectedProduct}/>
                                        </div>
                                    )}
                                <label className="text-3xl text-black font-semibold">R$ {((defaultVariant.price) - (selectedProduct.discountPercentage * defaultVariant.price/100)).toFixed(2).toString().replace(".", ",")}</label>
                            </div>
                            )}
                            <label className="text-[15px] flex gap-2 mt-1">
                                <span className="text-black/70">
                                    <div className="flex justify-center items-center">
                                        <CreditCard className="h-5 w-auto"/>
                                    </div>
                                </span>
                                <span className="text-black/70">Em até</span><span className="font-semibold">12x</span><span className="text-black/70">de</span><span className="font-semibold">R${((defaultVariant?.price)/12).toFixed(2)}</span>
                            </label>
                            <div className="w-75 mt-5 ">
                                <span className="text-center bg-green-100 text-green-600 text-sm py-2 px-4 rounded-2xl
                                md:w-full lg:w-full"
                                >% 10 de cashback na próxima compra</span>
                            </div>
                            <div className="mt-5">
                                <SizeButtons selectedSize={selectedSize} handleSizeClick={setSelectedSize}></SizeButtons>
                            </div>
                            <AddToCartButton selectedProduct={selectedProduct} isOutOfStock={isOutOfStock} selectedSize={selectedSize}></AddToCartButton>
                            <p className="mt-4 text-sm">Frete grátis nas compras acima de R$299</p>
                        
                            <Description selectedProduct={selectedProduct}></Description>
                            <ProductDetails selectedProduct={selectedProduct}></ProductDetails>
                        </div>
                        </div>
                        <div className="mt-10 row-start-2 col-start-2">
                            <PromotionsGreenLabel></PromotionsGreenLabel>
                        </div>
                    </div>
                
            ) : (
                <div className="flex justify-center items-center p-40">
                    <p className="text-center text-black/60 text-xl">Produto não encontrado ou sem variantes disponíveis</p>
                </div>
            )}

            <div>
                <ProductSuggestion
                    products={suggestedProducts}
                    translateValue={suggestionCarousel.translateValue}
                    trackRef={suggestionCarousel.trackRef}
                    viewportRef={suggestionCarousel.viewportRef}
                    prev={suggestionCarousel.prev}
                    next={suggestionCarousel.next}
                />
            </div>
        </>
    )
}
 
export default Info;