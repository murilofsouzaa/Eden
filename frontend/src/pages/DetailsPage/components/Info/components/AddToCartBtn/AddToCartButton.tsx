import {useCart} from '../../../../../../context/CartContext'
import type {Product} from '../../../../../../context/ProductContext'

export type AddToCartButtonProps={
    isOutOfStock:boolean;
    selectedProduct: Product;
}

const AddToCartButton = ({isOutOfStock, selectedProduct}:AddToCartButtonProps) => {

    const {addItemCart} = useCart();
    return ( 
        <button
            className={`text-white text-sm font-bold p-4 w-100 hover:cursor-pointer bg-black`}
            disabled={isOutOfStock}
            onClick={() => addItemCart(selectedProduct)}
        >
            {isOutOfStock ? 'Sem estoque' : 'Adicionar ao Carrinho'}
        </button>
     );
}
 
export default AddToCartButton;