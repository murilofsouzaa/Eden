import {Routes, Route, useLocation} from 'react-router-dom'
import {useEffect} from 'react'
import './App.css'
import Homepage  from './pages/Homepage/Homepage.tsx';
import ProductDetail from './pages/DetailsPage/DetailsPage.tsx'
import {useCart} from './context/CartContext'
import {Cart} from './layout/Cart/Cart'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import {Toaster} from 'sonner'



if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function App() {

  const location = useLocation();

  const cart = useCart();
  const isOpen = cart.isOpen;

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
    <>
      <Toaster position="top-center" duration={2500} closeButton />
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
    </>
    
  )
}

export default App
