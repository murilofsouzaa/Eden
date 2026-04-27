import './SizeButtons.css'

const SizeButtons = () => {

    const sizes = ["P", "PP", "M", "G", "GG", "XGG", "XGGG"]

    return ( 
        <div>
            <label>Tamanho</label>
            <div className="flex flex-row gap-4 border p-4">
                {sizes.map((size) => (
                    <button key={size} className={`size-buttons`}>
                        {size}
                    </button>
                ))}
            </div>
        </div>
     );
}
 
export default SizeButtons;