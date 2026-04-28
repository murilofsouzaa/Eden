import './SizeButtons.css'

export type SizeButtonsProps={
    selectedSize:string;
    handleSizeClick: (size:string) => void;
}

const SizeButtons = ({selectedSize="P", handleSizeClick}:SizeButtonsProps) => {

    const sizes = ["P", "M", "G", "GG", "XGG", "XGGG"]

    return ( 
        <div className="border-t-1 border-t-[#a5a5a59e] py-5">
            <label className="font-bold text-md">Tamanho: {selectedSize}</label>
            <div className="flex gap-4 p-2 mt-2 w-full">
                {sizes.map((size) => (
                    <button key={size} 
                        className={` flex justify-center items-center font-mono size-button  ${size === selectedSize ? 'active' : ''}`}
                        value={selectedSize}
                        onClick={() => handleSizeClick(size)}
                        >
                        <p className="">{size}</p>
                    </button>
                ))}
            </div>
        </div>
     );
}
 
export default SizeButtons;