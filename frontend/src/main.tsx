import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import ProductProvider from './context/ProductContext'
import AccessoriesProvider from './context/AccessoriesContext'
import CartProvider from './context/CartContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <AccessoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AccessoriesProvider>
      </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
