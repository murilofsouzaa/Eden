import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import ProductProvider from './context/ProductContext'
import CartProvider from './context/CartContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
