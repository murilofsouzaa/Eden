import {useState} from 'react'
import type {Product} from '../../../../../../context/ProductContext' 
import {ChevronDown} from 'lucide-react';

export type ProductDetailsProps={
    selectedProduct:Product;
}

const ProductDetails = ({selectedProduct}:ProductDetailsProps) => {

    const [active, setActive] = useState(false);

    const handleActiveClick = () =>{
            setActive((prev) => !prev)
        }

    return ( 
        <div className="w-full mt-5 py-4 border-t border-t-[#acacac98]">
            <div onClick={handleActiveClick} className="flex justify-between mb-2 cursor-pointer">
                <label className="font-semibold cursor-pointer">Detalhes do Produto</label>
                <div className="text-gray-600">
                    <ChevronDown className={`transform duration-300 ${active ? 'rotate-180' : 'rotate-0'}`}></ChevronDown>
                </div>
            </div>
                <div className={`
                grid transition-[grid-template-rows, opacity] duration-300 ease-in-out
                ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    
                    <div className="overflow-hidden">
                        <div className="flex gap-2 font-light">
                            <label>Material:</label>
                            <p>{`${selectedProduct.material}`}</p>
                        </div>
                        <div className="flex gap-2 font-light">
                            <label>Modelagem:</label>
                            <p>{`${selectedProduct.modeling}`}</p>
                        </div>
                        <div className="flex gap-2 font-light">
                            <label>Gramatura: </label>
                            <p>{`${selectedProduct.weight}`} </p>
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
export default ProductDetails;