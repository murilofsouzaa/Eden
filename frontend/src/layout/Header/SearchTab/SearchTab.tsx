import {useState} from 'react';
import type {Product} from '../../../context/ProductContext'
import {Dialog} from '@headlessui/react'
import {Link} from 'react-router-dom'
import {Search} from 'lucide-react'
import {X} from 'lucide-react'


export type SearchTabProps={
    products:Product[];
    isActive:boolean;
    toggleSearch: () => void;
}

const SearchTab = ({products, isActive, toggleSearch}: SearchTabProps) => {

    const [term, setTerm] = useState<string>("");
    
    const termMatches = (product:Product, term:string) =>{
        return product.title.toUpperCase().includes(term.toUpperCase());
    }

    return ( 
        <Dialog open={isActive} onClose={toggleSearch}>
            <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-[0.6px]">
                <Dialog.Panel className={`fixed flex justify-center items-center bottom-0 z-40 
                    w-full h-full overflow-y-scroll
                    cart-div rounded-xl bg-gray-50 shadow-lg
                    overflow-x-hidden
                    md:rounded-none lg:rounded-none xl:rounded-none
                    lg:max-h-[720px] lg:top-0
                    lg:max-h-[720px] lg:top-0
                    md:max-h-[720px] md:top-0
                    xl:max-h-[720px] xl:top-0
                    ${isActive ? "translate-0 opacity-100" : " translate-x-20 opacity-0"} duration-100 transition-all`}>
        
                    <div className="flex flex-col px-10 w-full h-full">

                        <div className="flex justify-center items-center gap-3 w-full border-b border-b-gray-200">
                            <div className="flex justify-center w-[90%]">
                                <div className="hidden bg-gray-100 focus-within:outline-1
                                 lg:flex lg:w-[400px] lg:justify-center lg:items-center lg:gap-4 rounded-3xl ease-in-out duration-300 hover:cursor-pointer">
                                    <div className="flex items-center pl-4">
                                        <Search className="h-5 w-auto text-black/60"></Search>
                                    </div>
                                    <input
                                        type="text"
                                        id="search"
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                        name="search"
                                        placeholder="O que mandas meu nobre?"
                                        className="pr-4 py-3 outline-0 w-full">
                                    </input>
                                    <button
                                        onClick={() => setTerm("")}
                                        className="mr-4 hover:cursor-pointer">
                                        <p className="text-sm h-full rounded-2xl">Limpar</p>
                                    </button>
                                </div>
                                <div className="flex justify-start gap-2 w-full p-1 focus-within:outline-1
                                  bg-gray-100 rounded-2xl md:w-[60%] lg:w-[60%] lg:hidden">
                                    <div className="flex items-center">
                                        <Search className="h-4 text-[#242424]"></Search>
                                    </div>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                        placeholder="Tá procurando que tipo de estilo..."
                                        className= "w-full outline-0 p-2 focus:outline-1"/>
                                </div>
                            </div>
                            <button 
                                onClick={toggleSearch}
                                className="flex justify-center lg:w-[2%] hover:cursor-pointer hover:translate-y-1 transition-all bg-transparent border-none">
                                    <X className="h-24 w-auto"></X>
                            </button>
                        </div>

                        <div className="flex flex-col mt-10">
                            <div className="flex justify-center flex-wrap gap-10 z-10 h-full w-full">
                                {products.some((product) => termMatches(product, term)) == true ? (
                                    <div>
                                        <div className="w-full">
                                            <h2 className="font-bold mb-3 p-1 text-md border-b border-b-gray-200">PRODUCTS</h2>  
                                        </div> 
                                        <div className="flex justify-center flex-wrap gap-2 border-b border-b-gray-200">
                                            {products.filter((product) => product.title.toUpperCase().includes(term.toUpperCase())).slice(0,4).map((product:Product) => (
                                                <div key={product.id}>
                                                    <div className="flex">
                                                        <Link  to={`/product/${product.id}`}>
                                                        <div className="flex flex-col gap-4 w-full">
                                                                <img src={`/${product.imageUrl}`} alt={product.title} className="h-[360px] w-[260px] object-cover"></img>
                                                            <div className="flex flex-col gap-1 h-20">
                                                                <h2 className="text-[14px]">{(product.title)}</h2>
                                                                <p className="capitalize text-sm text-gray-500">{(product.variants[0].gender).toLowerCase()}</p>
                                                                {product.discountPercentage > 0 ? (
                                                                    <div className="flex gap-2">
                                                                        <p className="text-[14px] font-semibold">R${((product.variants[0].price) - (product.variants[0].price * (product.discountPercentage/100))).toFixed(2)}</p>
                                                                        <p className="text-[14px] text-red-700 line-through">R${(product.variants[0].price)}</p>
                                                                    </div>    
                                                                ) : (
                                                                    <p className="w-full text-[14px] font-semibold">R${(product.variants[0].price).toFixed(2)}</p>      
                                                                )}
                                                            </div>
                                                        </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p>Nenhum produto encontrado</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
     );
}
 
export default SearchTab;