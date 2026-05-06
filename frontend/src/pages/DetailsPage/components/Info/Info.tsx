import {useParams} from 'react-router-dom';
import  '../../../../index.css'
import useProducts from '../../../../../hooks/useProducts'
import './Info.css'
import SizeButtons from './components/SizeButtons/SizeButtons'
import type {Product, ProductVariant} from '../../../../context/ProductContext'
import {CreditCard} from 'lucide-react'
import Description from './components/Description/Description'
import AddToCartButton from './components/AddToCartBtn/AddToCartButton'
import PromotionsGreenLabel from './components/PromotionsGreenLabel/PromotionsGreenLabel'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { useState } from 'react'

const Info = () => {

        const [selectedSize, setSelectedSize] = useState<string>("P");
        const {id} = useParams();
        const products = useProducts();
    
        const selectedProduct = products.find((product:Product) => product.id === Number(id)) as Product | undefined;
        const selectedProductVariants = selectedProduct?.variants ?? [];

        const defaultVariant = selectedProductVariants.length > 0 
            ? (selectedProductVariants.find((product:ProductVariant) => product?.defaultVariant) ?? selectedProductVariants[0])
            : undefined;
        
        const selectedVariant = defaultVariant ? (
            selectedProductVariants.find((variant: ProductVariant) => variant.size === selectedSize) ?? defaultVariant
        ) : undefined;
        const isOutOfStock = !selectedVariant || (selectedVariant?.stock ?? 0) === 0;

        

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
                                w-full h-full object-cover
                                sm:w-auto sm:h-100 
                                md:w-auto md:h-140
                                lg:w-auto lg:h-195
                                xl:w-auto h-220"
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
                                            <label className="bg-green-500 px-2 text-[12px] font-semibold text-white">R$ {(defaultVariant.price - ((defaultVariant.price) - (selectedProduct.discountPercentage * defaultVariant.price/100))).toFixed(0).toString().replace(".", ",")} OFF</label>
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
                                <span className="text-center bg-green-200 text-green-700 text-sm py-2 px-4 rounded-2xl
                                md:w-full lg:w-full"
                                >%10 de cashback na próxima compra</span>
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
        </>
    )
}
 
export default Info;