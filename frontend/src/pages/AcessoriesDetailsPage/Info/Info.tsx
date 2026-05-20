import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CreditCard} from 'lucide-react';
import {api} from '../../../services/api';
import type {Accessory} from '../../../context/AccessoriesContext';
import PriceOffLabel from '../../../components/ui/PriceOffLabel';

const formatPrice = (value: number) => value.toFixed(2).replace('.', ',');

const AccessoryInfo = () => {
    const {id} = useParams();
    const [accessory, setAccessory] = useState<Accessory | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        if (!id) {
            setAccessory(null);
            setIsLoading(false);
            return;
        }

        api.get<Accessory>(`/api/acessories/${id}`)
            .then((response) => setAccessory(response.data))
            .catch(() => setAccessory(null))
            .finally(() => setIsLoading(false));
    }, [id]);

    const hasDiscount = (accessory?.discountPercentage ?? 0) > 0;
    const discountedPrice = useMemo(() => {
        if (accessory?.price == null) return 0;
        return accessory.price - (accessory.price * accessory.discountPercentage / 100);
    }, [accessory]);
    const installmentPrice = useMemo(() => {
        if (accessory?.price == null) return '0,00';
        return formatPrice(accessory.price / 12);
    }, [accessory]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-40">
                <p className="text-center text-black/60 text-xl">Carregando acessório...</p>
            </div>
        );
    }

    if (!accessory) {
        return (
            <div className="flex justify-center items-center p-40">
                <p className="text-center text-black/60 text-xl">Acessório não encontrado</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden p-5 lg:grid lg:grid-cols-4 lg:col-start-2 lg:p-5 lg:flex-row">
            <div className="col-start-2">
                <div className="flex justify-center items-center">
                    <img
                        src={accessory.imageUrl}
                        alt={accessory.title}
                        className="w-full object-cover sm:w-auto sm:h-100 md:w-auto md:h-140 lg:w-auto lg:h-195 xl:w-auto xl:h-220"
                    />
                </div>
            </div>

            <div className="col-start-3 w-full">
                <div className="flex flex-col justify-center items-center mt-6 p-5 lg:justify-baseline lg:items-start lg:mx-18 w-full">
                    <h1 className="text-lg lg:text-xl font-semibold">{accessory.title}</h1>

                    <div className="flex flex-col my-4">
                        {hasDiscount ? (
                            <div className="flex justify-center items-center gap-3">
                                <label className="text-lg text-black/50 line-through">R$ {formatPrice(accessory.price)}</label>
                                <PriceOffLabel discountPercentage={accessory.discountPercentage} />
                            </div>
                        ) : null}
                        <label className="text-3xl text-black font-semibold">R$ {formatPrice(hasDiscount ? discountedPrice : accessory.price)}</label>
                    </div>

                    <label className="text-[15px] flex gap-2 mt-1">
                        <span className="text-black/70">
                            <div className="flex justify-center items-center">
                                <CreditCard className="h-5 w-auto"/>
                            </div>
                        </span>
                        <span className="text-black/70">Em até</span><span className="font-semibold">12x</span><span className="text-black/70">de</span><span className="font-semibold">R${installmentPrice}</span>
                    </label>

                    <div className="w-75 mt-5 ">
                        <span className="text-center bg-green-100 text-green-600 text-sm py-2 px-4 rounded-2xl md:w-full lg:w-full">
                            Frete grátis nas compras acima de R$299
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccessoryInfo;