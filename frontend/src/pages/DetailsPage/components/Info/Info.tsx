import {useParams} from 'react-router-dom';
import  '../../../../index.css'
import {useState} from 'react'
import useProducts from '../../../../../hooks/useProducts'
import './Info.css'
import SizeButtons from './components/SizeButtons/SizeButtons'
import type {Product, ProductVariant} from '../../../../context/ProductContext'
import {CreditCard} from 'lucide-react'
import Description from './components/Description/Description'
import AddToCartButton from './components/AddToCartBtn/AddToCartButton'
import PromotionsGreenLabel from './components/PromotionsGreenLabel/PromotionsGreenLabel'
import ProductDetails from './components/ProductDetails/ProductDetails'

const Info = () => {

    const [selectedSize, setSelectedSize] = useState<string>("P");

        const {id} = useParams();
        const products = useProducts();
    
        const selectedProduct = products.find((product:Product) => product.id === Number(id));
        const selectedProductVariants = selectedProduct?.variants ?? [];
        const defaultVariant = selectedProductVariants
            .find((product:ProductVariant) => product?.defaultVariant) ?? selectedProductVariants[0]
        const selectedVariant =
            selectedProductVariants.find((variant: ProductVariant) => variant.size === selectedSize) ??
            defaultVariant
        const isOutOfStock = (selectedVariant?.stock ?? 0) === 0

        const handleSizeClick = (size:string) => {
            setSelectedSize(size)
        }

    return (
        <>
            {selectedProduct ? (
                <div className="overflow-x-hidden p-5 lg:grid lg:grid-cols-3 lg:col-start-2 lg:p-5 lg:flex-row">
                    <div className="col-start-2">
                        <div className="flex justify-center items-center">
                            <img
                                src={`/${selectedProduct.imageUrl}`}
                                alt={selectedProduct.title}
                                className="
                                sm-auto sm:h-180 
                                md:w-auto md:h-140
                                lg:w-auto lg:h-190 lg:object-cover"
                                />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-6 p-5 lg:justify-baseline lg:items-start lg:mx-18">
                        <h1 className="text-lg lg:text-xl ">{selectedProduct.title}</h1>
                        <label className="text-black/60">{defaultVariant.category.charAt(0).toUpperCase() + defaultVariant.category.slice(1).replace("_", " ")}</label>
                        {defaultVariant?.price !== undefined && (
                        <div className="flex flex-col">
                            <label className="mt-4 text-xl text-black/50 line-through">R$ {defaultVariant.price.toFixed(2)}</label>
                            <label className="text-2xl text-green-600/90 font-semibold">R$ {((defaultVariant.price) - (selectedProduct.discountPercentage * defaultVariant.price/100)).toFixed(2)}</label>
                        </div>
                        )}
                        <label className="text-[15px] flex gap-2 mt-1">
                            <span className="text-black/70">
                                <div className="flex justify-center items-center">
                                    <CreditCard className="h-5 w-auto"/>
                                </div>
                            </span>
                            <span className="text-black/70">Em até</span> <span className="font-bold">12x</span><span className="text-black/70"> de</span> <span className="font-bold">R${((defaultVariant?.price)/12).toFixed(2)}</span>
                        </label>
                        <div className="w-75 mt-5 ">
                            <span className="text-center bg-green-200 text-green-700 text-sm py-2 px-4 rounded-2xl
                            md:w-full lg:w-full"
                            >%10 de cashback na próxima compra</span>
                        </div>
                        <div className="mt-5">
                            <SizeButtons selectedSize={selectedSize} handleSizeClick={handleSizeClick}></SizeButtons>
                        </div>

                        <AddToCartButton isOutOfStock={isOutOfStock}></AddToCartButton>

                        <p className="mt-4 text-sm">Frete grátis nas compras acima de R$299</p>
                        
                        <Description selectedProduct={selectedProduct}></Description>
                        <ProductDetails selectedProduct={selectedProduct}></ProductDetails>

                    </div>
                    <div className="mt-10 row-start-2 col-start-2">
                        <PromotionsGreenLabel></PromotionsGreenLabel>
                    </div>
                    

                </div>
                
            ) : (
                <p>Produto não encotrado.</p>
            )}
        </>
    )
}
 
export default Info;