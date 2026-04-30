import {Routes, Route, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './App.css'
import Homepage  from './pages/Homepage/Homepage.tsx';
import ProductDetail from './pages/DetailsPage/DetailsPage.tsx'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function App() {

  const titles = ["Compre AGORA sua oversized!", "Tá barato pô, compra ai"]
  const location = useLocation();

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


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/product/:id" element={<ProductDetail></ProductDetail>}></Route>
      </Routes>
    </>
  )
}

export default App
