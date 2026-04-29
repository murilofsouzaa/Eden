import {ChevronDown} from 'lucide-react'
import type {Product} from '../../../../../context/ProductContext'

export type DescriptionProps={
    active:boolean;
    handleActiveClick: () => void;
    selectedProduct:Product;
}

const Description = ({active, handleActiveClick, selectedProduct}:DescriptionProps) => {
    return ( 
        <div className="mt-5 py-4 border-t border-t-[#acacac98] w-full">
            <div className="flex flex-col">
                <div 
                className="flex flex-row justify-between mb-2 cursor-pointer select-none"
                onClick={handleActiveClick}
                >
                <label className="text-md font-semibold cursor-pointer">Descrição</label>

                <div className="text-gray-600">
                    <ChevronDown 
                    className={`transition-transform duration-300 ${active ? 'rotate-180' : 'rotate-0'}`} 
                    />
                </div>
                </div>

                <div className={`
                grid transition-[grid-template-rows,opacity] duration-300 ease-in-out
                ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <p className="mt-2 text-sm text-gray-700">
                        {selectedProduct?.description}
                        </p>
                    </div>
                </div>
            </div>
    </div>
     );
}

export default Description;