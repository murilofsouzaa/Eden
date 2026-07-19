export function VideoSection() {
    return(
        <div className="relative">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-200 object-cover brightness-40 lg:max-h[225]"
            >
                <source src="/videoclip/black-white-man-pushing-bench.mp4" type="video/mp4" />
            </video>
            <div className="absolute top-[40%] lg:mx-20">
                <h2 className=" text-4xl text-white font-bold mb-3 ml-6 lg:ml-14 lg:text-5xl">Coleção Runner</h2>
                <p className="text-white ml-6 mb-3 lg:mb-3 lg:ml-14">Conforto, tecnologia e estilo</p>
                <button className="btn bg-white text-black ml-6 lg:ml-14">Comprar AGORA</button>
            </div>
        </div>
    )
}