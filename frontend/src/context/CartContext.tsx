/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useState, useEffect} from 'react'
import type {Product}  from '../context/ProductContext'
import {api} from '../services/api'

export type Cart={
    id:number;
    userId:number
    status:boolean;
}

export type CartItem={
    id:number;
    userId:number;
    productId:number;
    quantity:number;
    priceAtAddition:number
}

export type CartContextType = {
    cart: Cart | null;
    items: Product[];
        addItemCart: (newItem: Product, quantity?: number, size?: string) => Promise<void> | void;
    isOpen:boolean;
    toggleCart: () => void;
    totalItems:number;
    cartPrice:number;  
    savedSize?: string | null;
    removeItemFromCart: (product:Product) => void;

}


export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}:{readonly children: React.ReactNode}){

    const [cart, setCart] = useState<(Cart | null)>(null)
    const [items, setItems ] = useState<Product[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartPrice, setCartPrice] = useState<number>(0);
    const [savedSize, setSavedSize] = useState<string | null>(null);

    useEffect(() => {
        api.get("/cart")
        .then((response) =>{
            setCart(response.data)
        })
    }, []);


    const addItemCart = (newItem:Product, quantity:number = 1, size?: string) =>{
        setItems((prev) => [... new Set([...prev, newItem])])
        setTotalItems((prev) => prev + quantity)
        const priceToAdd = newItem.variants && newItem.variants.length > 0 ? newItem.variants[0].price * quantity : 0;
        setCartPrice((prev) => prev + priceToAdd)
        if(size){
            setSavedSize(size);
        }
    }

    const removeItemFromCart = (product:Product) => {
        setItems(items.filter((item) => item.id != product.id)) 
    }

    const toggleCart = () =>{
       return setIsOpen((prev) => !prev)
    }

    
    return ( 
        <CartContext.Provider value={{cart ,items, addItemCart, isOpen, toggleCart, totalItems, cartPrice, savedSize, removeItemFromCart}}>
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