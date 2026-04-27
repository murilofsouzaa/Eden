import {useParams} from 'react-router-dom';
import {useState} from 'react'
import useProducts from '../../../../../hooks/useProducts'
import './ProductDetails.css'
import SizeButtons from './SizeButtons/SizeButtons'
import type {Product, ProductVariant} from '../../../../context/ProductContext'

const ProductDetails = () => {

        const [selectedSize, setSelectedSize] = useState<string | null>(null);
        const [activatedSize, setActivatedSize] = useState<boolean>(true);


        const {id} = useParams();
        const products = useProducts();
    
        const selectedProduct = products.find((product:Product) => product.id === Number(id));
        const selectedProductVariants = selectedProduct?.variants ?? [];
        const defaultVariant = selectedProductVariants
            .find((product:ProductVariant) => product?.defaultVariant) ?? selectedProductVariants[0]
        
    return (
        <>
            {selectedProduct ? (
                <div className="flex justify-center items-center p-5">
                    <div className="flex justify-center items-center w-[50%]">
                        <img
                            src={`/${selectedProduct.imageUrl}`}
                            alt={selectedProduct.title}
                            className="w-auto h-180 object-cover"
                            />
                    </div>
                    <div className="flex flex-col justify-center items-start w-[50%]">
                        <h1 className="text-2xl font-bold">{selectedProduct.title}</h1>
                        <label>{defaultVariant.category.charAt(0).toUpperCase() + defaultVariant.category.slice(1)}</label>
                        {defaultVariant?.price !== undefined && (
                            <label className=" text-black/50">R$ {defaultVariant.price.toFixed(2)}</label>
                        )}
                        <SizeButtons></SizeButtons>
                    </div>
                </div>
            ) : (
                <p>Produto não encotrado.</p>
            )}
        </>
    )
}
 
export default ProductDetails;