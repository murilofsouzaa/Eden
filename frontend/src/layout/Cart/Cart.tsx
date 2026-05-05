import type {Product} from '../../context/ProductContext';
import {useCart} from '../../context/CartContext';
import {X} from 'lucide-react';

export function Cart() {

    const cart = useCart();
    const size = cart.savedSize;
    const isOpen = cart.toggleCart;
    const cartProducts = cart.items;

    return (isOpen ?(
        <div className={`cart-div fixed z-10 bottom-0 right-7 rounded-xl bg-white shadow-lg overflow-y-scroll
        overflow-x-hidden 
        md:h-full md:w-[45%] md:right-0
        lg:h-full lg:w-[33%] lg:right-0
        xl:h-full xl:w-[26%] xl:right-0
        2xl:h-full 2xl:2-[23%] 2xl:right-0`}>
                <div className="flex justify-between items-center w-full p-5 pr-10">
                    <h2 className="inline-flex text-xl font-medium p-4">Seu Carrinho</h2>
                    <div className="inline-flex">
                        <button onClick={isOpen} className="hover:cursor-pointer">
                            <X></X>
                        </button>
                    </div>
                </div>

                <div className="">   
                    {cartProducts ? (
                        cartProducts.map((product:Product) => {
                            const variants = product.variants ?? [];
                            const defaultVariant = variants.find((v) => v.defaultVariant) ?? variants[0];
                            return (
                                <div key={product.id} className="flex justify-center items-center p-4">
                                    <div className="flex flex-row justify-center">
                                        <img src={`/${product.imageUrl}`} alt={product.title} className="w-auto h-40"/>
                                        <div className="ml-4">
                                            <label className="block text-[16px] font-medium w-[60%] mb-2">{product.title}</label>
                                            <div className="flex justify-center items-center bg-black h-[30px] w-[30px] text-sm text-white p-5 rounded-[50%]">
                                                <p>{size ?? ''}</p>
                                            </div>

                                            <div className="flex flex-row">
                                                <div className="mt-2">
                                                    <span className={`${product.discountPercentage ? 'text-red-600 line-through' : 'text-black'} font-semibold text-[15px]`}>R${defaultVariant?.price}</span>
                                                    {product.discountPercentage > 0 && (
                                                    <span className="font-semibold ml-4 mt-10 text-[16px]">R${defaultVariant?.price - (defaultVariant?.price * (product.discountPercentage/100))}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>

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