import {useCart} from '../../../../../context/CartContext'
import type {Product} from '../../../../../context/ProductContext'

export type AddToCartButtonProps={
    isOutOfStock:boolean;
    selectedProduct: Product;
    selectedSize: string;
}

const AddToCartButton = ({isOutOfStock, selectedProduct, selectedSize}:AddToCartButtonProps) => {

    const {addItemCart} = useCart();
    return ( 
        <button
            className={`text-white text-sm font-bold bg-black p-4 w-70 
            hover:cursor-pointer
            transition-all duration-300 active:scale-[0.96]`}
            disabled={isOutOfStock}
            onClick={() => {
                console.log(`Adding ${selectedProduct.title} in size ${selectedSize}`);
                addItemCart(selectedProduct, 1, selectedSize);
            }}
        >
            {isOutOfStock ? 'Sem estoque' : 'Adicionar ao Carrinho'}
        </button>
     );
}
 
export default AddToCartButton;