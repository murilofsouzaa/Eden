import type {Product} from '../../context/ProductContext';
import {X} from 'lucide-react';

type CartProps = {
    readonly onClose: () => void;
};

export function Cart({onClose}: CartProps) {

    return (
        <div className="cart-div fixed z-10 bottom-0 right-7 h-[70%] w-[90%] rounded-xl bg-white shadow-lg overflow-scroll 
        md:h-full md:w-[45%] md:right-0
        lg:h-full lg:w-[33%] lg:right-0
        xl:h-full xl:w-[30%] xl:right-0
        2xl:h-full 2xl:2-[23%] 2xl:right-0">
                <div className="flex justify-between items-center w-full p-5 pr-10">
                    <h2 className="inline-flex text-xl font-medium p-4">Seu Carrinho</h2>
                    <div className="inline-flex">
                        <button onClick={onClose} className="hover:cursor-pointer">
                            <X></X>
                        </button>
                    </div>
                </div>

                <div className="">   
                    {hasProducts ? (
                        products.map((product:Product) => {
                            const variants = product.variants ?? [];
                            const defaultVariant = variants.find((v) => v.defaultVariant) ?? variants[0];
                            return (
                                <div key={product.id} className="flex p-4">
                                    <img src={`/${product.imageUrl}`} alt={product.title} className="w-auto h-20"/>
                                    <div >
                                        <p className="ml-4 text-[12px] w-[60%]">{product.title}</p>
                                        <p className="font-bold ml-4 mt-3 text-[12px] w-[60%]">R${defaultVariant?.price}</p>
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
    );
}