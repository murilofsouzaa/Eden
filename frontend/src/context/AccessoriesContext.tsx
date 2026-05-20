/* eslint-disable react-refresh/only-export-components */
import {createContext, useEffect, useState} from 'react';
import {api} from '../services/api';

export type Accessory = {
    id: number;
    title: string;
    stock: number;
    material: string;
    weight: number;
    brand: string;
    imageUrl: string;
    price: number;
    discountPercentage: number;
};

type AccessoriesContextType = {
    accessories: Accessory[];
};

export const AccessoriesContext = createContext<AccessoriesContextType>({
    accessories: [],
});

type AccessoriesProviderProps = Readonly<{
    children: React.ReactNode;
}>;

export function AccessoriesProvider({children}: AccessoriesProviderProps) {
    const [accessories, setAccessories] = useState<Accessory[]>([]);

    useEffect(() => {
        api.get<Accessory[]>('/api/acessories')
            .then((response) => {
                setAccessories(response.data);
            })
            .catch(() => {
                setAccessories([]);
            });
    }, []);

    return (
        <AccessoriesContext.Provider value={{accessories}}>
            {children}
        </AccessoriesContext.Provider>
    );
}

export default AccessoriesProvider;