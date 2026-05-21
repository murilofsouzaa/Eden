import {useState} from 'react';
import {Link} from 'react-router-dom'
import {GenderButton} from './components/GenderButton';

export function CategorySection() {

    const [gender, setGender] = useState<'female' | 'male'>('female');
    
    return(
        <>
        <h2 className="text-2xl font-bold mb-6">CONHEÇA AS CATEGORIAS</h2>
                <GenderButton gender={gender} onChangeGender={setGender} />

                <Link to='/category/:category'>
                    <div
                        className="flex flex-nowrap gap-5 mt-5 overflow-x-auto pb-2">
                            {(gender === 'male'
                                ? [
                                        { id: 1, name: 'Camisetas', image: '/clothes/men/gymshark-black-oversized-masculine.jpeg' },
                                        { id: 2, name: 'Calças', image: '/clothes/men/white-pants-masculine-front.jpeg' },
                                        { id: 3, name: 'Shorts', image: '/clothes/men/gymshark-black-short-masculine.jpeg' },
                                        { id: 4, name: 'Tênis', image: '/clothes/men/nike-shite-shoes.jpeg' },
                                    ]
                                    : [
                                                    { id: 5, name: 'Leggings', image: '/clothes/women/gymshark-green-legging.jpeg' },
                                                    { id: 6, name: 'Conjuntos', image: '/clothes/women/gymshark-grey-set-women.jpeg' },
                                                    { id: 7, name: 'Oversized', image: '/clothes/women/gymshark-woman-oversized-black.jpeg' },
                                                    { id: 8, name: 'Tênis', image: '/clothes/women/new-balance-shoes-female.jpeg' },
                                                ]
                        ).map((category) => (
                            <div key={category.id} className="shrink-0 w-64 sm:w-72 md:w-80">
                                <button className="flex flex-col justify-center w-full text-left hover:cursor-pointer">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="product-image-catalog object-cover w-full h-[24rem] lg:h-[36rem]"
                                    />
                                    <p className="text-xl font-light mt-4">{category.name}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                </Link>
        </>
    )
}