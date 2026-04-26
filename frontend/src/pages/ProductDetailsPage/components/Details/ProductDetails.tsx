import {useParams, Link} from 'react-router-dom';
import useProducts from '../../../../../hooks/useProducts'
import type {Product} from '../../../../context/ProductContext'
import type {ProductVariant} from '../../../../context/ProductContext'

const ProductDetails = () => {

        const id = useParams();
        const products = useProducts();
    
        const selectedProduct = products.find((product) => product.id == Number(id));
        const selectedProductVariants = selectedProduct?.variants ?? [];
        const defaultVariant = selectedProductVariants
            .find((product) => product?.defaultVariant ?? selectedProductVariants[0])
        
    return ( 
        <>
        </>
     );
}
 
export default ProductDetails;