import React from 'react'
import type {CartItem} from '../../context/CartContext';
import {useCart} from '../../context/CartContext';
import {X, Trash} from 'lucide-react';
import {Dialog} from '@headlessui/react'
import { createPortal } from 'react-dom'
import emptyShoppingBag from '../../../public/icons/empty-shopping-bag-removebg-preview.png'

export function Cart() {

    const cart = useCart();
    const isOpen = cart.isOpen;
    const cartProducts = cart.items;
    const increaseQuantity = cart.increaseQuantity;
    const decreaseQuantity = cart.decreaseQuantity;
    

    const panel = isOpen ? (
        <Dialog open={isOpen} onClose={cart.toggleCart}>
            <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-[0.6px] " />
            <Dialog.Panel className={`fixed bottom-0 right-0 z-40 h-[85vh] overflow-y-scroll
                cart-div rounded-xl bg-gray-50 shadow-lg
                overflow-x-hidden w-full
                md:rounded-none lg:rounded-none xl:rounded-none
                md:h-full md:w-[45%] md:right-0 md:top-0
                lg:h-full lg:w-[33%] lg:right-0 lg:top-0
                xl:h-full xl:w-[26%] xl:right-0 xl:top-0
                ${isOpen ? "translate-0 opacity-100" : " translate-x-20 opacity-0"} duration-300 transition-all`}>
                
                <div className="">
                        <div className="sticky top-0 flex items-center justify-between z-30 px-6 py-4 bg-gray-50 border-b border-b-gray-300 w-full">
                            <h2 className="inline-flex text-xl font-medium p-4">Seu Carrinho</h2>
                            <div className="inline-flex">
                                <button onClick={cart.toggleCart} className="hover:cursor-pointer">
                                    <X></X>
                                </button>
                            </div>
                        </div>
                        <div className=" flex flex-col px-10">
                            {cartProducts && cartProducts.length > 0 ? (
                                cartProducts.map((item: CartItem) => {
                                    const {product, quantity, size, unitPrice} = item;
                                    const discountedUnitPrice = product.discountPercentage > 0
                                        ? unitPrice
                                        : null;
                                    return (
                                        <div key={item.id} className="flex justify-center items-start border-b w-auto mt-10  h-50 border-b-black/10">
                                            <img src={product.imageUrl} alt={product.title} className="w-30 h-34"/>
                                            <div className="flex flex-col items-start ml-4 w-full">
                                                <p className="font-normal text-[16px] font-medium mb-2 w-[80%]">{product.title}</p>
                                                <p className="text-[16px] text-gray-600 font-medium">{size}</p>
                                                <div className="flex gap-3 mt-2">
                                                    {discountedUnitPrice !== null && (
                                                    <p className="font-semibold text-[16px]">R${discountedUnitPrice.toFixed(2)}</p>
                                                    )}
                                                    {item.unitPrice !== null && (
                                                        <p className={`${product.discountPercentage ? 'text-red-600 line-through' : 'text-black font-semibold'} text-[16px]`}>
                                                            R${item.unitPrice.toFixed(2)}
                                                        </p>
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
                                                        <button 
                                                            onClick={() => decreaseQuantity(item)}
                                                            className="text-3xl hover:cursor-pointer">-</button>
                                                        <label className="">{quantity}</label>
                                                        <button 
                                                            onClick={() => increaseQuantity(item)}
                                                            className="text-xl hover:cursor-pointer">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="flex  flex-col justify-center items-center h-[75vh] w-full">
                                    <img src={emptyShoppingBag} className="opacity-20"></img>
                                    <p>Seu carrinho está vazio</p>
                                </div>
                            )}
                        </div>
                </div>  
                {cartProducts.length > 0 && (
                    <div className="block fixed bottom-0">
                        <div className="flex flex-col gap-2 mt-2 bg-white border-t border-t-gray-300
                        w-full">
                            <div className="flex items-center gap-4 px-10 py-5">
                                <input type="text" name="coupon-code" id="coupon-code" placeholder="Insira o código" className="outline-0 border border-black/20 px-2 py-1.5"/>
                                <button className="p-3 bg-black text-white rounded-4xl w-30
                                transition-all duration-300
                                hover:cursor-pointer active:scale-[0.96]">Aplicar</button>
                            </div>
                            <div className="px-10">
                                <label className="block text-lg font-semibold">Resumo</label>
                                <div className="flex flex-row justify-between mr-10 mt-1 font-semibold">
                                    <label className="text-md">Total: </label>
                                    <label className="text-md">{cart.cartPrice.toFixed(2).replace(".", ",")} BRL</label>
                                </div>
                            </div>
                            <div className="sticky bottom-0 bg-white flex justify-center w-full pb-5 border-t border-t-black/10">
                                <button className="bg-black text-white w-80 p-4 rounded-4xl mt-8
                                hover:cursor-pointer active:scale-[0.97] transition-all duration-150">Comprar</button>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog.Panel>
        </Dialog>
    ) : null;

    if (typeof document !== 'undefined') {
        return createPortal(panel, document.body);
    }

    return null;
}