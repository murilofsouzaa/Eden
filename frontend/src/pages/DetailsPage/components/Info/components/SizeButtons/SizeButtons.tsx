import './SizeButtons.css'

export type SizeButtonsProps={
    selectedSize:string;
    handleSizeClick: (size:string) => void;
}

const SizeButtons = ({selectedSize="P", handleSizeClick}:SizeButtonsProps) => {

    const sizes = ["P", "M", "G", "GG", "XGG", "XGGG"]

    return ( 
        <div className="font-sans border-t border-t-[#a5a5a59e] py-5">
            <label className=" font-semibold text-md">Tamanho: {selectedSize}</label>
            <div className="flex gap-4 p-2 mt-2 w-full">
                {sizes.map((size) => (
                    <button key={size} 
                        className={` flex justify-center items-center font-sans size-button  ${size === selectedSize ? 'active' : ''}`}
                        value={selectedSize}
                        onClick={() => handleSizeClick(size)}
                        >
                        <p className="font-sans">{size}</p>
                    </button>
                ))}
            </div>
        </div>
     );
}
 
export default SizeButtons;