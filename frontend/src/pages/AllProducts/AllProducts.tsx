import {useEffect, useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {api} from '../../services/api';

type ProductVariant = {
    price: number;
    stock: number;
    defaultVariant?: boolean;
};

type ProductItem = {
    id: number;
    title: string;
    description: string;
    modeling?: string;
    imageUrl: string;
    discountPercentage: number;
    variants?: ProductVariant[];
};

type FilterType = 'all' | 'category' | 'modeling' | 'accessories';

const categoryLabels: Record<string, string> = {
    shirts: 'Camisetas',
    t_shirts: 'Camisetas',
    regatta: 'Regatas',
    pants: 'Calças',
    legging: 'Leggings',
    shorts: 'Shorts',
    set: 'Conjuntos',
    shoes: 'Tênis',
    caps: 'Bonés',
    bags: 'Bolsas',
    belts: 'Cintos',
    hats: 'Chapéus',
    water_bottle: 'Garrafas',
    accessory: 'Acessórios',
    sweatshirts: 'Moletom',
};

function formatPrice(price: number) {
    return price.toFixed(2).replace('.', ',');
}

function getPageInfo(searchParams: URLSearchParams) {
    const type = (searchParams.get('type') ?? 'all') as FilterType;
    const value = searchParams.get('value') ?? '';

    switch (type) {
        case 'category':
            return {
                title: categoryLabels[value] ?? value.toUpperCase(),
                endpoint: `/api/products/category/${value}`,
            };
        case 'modeling':
            return {
                title: value || 'Modelagem',
                endpoint: `/api/products/modeling/${value || 'Oversized'}`,
            };
        case 'accessories':
            return {
                title: 'Acessórios',
                endpoint: '/api/products/acessories',
            };
        case 'all':
        default:
            return {
                title: 'Todos os produtos',
                endpoint: '/api/products',
            };
    }
}

export default function AllProducts() {
    const [searchParams] = useSearchParams();
    const {title, endpoint} = useMemo(() => getPageInfo(searchParams), [searchParams]);
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadProducts() {
            setLoading(true);
            setError('');

            try {
                const response = await api.get<ProductItem[]>(endpoint);
                if (isMounted) {
                    setProducts(response.data);
                }
            } catch {
                if (isMounted) {
                    setProducts([]);
                    setError('Não foi possível carregar os produtos.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, [endpoint]);

    return (
        <div className="mx-4 my-10 lg:mx-16">
            <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.2em] text-black/50">EDEN / Produtos</p>
                <h1 className="mt-2 text-3xl font-bold">{title}</h1>
                <p className="mt-2 text-black/60">
                    Esta página lê os filtros pela URL e busca os produtos no endpoint correspondente.
                </p>
            </div>

            {loading && <p className="text-black/60">Carregando produtos...</p>}

            {!loading && error && <p className="text-red-600">{error}</p>}

            {!loading && !error && products.length === 0 && (
                <p className="text-black/60">Nenhum produto encontrado para este filtro.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => {
                    const variants = product.variants ?? [];
                    const defaultVariant = variants.find((variant) => variant.defaultVariant);
                    const variantToShow = defaultVariant ?? variants[0];
                    const hasPrice = variantToShow?.price != null;
                    const discountedPrice = hasPrice
                        ? variantToShow.price - (variantToShow.price * product.discountPercentage) / 100
                        : 0;

                    return (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="h-96 w-full object-cover"
                            />
                            <div className="p-4">
                                <p className="text-lg font-medium group-hover:underline">{product.title}</p>
                                <p className="mt-1 text-sm text-black/60 line-clamp-2">{product.description}</p>
                                {product.modeling && (
                                    <p className="mt-2 text-sm text-black/50">Modelagem: {product.modeling}</p>
                                )}
                                {hasPrice && (
                                    <div className="mt-3 flex flex-col gap-1">
                                        {product.discountPercentage > 0 ? (
                                            <>
                                                <p className="text-sm text-black/45 line-through">R$ {formatPrice(variantToShow.price)}</p>
                                                <p className="text-lg font-semibold text-green-600">R$ {formatPrice(discountedPrice)}</p>
                                            </>
                                        ) : (
                                            <p className="text-lg font-semibold text-black">R$ {formatPrice(variantToShow.price)}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
