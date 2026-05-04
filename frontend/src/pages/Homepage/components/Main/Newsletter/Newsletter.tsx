import edenLogo from '../../../../../../public/logo/logo-inverted-removebg.png'

export function Newsletter() {
    return(
        <div className="flex flex-col justify-center items-center gap-5
            bg-black/90 rounded-2xl text-white p-20
            md:w-[60%] lg:w-[70]">
            <div>
                <img src={edenLogo} className="w-auto h-20"></img>
            </div>
            <div className="sm:w-full">
                <p className="text-center">Assine nossa newsletter e fique por dentro das últimas novidades e promoções</p>
            </div>
            <div className="flex flex-col gap-6 justify-center items-center">
                <form>
                    <input type="text" name="newsletter" id="newsletter" 
                    className="border-b border-b-white outline-0 p-3 text-white 
                    md:w-[300px] lg:w-[400px]" 
                    placeholder="Digite melhor seu email"/>
                </form>
                <button className="bg-white p-3 rounded-2xl w-[60%] text-black
                hover:cursor-pointer hover:scale-[0.98] transition-all duration-400
                active:scale-[0.95]">
                    Inscrever-se
                </button>
            </div>
        </div>
    )
}