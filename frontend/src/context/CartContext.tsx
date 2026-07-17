/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import type { Product } from '../context/ProductContext';
import { api } from '../services/api';
import { toast } from 'sonner';

export type Cart = {
    id: number;
    userId: number;
    status: boolean;
};

export type CartItem = {
    id: number;
    key: string;
    product?: Product;
    size: string;
    quantity: number;
    unitPrice: number;
};

export type CartContextType = {
    cart: Cart | null;
    items: CartItem[];
    addItemCart: (newItem: Product, quantity?: number, size?: string) => Promise<void> | void;
    isOpen: boolean;
    toggleCart: () => void;
    totalItems: number;
    cartPrice: number;  
    removeItemFromCart: (item: CartItem) => void;
    increaseQuantity: (item: CartItem) => void;
    decreaseQuantity: (item: CartItem) => void;
    fetchCart: () => Promise<void>; // Exposto para ser chamado logo após o Login
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { readonly children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Busca o carrinho do banco de dados de forma segura e protegida
    const fetchCart = useCallback(async () => {
        const token = localStorage.getItem('token');
        
        // Se o usuário não estiver logado, limpa o estado local e impede a requisição HTTP (Evita Erro 403)
        if (!token) {
            setCart(null);
            setItems([]); 
            return;
        }

        try {
            const response = await api.get('/cart');
            setCart(response.data); 
            
            // Se o seu backend já trouxer a lista de itens acoplada ao carrinho:
            if (response.data?.items) {
                setItems(response.data.items);
            }
        } catch {
            setCart(null);
            setItems([]);
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('authChanged'));
            }
        }
    }, []);

    // Dispara a busca automática apenas se houver um usuário ativo no sistema
    useEffect(() => {
        const timer = window.setTimeout(() => {
            void fetchCart();
        }, 0);

        return () => window.clearTimeout(timer);
    }, [fetchCart]);

    const toggleCart = () => {
        setIsOpen((prev) => !prev);
    };

    const addItemCart = (newItem: Product, quantity: number = 1, size?: string) => {
        const defaultVariant = newItem.variants.find((variant) => variant.defaultVariant) ?? newItem.variants[0];
        const selectedSize = size ?? defaultVariant?.size ?? newItem.variants[0]?.size ?? '';
        const selectedVariant = newItem.variants.find((variant) => variant.size === selectedSize) ?? defaultVariant ?? newItem.variants[0];
        const unitPrice = selectedVariant ? selectedVariant.price - (selectedVariant.price * (newItem.discountPercentage / 100)) : 0;

        try {
            setItems((prev) => {
                const itemKey = `${newItem.id}-${selectedSize}`;
                const existingItemIndex = prev.findIndex((item) => item.key === itemKey);
    
                if (existingItemIndex >= 0) {
                    return prev.map((item) => (
                        item.key === itemKey
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ));
                }
                
                return [
                    ...prev,
                    {
                        id: Date.now() + Math.random(),
                        key: itemKey,
                        product: newItem,
                        size: selectedSize,
                        quantity,
                        unitPrice,
                    },
                ];
            });
            
            toggleCart();
            toast.success("Adicionado ao carrinho");
        } catch {
            toast.error('Algo deu errado!');
        }
    };
    
    const removeItemFromCart = (item: CartItem) => {
        setItems((prev) => prev.filter((currentItem) => currentItem.id !== item.id));
    };

    const totalItems = useMemo(
        () => items.reduce((acc, item) => acc + item.quantity, 0),
        [items]
    );

    const cartPrice = useMemo(
        () => items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0),
        [items]
    );

    const increaseQuantity = (itemToIncrease: CartItem) => {
        setItems((prev) =>
            prev.map((item) =>
                item.key === itemToIncrease.key
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (itemToDecrease: CartItem) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.key === itemToDecrease.key) {
                    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };
    
    return ( 
        <CartContext.Provider value={{
            cart, items, addItemCart, isOpen, toggleCart,
            totalItems, cartPrice, removeItemFromCart, increaseQuantity, decreaseQuantity, fetchCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart deve ser usado dentro de um CartProvider");
    }
    return context;
};
    
export default CartProvider;