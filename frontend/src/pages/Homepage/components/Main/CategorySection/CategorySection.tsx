import {useState} from 'react';
import {Link} from 'react-router-dom'
import {GenderButton} from './components/GenderButton';

export function CategorySection() {

    const [gender, setGender] = useState<'female' | 'male'>('female');
    const genderQueryValue = gender === 'male' ? 'male' : 'female';
    
    const categories = gender === 'male'
        ? [
            { id: 1, name: 'Camisetas', image: '/clothes/men/gymshark-black-oversized-masculine.jpeg', href: `/products?type=category&value=shirts&gender=${genderQueryValue}` },
            { id: 2, name: 'Calças', image: '/clothes/men/white-pants-masculine-front.jpeg', href: `/products?type=category&value=pants&gender=${genderQueryValue}` },
            { id: 3, name: 'Shorts', image: '/clothes/men/gymshark-black-short-masculine.jpeg', href: `/products?type=category&value=shorts&gender=${genderQueryValue}` },
            { id: 4, name: 'Tênis', image: '/clothes/men/nike-shite-shoes.jpeg', href: `/products?type=category&value=shoes&gender=${genderQueryValue}` },
        ]
        : [
            { id: 5, name: 'Leggings', image: '/clothes/women/gymshark-green-legging.jpeg', href: `/products?type=category&value=legging&gender=${genderQueryValue}` },
            { id: 6, name: 'Conjuntos', image: '/clothes/women/gymshark-grey-set-women.jpeg', href: `/products?type=category&value=set&gender=${genderQueryValue}` },
            { id: 7, name: 'Oversized', image: '/clothes/women/gymshark-woman-oversized-black.jpeg', href: '/products?type=modeling&value=Oversized' },
            { id: 8, name: 'Tênis', image: '/clothes/women/new-balance-shoes-female.jpeg', href: `/products?type=category&value=shoes&gender=${genderQueryValue}` },
        ];

    return(
        <>
        <h2 className="text-2xl font-bold mb-6">CONHEÇA AS CATEGORIAS</h2>
                <GenderButton gender={gender} onChangeGender={setGender} />

                <div
                    className="flex flex-nowrap gap-5 mt-5 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <div key={category.id} className="shrink-0 w-64 sm:w-72 md:w-80">
                                <Link to={category.href} className="flex flex-col justify-center w-full text-left hover:cursor-pointer">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="product-image-catalog object-cover w-full h-[24rem] lg:h-[36rem]"
                                    />
                                    <p className="text-xl font-light mt-4">{category.name}</p>
                                </Link>
                            </div>
                        ))}
                </div>
        </>
    )
}