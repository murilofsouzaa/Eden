export type AddToCartButtonProps={
    isOutOfStock:boolean;
}

const AddToCartButton = ({isOutOfStock}:AddToCartButtonProps) => {
    return ( 
        <button
            className={`text-white text-sm font-bold p-4 w-100 hover:cursor-pointer bg-black`}
            disabled={isOutOfStock}
        >
            {isOutOfStock ? 'Sem estoque' : 'Adicionar ao Carrinho'}
        </button>
     );
}
 
export default AddToCartButton;