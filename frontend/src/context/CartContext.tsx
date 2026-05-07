/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useMemo, useState, useEffect} from 'react'
import type {Product}  from '../context/ProductContext'
import {api} from '../services/api'

export type Cart={
    id:number;
    userId:number
    status:boolean;
}

export type CartItem={
    key:string;
    product: Product;
    size: string;
    quantity:number;
    unitPrice:number;
}

export type CartContextType = {
    cart: Cart | null;
    items: CartItem[];
        addItemCart: (newItem: Product, quantity?: number, size?: string) => Promise<void> | void;
    isOpen:boolean;
    toggleCart: () => void;
    totalItems:number;
    cartPrice:number;  
    removeItemFromCart: (item:CartItem) => void;

}


export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}:{readonly children: React.ReactNode}){

    const [cart, setCart] = useState<(Cart | null)>(null)
    const [items, setItems ] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    

    useEffect(() => {
        api.get("/cart")
        .then((response) =>{
            setCart(response.data)
        })
    }, []);


    const addItemCart = (newItem:Product, quantity:number = 1, size?: string) =>{
        const defaultVariant = newItem.variants.find((variant) => variant.defaultVariant) ?? newItem.variants[0];
        const selectedSize = size ?? defaultVariant?.size ?? newItem.variants[0]?.size ?? '';
        const selectedVariant = newItem.variants.find((variant) => variant.size === selectedSize) ?? defaultVariant ?? newItem.variants[0];
        const unitPrice = selectedVariant ? selectedVariant.price - (selectedVariant.price * (newItem.discountPercentage / 100)) : 0;

        setItems((prev) => {
            const existingItemIndex = prev.findIndex((item) => item.product.id === newItem.id && item.size === selectedSize);

            if (existingItemIndex >= 0) {
                return prev.map((item) => (
                    item.product.id === newItem.id && item.size === selectedSize
                        ? {...item, quantity: item.quantity + quantity}
                        : item
                ));
            }

            return [
                ...prev,
                {
                    key: `${newItem.id}-${selectedSize}`,
                    product: newItem,
                    size: selectedSize,
                    quantity,
                    unitPrice,
                },
            ];
        });
    }

    const toggleCart = () =>{
       return setIsOpen((prev) => !prev)
    }

    const removeItemFromCart = (item:CartItem) => {
        setItems((prev) => prev.filter((currentItem) => currentItem.key !== item.key));
    }



    const totalItems = useMemo(
        () => items.reduce((acc, item) => acc + item.quantity, 0),
        [items]
    );

    const cartPrice = useMemo(
        () => items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0),
        [items]
    );
    
    
    return ( 
        <CartContext.Provider value={{cart ,items, addItemCart, isOpen, toggleCart,
         totalItems, cartPrice, removeItemFromCart}}>
            {children}
        </CartContext.Provider>
     );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context){
        throw new Error("Context cannot be null");
    }

    return context;
} 
    
export default CartProvider;