/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useState} from 'react'
import type {Product}  from '../context/ProductContext'

export type CartContextType = {
  items: Product[];
  addItemCart: (newItem: Product) => void;
  isOpen:boolean;
  toggleCart: () => void;
  totalItems:number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}:{readonly children: React.ReactNode}){

    const [items, setItems ] = useState<Product[]>([])
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const addItemCart = (newItem:Product) =>{
        setItems((prev) => [... new Set([...prev, newItem])])
        setTotalItems((prev) => prev + 1)
    }

    const toggleCart = () =>{
       return setIsOpen((prev) => !prev)
    }
    
    return ( 
        <CartContext.Provider value={{items, addItemCart, isOpen, toggleCart, totalItems}}>
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