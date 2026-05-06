import type {Product, ProductVariant} from '../../context/ProductContext'

type PriceOffLabelProps={
    defaultVariant: ProductVariant;
    selectedProduct:Product
}

const PriceOffLabel = ({defaultVariant, selectedProduct}:PriceOffLabelProps) => {
    return ( 
        <label className="bg-green-500 px-2 text-[12px] font-semibold text-white">R$ {(defaultVariant.price - ((defaultVariant.price) - (selectedProduct.discountPercentage * defaultVariant.price/100))).toFixed(0).toString().replace(".", ",")} OFF</label>
     );
}
 
export default PriceOffLabel;