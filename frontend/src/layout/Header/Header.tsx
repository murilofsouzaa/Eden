import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './Header.css';
import {Cart} from '../Cart/Cart';
import logoHeader from '../../../public/logo/logo.png';
import userIcon from '../../../public/icons/user.png';
import shoppingBag from '../../../public/icons/shopping-bag.png';
import hamburgerIcon from '../../../public/icons/hamburguer.png';
import SearchInput from './SearchInput/SearchInput'

const labels : React.ReactNode[] = [
    <label key={1} className="text-sm"><span className="font-bold">FRETE GRÁTIS</span> EM COMPRAS ACIMA DE R$299</label>,
    <label key={2} className="text-sm">COMPRE SEM MEDO, A PRIMEIRA TROCA É GRÁTIS</label>,
    <label key={3} className="text-sm">PARCELE ATÉ 12x NO CARTÃO</label>
];

export function Header(){
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState(false);
    
    
    useEffect(() => {
        //retorna um ID para o clearInterval
    const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % labels?.length);
    }, 3000);

    return () => {
        clearInterval(interval); //precisa ser liberado para não rodar quando o usuário trocar de paǵina
    };                          //precisa de um ID
}, []);
    // para i = 1
    // 1 + 0 % 3 -> 1 % 3 = 1, pois 1/3 o quociente fica 0 e o resto será 1

    function handleShoppingBagClick(){
        setActive((prev) => (!prev))
    }

    return (
        <div className="sticky top-0 z-101 w-full bg-white border-b-2 border-b-black/10">
            <div className="flex flex-col m-0 p-0">
                <div className="bg-gray-200 p-3 text-center">{labels[currentIndex]}</div>
                <nav className="flex flex-col justify-center items-center m-4 
                    lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4 lg:m-4 lg:p">
                    <ul className="hidden 
                        lg:visible lg:flex lg:gap-7">
                        <li><a href="#">Mulheres</a></li>
                        <li><a href="#">Homens</a></li>
                        <li><a href="#">Acessórios</a></li>
                        <li><a href="#">Explorar</a></li>
                    </ul>
                    
                    <Link to="/"><img src={ logoHeader} alt="eden-logo-heaeder" className="hidden lg:inline lg:w-13 lg:h-13" /></Link>
                    <div className="flex items-center justify-center gap-5 lg:flex lg:justify-center lg:items-center lg:gap-10">
                        <img src={hamburgerIcon} className="w-8 h-8 lg:hidden"></img>
                        <SearchInput
                            handleShoppingBagClick={handleShoppingBagClick}/>
                        <div className="flex gap-5 w-[100%]">
                            <a href="#" className="hover:translate-y-[-10px] ease-in-out duration-300 py-5">
                                <img src={userIcon} alt="user-icon" className="h-6 w-auto object-contain"></img>
                            </a>
                            <button onClick={handleShoppingBagClick} className="cursor-pointer py-5
                            hover:translate-y-[-10px] ease-in-out duration-300">
                                <img src={shoppingBag} alt="shopping-bag-icon" className="h-6 w-auto object-contain"></img>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="">
                {active === true && (
                    <Cart onClose={() => setActive(false)}/>
                )}
            </div>
        </div>
    )
}