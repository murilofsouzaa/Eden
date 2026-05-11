import {useEffect, useState} from 'react'
import { Header }  from '../../layout/Header/Header';
import { Main } from './components/Main/Main';
import { Footer }  from '../../layout/Footer/Footer';
import {Slider} from './components/Slider/Slider';
import useProducts from '../../../hooks/useProducts'
import blackWhiteSmoke from '../../../public/models/smoke-bar.jpg'
import freepikBlackWhite from '../../../public/models/blackwhhite-freepik.jpg'
import  ulfMeier from '../../../public/models/mahtla-preto-branco.jpg'

export default function Home() {
    const products = useProducts();
    
    const slideImages = [blackWhiteSmoke, freepikBlackWhite, ulfMeier];
    const titles = ["Compre AGORA sua oversized! | EDEN", "Tá barato pô, compra ai | EDEN"]

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    
    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % titles.length)
        }, 2000);
    
        return () =>{
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
      document.title=titles[currentIndex]
    }, [currentIndex]);

    
    return(
        <div className="">
            <Header/>
            <Slider images={slideImages} />
            <Main products={products} />
            <Footer />
        </div>
    )
}