import {useContext} from 'react';
import {AccessoriesContext} from '../src/context/AccessoriesContext';

function useAccessories() {
    const context = useContext(AccessoriesContext);

    return context.accessories;
}

export default useAccessories;