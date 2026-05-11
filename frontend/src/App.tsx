import {Routes, Route, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './App.css'
import Homepage  from './pages/Homepage/Homepage.tsx';
import ProductDetail from './pages/DetailsPage/DetailsPage.tsx'
import {useCart} from './context/CartContext'
import {Cart} from './layout/Cart/Cart'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function App() {

  const titles = ["Compre AGORA sua oversized!", "Tá barato pô, compra ai"]
  const location = useLocation();

  const cart = useCart();
  const isOpen = cart.isOpen;

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

    useEffect(() => {
      window.scrollTo(0,0)
    }, [location]);

    useEffect(() => {
      if(isOpen){
        document.body.style.overflow="hidden";
      }else{
        document.body.style.overflow="unset";
      }
    }, [isOpen]);


  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/product/:id" element={<ProductDetail></ProductDetail>}></Route>
        <Route path="/u/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/u/signup" element={<SignUpPage></SignUpPage>}></Route>
      </Routes>
      <div className="">
                {isOpen && (
                    <Cart/>
                )}
        </div>
    </div>
    
  )
}

export default App
