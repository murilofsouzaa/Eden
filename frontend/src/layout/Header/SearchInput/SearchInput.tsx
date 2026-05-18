import {Search} from 'lucide-react'

export type SearchInputProps={
    toggleSearch: () => void;
}

const SearchInput = ({toggleSearch}:SearchInputProps) => {
    return ( 
        <button onClick={toggleSearch} className="flex items-center justify-between gap-4 bg-gray-100 rounded-3xl px-12 py-2.5 ease-in-out duration-300 hover:cursor-pointer">
            <Search className="h-5 w-auto text-black/60"></Search>
            <input type="text" id="search" name="search" placeholder="O que procura para hoje?" className="caret-transparent outline-0"></input>
        </button>
     );
}
 
export default SearchInput;