import type {Product} from '../../context/ProductContext';
import type {CartItem} from '../../context/CartContext';
import {useCart} from '../../context/CartContext';
import {X, Trash} from 'lucide-react';

export function Cart() {

    const cart = useCart();
    const isOpen = cart.isOpen;
    const cartProducts = cart.items;

    return (isOpen ?(
        <div className={`cart-div fixed z-10 bottom-0 right-7 rounded-xl bg-white shadow-lg overflow-y-scroll
        overflow-x-hidden 
        md:rounded-none lg:rounded-none xl:rounded-none 
        md:h-full md:w-[45%] md:right-0
        lg:h-full lg:w-[33%] lg:right-0
        xl:h-full xl:w-[26%] xl:right-0
        2xl:h-full 2xl:2-[23%] 2xl:right-0`}>

                <div className="flex justify-between items-center p-5 mt-5">
                    <h2 className="inline-flex text-xl font-medium p-4">Seu Carrinho</h2>
                    <div className="inline-flex">
                        <button onClick={cart.toggleCart} className="hover:cursor-pointer">
                            <X></X>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col px-10">   
                    {cartProducts ? (
                        cartProducts.map((item: CartItem) => {
                            const {product, size, quantity, unitPrice} = item;
                            const discountedUnitPrice = product.discountPercentage > 0
                                ? unitPrice
                                : null;
                            const originalUnitPrice = product.discountPercentage > 0
                                ? product.variants.find((variant) => variant.size === size)?.price ?? unitPrice
                                : null;
                            return (
                                <div key={item.key} className="flex justify-center items-start border-b w-auto mt-10  h-50 border-b-black/10">
                                    <img src={`/${product.imageUrl}`} alt={product.title} className="w-26 h-34"/>
                                    <div className="flex flex-col items-start ml-4 w-full">
                                        <p className="font-normal text-[16px] font-medium mb-2 w-[80%]">{product.title}</p>
                                        <p className="text-[16px] text-gray-600 font-medium">{size}</p>
                                        <div className="flex gap-3 mt-2">
                                            {originalUnitPrice !== null && (
                                                <p className={`${product.discountPercentage ? 'text-red-600 line-through' : 'text-black font-semibold'} text-[16px]`}>
                                                    R${originalUnitPrice.toFixed(2)}
                                                </p>
                                            )}
                                            {discountedUnitPrice !== null && (
                                            <p className="font-semibold text-[16px]">R${discountedUnitPrice.toFixed(2)}</p>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <button 
                                                onClick={() => cart.removeItemFromCart(item)}
                                                className="flex justify-center items-center h-10 w-10 mt-2 rounded-[50%] bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                                                <Trash className="w-5 h-5 text-gray-700"/>
                                            </button>
                                            <div className="flex justify-center items-center gap-5 border border-black/20 px-4 h-9
                                            hover:bg-gray-100 hover:cursor-pointer">
                                                <button className="text-3xl hover:cursor-pointer">-</button>
                                                <label className="">{quantity}</label>
                                                <button className="text-xl hover:cursor-pointer">+</button>
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