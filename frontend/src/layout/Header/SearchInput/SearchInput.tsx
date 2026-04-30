import searchIcon from '../../../../public/icons/search.png';

type SearchInputProps = {
    readonly handleShoppingBagClick: () => void;
}

const SearchInput = ({handleShoppingBagClick}:SearchInputProps) => {
    return ( 
        <div className="flex flex-row-reverse justify-end gap-2 md:w-70 lg:w-80 xl:w-110 border-b p-2">
            <form className="">
                <input type="search" placeholder="Buscar" className=" focus:outline-0" />
            </form>
            <button onClick={handleShoppingBagClick} className="cursor-pointer">
                <img src={searchIcon} className="w-auto h-6"></img>
            </button>
        </div>
     );
}
 
export default SearchInput;