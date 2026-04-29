const PromotionsGreenLabel = () => {

    const label = ["3 por R$199", "4 por R$259,90", "5 por R$299,90"]

    return ( 
            <div>
                <p className="text-center p-5 text-2xl border-t border-t-[#acacac98]  ">LEVE MAIS, PAGUE MENOS</p>
                <div className="flex justify-center items-center gap-5">
                    {label.map((text) => (
                        <span key={text} className="bg-green-200 text-green-700 text-sm font-semibold py-2 px-4 rounded-md">{text}</span>
                    )
                    )}
                </div>
            </div>
     );
}
 
export default PromotionsGreenLabel;