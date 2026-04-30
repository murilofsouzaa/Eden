import {Routes, Route, useLocation} from 'react-router-dom'
import {useEffect} from 'react'
import './App.css'
import Homepage  from './pages/Homepage/Homepage.tsx';
import ProductDetail from './pages/DetailsPage/DetailsPage.tsx'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function App() {

  const location = useLocation();

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
