const edenLogo = '/logo/logo-inverted-removebg.png';

export function Newsletter() {
    return(
        <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col items-center justify-center gap-5 rounded-2xl bg-black/90 px-6 py-12 text-white sm:px-10 sm:py-14 md:px-14 lg:px-16">
            <div className="flex justify-center">
                <img src={edenLogo} className="w-auto h-20"></img>
            </div>
            <div className="w-full max-w-2xl">
                <p className="text-center">Assine nossa newsletter e fique por dentro das últimas novidades e promoções</p>
            </div>
            <div className="flex w-full max-w-2xl flex-col gap-6 justify-center items-center">
                <form className="w-full">
                    <input type="text" name="newsletter" id="newsletter" 
                    className="w-full border-b border-b-white bg-transparent p-3 text-white outline-0" 
                    placeholder="Digite melhor seu email"/>
                </form>
                <button className="w-full rounded-2xl bg-white p-3 text-black sm:w-2/3
                hover:cursor-pointer hover:scale-[0.98] transition-all duration-400
                active:scale-[0.95]">
                    Inscrever-se
                </button>
            </div>
        </div>
    )
}