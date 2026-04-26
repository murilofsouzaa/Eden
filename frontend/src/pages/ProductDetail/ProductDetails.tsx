import {useParams, Link} from 'react-router-dom';
import useProducts from '../../../hooks/useProducts'
import type {Product} from '../../context/ProductContext'
import type {ProductVariant} from '../../context/ProductContext'

const ProductDetail = () => {

    const id = useParams();
    const products = useProducts();

    
    

    return ( 
        <>
            
        </>
     );
}
 
export default ProductDetail;