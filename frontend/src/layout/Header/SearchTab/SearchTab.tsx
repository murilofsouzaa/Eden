import {useState} from 'react';
import type {Product} from '../../../context/ProductContext'
import {Dialog} from '@headlessui/react'
import {Link} from 'react-router-dom'
import {Search} from 'lucide-react'


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
                <Dialog.Panel className={`fixed flex justify-center bottom-0 z-40 h-[220p] overflow-y-scroll
                                cart-div rounded-xl bg-gray-50 shadow-lg
                                overflow-x-hidden w-full
                                md:rounded-none lg:rounded-none xl:rounded-none
                                lg:max-h-[460px] lg:top-0
                                lg:max-h-[460px] lg:top-0
                                md:max-h-[460px] md:top-0
                                xl:max-h-[460px] xl:top-0
                                ${isActive ? "translate-0 opacity-100" : " translate-x-20 opacity-0"} duration-100 transition-all`}>
                    
                    <div className="flex flex-col justify-center items-center p-4">
                        <div className="p-10">
                            <div className="hidden lg:flex lg:justify-between lg:gap-4 lg:bg-gray-100 rounded-3xl ease-in-out duration-300 hover:cursor-pointer">
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
                                    className="pr-4 py-3 outline-0"></input>
                            </div>
                            <div className="flex justify-start gap-2 border-b w-[full] lg:hidden">
                                <Search className="h-4 text-[#242424]"></Search>
                                <input type="text" name="" id="" placeholder="Buscar o que procura..."
                                className= " outline-0"/>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-4 z-10 h-full w-full">
                            {products.some((product) => termMatches(product, term)) == true ? (
                                products.filter((product) => product.title.toUpperCase().includes(term.toUpperCase())).slice(0,9).map((product:Product) => (
                                    <div key ={product.id}>                                    
                                        <Link  to={`/product/${product.id}`}>
                                        <div className="flex flex-col gap-4 w-[140px]">
                                            <img src={product.imageUrl} alt={product.title} className="h-50 w-auto object-cover"></img>
                                            <div className="h-20">
                                                <h2 className="text-sm text-center">{(product.title).slice(0,22)}...</h2>
                                            </div>
                                        </div>
                                        </Link>
                                    </div>
                                ))) : (
                                    <p>Nenhum produto encontrado</p>
                                ) }
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
     );
}
 
export default SearchTab;