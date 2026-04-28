
import {Header} from '../../layout/Header/Header'
import ProductDetails from './components/Details/ProductDetails'
import {Footer} from '../../layout/Footer/Footer'


const ProductDetail = () => {

    return ( 
        <div className="w-full h-full">
            <Header></Header>
            <ProductDetails></ProductDetails>
            <Footer></Footer>
        </div>
     );
}
 
export default ProductDetail;