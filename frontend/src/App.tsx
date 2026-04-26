import {Routes, Route} from 'react-router-dom'
import './App.css'
import Homepage  from './pages/Homepage/Homepage.tsx';
import ProductDetail from './pages/ProductDetail/ProductDetails'
function App() {

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
