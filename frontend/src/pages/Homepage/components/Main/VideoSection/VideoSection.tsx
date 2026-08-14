export function VideoSection() {
    return(
        <div className="relative w-full overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="block h-72 w-full object-cover brightness-40 sm:h-96 lg:h-180"
            >
                <source src="/videoclip/black-white-man-pushing-bench.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14">
                <h2 className="mb-3 text-4xl font-bold text-white lg:text-5xl">Coleção Runner</h2>
                <p className="mb-3 text-white">Conforto, tecnologia e estilo</p>
                <button className="btn bg-white text-black">Comprar AGORA</button>
            </div>
        </div>
    )
}