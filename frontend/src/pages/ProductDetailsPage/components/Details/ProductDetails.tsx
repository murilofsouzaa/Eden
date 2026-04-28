import {useParams} from 'react-router-dom';
import {useState} from 'react'
import useProducts from '../../../../../hooks/useProducts'
import './ProductDetails.css'
import SizeButtons from './SizeButtons/SizeButtons'
import type {Product, ProductVariant} from '../../../../context/ProductContext'
import {CreditCard} from 'lucide-react'

const ProductDetails = () => {

    const [selectedSize, setSelectedSize] = useState<string>("P");

        const {id} = useParams();
        const products = useProducts();
    
        const selectedProduct = products.find((product:Product) => product.id === Number(id));
        const selectedProductVariants = selectedProduct?.variants ?? [];
        const defaultVariant = selectedProductVariants
            .find((product:ProductVariant) => product?.defaultVariant) ?? selectedProductVariants[0]

            const handleSizeClick = (size:string) => {
                setSelectedSize(size)
            }
    return (
        <>
            {selectedProduct ? (
                <div className="grid grid-cols-3 col-start-2 p-5 lg:flex-row">
                    <div className="col-start-2">
                        <div className="">
                            <img
                                src={`/${selectedProduct.imageUrl}`}
                                alt={selectedProduct.title}
                                className="lg:w-auto lg:h-260 lg:object-cover"
                                />
                        </div>
                    </div>
                    <div className="flex flex-col mt-6 mx-18">
                        <h1 className="font-bold text-lg lg:text-xl ">{selectedProduct.title}</h1>
                        <label className="text-black/60">{defaultVariant.category.charAt(0).toUpperCase() + defaultVariant.category.slice(1)}</label>
                        {defaultVariant?.price !== undefined && (
                        <label className="mt-4 text-2xl font-bold">R$ {defaultVariant.price.toFixed(2)}</label>
                        )}
                        <label className="mono text-[15px] flex gap-2 mt-1">
                            <span className="text-black/70">
                                <div className="flex justify-center items-center">
                                    <CreditCard className="h-5 w-auto"/>
                                </div>
                            </span>
                            <span className="text-black/70">Em até</span> <span className="font-bold">12x</span><span className="text-black/70"> de</span> <span className="font-bold">R${((defaultVariant?.price)/12).toFixed(2)}</span>
                        </label>
                        <span className="text-center bg-green-200 text-green-700 text-sm mt-5 py-2 px-2 rounded-2xl w-[64%]">%10 de cashback na próxima compra</span>
                        <div className="mt-5">
                            <SizeButtons selectedSize={selectedSize} handleSizeClick={handleSizeClick}></SizeButtons>
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