import type {Product} from '../../context/ProductContext';
import {useCart} from '../../context/CartContext';
import {X, Trash} from 'lucide-react';

export function Cart() {

    const cart = useCart();
    const size = cart.savedSize;
    const isOpen = cart.toggleCart;
    const cartProducts = cart.items;

    return (isOpen ?(
        <div className={`cart-div fixed z-10 bottom-0 right-7 rounded-xl bg-white shadow-lg overflow-y-scroll
        overflow-x-hidden 
        md:rounded-none lg:rounded-none xl:rounded-none 
        md:h-full md:w-[45%] md:right-0
        lg:h-full lg:w-[33%] lg:right-0
        xl:h-full xl:w-[26%] xl:right-0
        2xl:h-full 2xl:2-[23%] 2xl:right-0`}>

                <div className="flex justify-between items-center p-5">
                    <h2 className="inline-flex text-xl font-medium p-4">Seu Carrinho</h2>
                    <div className="inline-flex">
                        <button onClick={isOpen} className="hover:cursor-pointer">
                            <X></X>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">   
                    {cartProducts ? (
                        cartProducts.map((product:Product) => {
                            const variants = product.variants ?? [];
                            const defaultVariant = variants.find((v) => v.defaultVariant) ?? variants[0];
                            return (
                                <div key={product.id} className="flex justify-center items-center border-b w-auto h-60 mx-10 border-b-black/10">
                                    <img src={`/${product.imageUrl}`} alt={product.title} className="w-24 h-32"/>
                                    <div className="flex flex-col items-start ml-4 w-full">
                                        <p className="font-normal text-[16px] font-medium mb-2 w-[80%]">{product.title}</p>
                                        <p className="text-[16px] text-gray-600 font-medium">{size ?? ''}</p>
                                        <div className="flex gap-3 mt-2">
                                            {defaultVariant && (
                                                <p className={`${product.discountPercentage ? 'text-red-600 line-through' : 'text-black font-semibold'} text-[16px]`}>R${defaultVariant?.price.toFixed(2)}</p>
                                            )}
                                            {product.discountPercentage > 0 && (
                                            <p className="font-semibold text-[16px]">R${(defaultVariant?.price - (defaultVariant?.price * (product.discountPercentage/100))).toFixed(2)}</p>
                                            )}
                                        </div>
                                        <div>
                                            <button 
                                                onClick={() => cart.removeItemFromCart(product)}
                                                className="mt-2 p-1 rounded-[50%] bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                                                <Trash className="w-5 h-5 text-gray-700"/>
                                            </button>
                                            <div>
                                                <label>-</label>
                                                <label>{}</label>
                                                <label>+</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div>
                            <p>Seu carrinho está vazio</p>
                        </div>
                    )}

                   
                </div>
                <div className="cart-resume bg-white fixed">
                </div>
        </div>
    ):(
        null
    )
    );
}