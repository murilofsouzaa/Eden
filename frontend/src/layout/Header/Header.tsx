import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import './Header.css';
import logoHeader from '../../../public/logo/logo.png';
import userIcon from '../../../public/icons/user.png';
import shoppingBag from '../../../public/icons/shopping-bag.png';
import {Search} from 'lucide-react'
import {useCart} from '../../context/CartContext'
import { toast } from 'sonner'
import SearchTab from './SearchTab/SearchTab'
import SearchInput from './SearchInput/SearchInput'
import useProducts from '../../../hooks/useProducts'

const labels : React.ReactNode[] = [
    <span key={1} className="text-sm"><span className="font-bold">FRETE GRÁTIS</span> EM COMPRAS ACIMA DE R$299</span>,
    <span key={2} className="text-sm">COMPRE SEM MEDO, A PRIMEIRA TROCA É GRÁTIS</span>,
    <span key={3} className="text-sm">PARCELE ATÉ 12x NO CARTÃO</span>
];

export function Header(){
    
    const [currentIndex, setCurrentIndex] = useState<number>(0);  
    const [showSlider, setShowSlider] = useState<boolean>(true);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

    const hideSliderAt = 40;
    const showSliderAt = 12;
    
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            setShowSlider((current) => {
                if (scrollY > hideSliderAt) return false;
                if (scrollY < showSliderAt) return true;
                return current;
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cart = useCart();
    const cartQuantity = cart.totalItems;
    const toggleCart = cart.toggleCart;
    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useState<boolean>(!!localStorage.getItem('token'));

    useEffect(() => {
        const onAuth = () => setIsLogged(!!localStorage.getItem('token'));
        window.addEventListener('authChanged', onAuth);
        window.addEventListener('storage', onAuth);
        return () => {
            window.removeEventListener('authChanged', onAuth);
            window.removeEventListener('storage', onAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
        void cart.fetchCart();
        toast.success('Desconectado');
        navigate('/');
        window.dispatchEvent(new Event('authChanged'));
    }

    const products = useProducts();

    const toggleSearch = () =>{
        setIsSearchActive((prev) => !prev);
    }

    return (
        <div className="sticky top-0 z-10 bg-white border-b-2 border-b-black/10">
            <div className="flex flex-col m-0 p-0">
                <div className={`invert bg-gray-200 text-center overflow-hidden duration-300 ease-in-out ${showSlider ? 'max-h-14 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                    {labels[currentIndex]}
                </div>
                <nav className="flex flex-col justify-center items-center m-2 mx-5
                    md:m-0 md:mx-10
                    lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4 lg:mx-14">
                    <div className="flex items-center justify-between gap-4 w-full lg:hidden">
                        <div className="flex justify-start gap-3">
                            <button onClick={toggleSearch} className="flex justify-center items-center">
                                <Search className="h-6 text-[#242424]"></Search>
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <Link to="/"><img src={logoHeader} alt="eden-logo-header" className="w-13 h-13" /></Link>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <div className="flex gap-3">
                                {isLogged ? (
                                    <button onClick={handleLogout} className="py-5 w-full hover:cursor-pointer text-sm font-normal">Sair</button>
                                ) : (
                                    <Link to="/u/login">
                                        <div className="hover:-translate-y-2.5 ease-in-out duration-300 py-5 w-full hover:cursor-pointer">
                                            <img src={userIcon} alt="user-icon" className="h-10 w-auto object-contain"></img>
                                        </div>
                                    </Link>
                                )}
                                <button onClick={toggleCart} className="relative cursor-pointer py-5 w-full hover:-translate-y-2.5 ease-in-out duration-300">
                                    <img src={shoppingBag} alt="shopping-bag-icon" className="h-6 w-auto object-contain"></img>
                                    <div className="absolute flex justify-center items-center top-4 left-3 text-[11px] rounded-[50%] w-4.5 h-4.5 p-2.5 bg-blue-200">
                                        <span className="">{cartQuantity}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:w-full lg:gap-6">
                        <ul className="flex gap-7 justify-self-start">
                            <li><Link to='/'>Mulheres</Link></li>
                            <li><Link to='/'>Homens</Link></li>
                            <li><Link to='/'>Acessórios</Link></li>
                            <li><Link to=''>Explorar</Link></li>
                        </ul>

                        <div className="justify-self-center">
                            <Link to="/"><img src={logoHeader} alt="eden-logo-header" className="lg:w-13 lg:h-13" /></Link>
                        </div>

                        <div className="flex items-center justify-self-end gap-4">
                            <SearchInput toggleSearch={toggleSearch}></SearchInput>
                            <div className="flex items-center gap-3">
                                {isLogged ? (
                                    <button onClick={handleLogout} className="py-5 w-full hover:cursor-pointer text-sm font-normal">Sair</button>
                                ) : (
                                    <Link to="/u/login">
                                        <div className="hover:-translate-y-2.5 ease-in-out duration-300 py-5 w-full hover:cursor-pointer">
                                            <img src={userIcon} alt="user-icon" className="h-10 w-auto object-contain"></img>
                                        </div>
                                    </Link>
                                )}
                                <button onClick={toggleCart} className="relative cursor-pointer py-5 w-full hover:-translate-y-2.5 ease-in-out duration-300">
                                    <img src={shoppingBag} alt="shopping-bag-icon" className="h-6 w-auto object-contain"></img>
                                    <div className="absolute flex justify-center items-center top-4 left-3 text-[11px] rounded-[50%] w-4.5 h-4.5 p-2.5 bg-blue-200">
                                        <span className="">{cartQuantity}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <SearchTab products={products} isSearchActive={isSearchActive} toggleSearch={toggleSearch}></SearchTab>
            </div>
        </div>
    )
}