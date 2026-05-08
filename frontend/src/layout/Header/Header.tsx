import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './Header.css';
import logoHeader from '../../../public/logo/logo.png';
import userIcon from '../../../public/icons/user.png';
import shoppingBag from '../../../public/icons/shopping-bag.png';
import hamburgerIcon from '../../../public/icons/hamburguer.png';
import {Search} from 'lucide-react'
import {useCart} from '../../context/CartContext'

const labels : React.ReactNode[] = [
    <label key={1} className="text-sm"><span className="font-bold">FRETE GRÁTIS</span> EM COMPRAS ACIMA DE R$299</label>,
    <label key={2} className="text-sm">COMPRE SEM MEDO, A PRIMEIRA TROCA É GRÁTIS</label>,
    <label key={3} className="text-sm">PARCELE ATÉ 12x NO CARTÃO</label>
];

export function Header(){
    
    const [currentIndex, setCurrentIndex] = useState(0);    
    
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

    const cart = useCart();
    const cartQuantity = cart.totalItems;
    const toggleCart = cart.toggleCart;

    return (
        <div className="sticky top-0 z-10 bg-white border-b-2 border-b-black/10">
            <div className="flex flex-col m-0 p-0">
                <div className="invert bg-gray-200 p-3 text-center">{labels[currentIndex]}</div>
                <nav className="flex flex-col justify-center items-center m-14
                    md:m-2
                    lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4 lg:mx-14 lg:my-2">
                    <ul className="hidden 
                        lg:visible lg:flex lg:gap-7">
                        <li><a href="#">Mulheres</a></li>
                        <li><a href="#">Homens</a></li>
                        <li><a href="#">Acessórios</a></li>
                        <li><a href="#">Explorar</a></li>
                    </ul>
                    
                    <div className="hidden flex justify-center items-center mr-52 lg:inline">
                        <Link to="/"><img src={ logoHeader} alt="eden-logo-header" className="lg:w-13 lg:h-13" /></Link>
                    </div>
                    <div className="flex items-center justify-between w-full  md:justify-between md:w-full lg:flex lg:justify-center lg:items-center lg:gap-10 lg:w-auto">
                        <img src={hamburgerIcon} className="w-8 h-8 lg:hidden"></img>
                        <button className="cursor-pointer">
                            <Search className="h-6 w-auto text-[#474747]"></Search>
                        </button>
                        <div className="flex justify-between items-center gap-3 w-full">
                            <div className="flex gap-3">
                                <Link to="/login">
                                    <div className="hover:translate-y-[-10px] ease-in-out duration-300 py-5 w-full hover:cursor-pointer">
                                        <img src={userIcon} alt="user-icon" className="h-12 w-auto object-contain"></img>
                                    </div>
                                </Link>
                                <button onClick={toggleCart} className="relative cursor-pointer py-5 w-full
                                hover:translate-y-[-10px] ease-in-out duration-300">
                                    <img src={shoppingBag} alt="shopping-bag-icon" className="h-7 w-auto object-contain"></img>
                                    <div className="absolute flex justify-center items-center top-4 left-3 text-[11px] rounded-[50%] w-[18px] h-[18px] p-[10px]  bg-blue-200">
                                        <span className="">{cartQuantity}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}