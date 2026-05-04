/* eslint-disable react-refresh/only-export-components */
import {createContext, useState, useEffect} from 'react'
import { api } from '../services/api';

export type ProductVariant = {
    id: number;
    price: number;
    defaultVariant: boolean;
    size: string;
    category: string;
    gender: string,
    stock: number
    description:string
};

export type Product = {
    id: number;
    title: string;
    description: string;
    material:string;
    modeling:string;
    weight:string;
    discountPercentage:number;
    bundleId:number | null
    imageUrl: string;
    variants: ProductVariant[];
};

export const ProductContext = createContext<Product[]>([]);

type ProductProviderProps = Readonly<{
    children: React.ReactNode;
}>;

export function ProductProvider({children}: ProductProviderProps){

    //Nessa parte aqui, eu usei :{children: React.ReactNode}, pois o tipo do children é um componente
    //O que esse tipo está dizendo é: o children vai ser um objeto que tenha um children dentro de qualquer tipo

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
            api.get("/api/products")
            .then((response) => {
                setProducts(response.data)
            })
        }, []);
    //Não colocar products na dependência pois o axios.get vai retornar um novo array na memória, o que a dependência
    //considera como mudança, então entraria em um loop de requests

    return ( 
            <ProductContext.Provider value={products}>
                {children}
            </ProductContext.Provider>
     );
}
 
export default ProductProvider;