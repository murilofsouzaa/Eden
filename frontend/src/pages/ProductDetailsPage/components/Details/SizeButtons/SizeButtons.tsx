import {useState} from 'react';
import './SizeButtons.css'

export type SizeButtonsProps={
    selectedSize:string;
    setSelectedSize: (size:string) => void;
}

const SizeButtons = ({selectedSize, setSelectedSize}:SizeButtonsProps) => {

    const sizes = ["P", "PP", "M", "G", "GG", "XGG", "XGGG"]


    return ( 
        <div>
            <label className="font-bold text-md">Tamanho: {selectedSize}</label>
            <div className="flex flex-row justify-center items-center gap-4 border p-2 mt-2 w-full">
                {sizes.map((size) => (
                    <button key={size} 
                        className={`font-mono size-button`}
                        value={selectedSize}
                        onClick={() => setSelectedSize(size)}
                        >
                        <p className="">{size}</p>
                    </button>
                ))}
            </div>
        </div>
     );
}
 
export default SizeButtons;