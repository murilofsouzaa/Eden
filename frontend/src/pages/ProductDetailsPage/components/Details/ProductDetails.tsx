import {useParams} from 'react-router-dom';
import  '../../../../index.css'
import {useState} from 'react'
import useProducts from '../../../../../hooks/useProducts'
import './ProductDetails.css'
import SizeButtons from './SizeButtons/SizeButtons'
import type {Product, ProductVariant} from '../../../../context/ProductContext'
import {ChevronDown, ChevronUp} from 'lucide-react'
import {CreditCard} from 'lucide-react'

const ProductDetails = () => {

    const [selectedSize, setSelectedSize] = useState<string>("P");
    const [active, setActive] = useState(false);

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

        const handleActiveClick = () =>{
            setActive((prev) => !prev)
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
                                sm-auto sm:h-200 
                                md:w-auto md:h-140
                                lg:w-auto lg:h-200 lg:object-cover"
                                />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-6 p-5 lg:justify-baseline lg:items-start lg:mx-18">
                        <h1 className="text-lg lg:text-xl ">{selectedProduct.title}</h1>
                        <label className="text-black/60">{defaultVariant.category.charAt(0).toUpperCase() + defaultVariant.category.slice(1).replace("_", " ")}</label>
                        {defaultVariant?.price !== undefined && (
                        <label className="mt-4 text-2xl font-bold">R$ {defaultVariant.price.toFixed(2)}</label>
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
                        <button
                            className={`text-white text-sm font-bold p-4 w-100 hover:cursor-pointer ${
                                isOutOfStock ? 'bg-red-600 hover:bg-red-700' : 'bg-black'
                            }`}
                            disabled={isOutOfStock}
                        >
                            {isOutOfStock ? 'Sem estoque' : 'Adicionar ao Carrinho'}
                        </button>
                        <p className="mt-4 text-sm">Frete grátis nas compras acima de R$299</p>
                        <div className="mt-5 py-4 border-t border-t-[#acacac98] w-full ">
                            <div className="flex flex-col justify-between">
                                <div onClick={handleActiveClick} className="flex flex-row justify-between mb-2 hover:cursor-pointer">
                                    <label className=" text-md font-semibold">Descrição</label>
                                    {active ? (
                                            <button className="hover:cursor-pointer" onClick={handleActiveClick}>
                                                <ChevronUp></ChevronUp>
                                            </button>
                                    ) : (
                                        <button onClick={handleActiveClick}>
                                            <ChevronDown className="hover:cursor-pointer"></ChevronDown>
                                        </button>                                )
                                    }
                                </div>
                                {active && (
                                    <p className="mt-2 text-sm">{selectedProduct?.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 row-start-2 col-start-2 ">
                        <p className="text-center p-5 text-2xl border-t border-t-[#acacac98]  ">LEVE MAIS, PAGUE MENOS</p>
                        <div className="flex justify-center items-center gap-5"> 
                         <span className="bg-green-200 text-green-700 text-sm font-semibold py-2 px-4 rounded-md">3 por R$199</span>
                            <span className="bg-green-200 text-green-700 text-sm font-semibold py-2 px-4 rounded-md">4 por R$259</span>
                            <span className="bg-green-200 text-green-700 text-sm font-semibold py-2 px-4 rounded-md">5 por R$299,90</span>
                        </div>
                    </div>

                </div>
                
            ) : (
                <p>Produto não encotrado.</p>
            )}
        </>
    )
}
 
export default ProductDetails;