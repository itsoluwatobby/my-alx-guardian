import { CiSearch } from "react-icons/ci"

type InputProps = {
  search: string;
  classNames?: string;
  inputClassNames?: string;
  searchClassNames?: string;
  excludeSearch?: boolean;
  placeholder?: string;
  max?: number;
  min?: number;
  setSearch: React.Dispatch<React.SetStateAction<string>>
}
export const Input = ({ search, setSearch, classNames, searchClassNames = '', excludeSearch = false, placeholder = 'search', inputClassNames='', max, min }: InputProps) => {

  return (
    <div className={`self-center w-[80%] flex bg-white items-center gap-1.5 h-10 pl-1 rounded-md ${classNames}`}>
      {!excludeSearch ? <CiSearch className={`size-6 text-black font-bold ${searchClassNames}`} /> : null}
      <input type="text" 
        value={search}
        className={`focus:ring-0 focus:border-0 focus:outline-0 text-black w-full h-full rounded-md ${inputClassNames}`}
        placeholder={placeholder}
        maxLength={max}
        minLength={min}
        onChange={event => setSearch(event.target.value)}
      />
    </div>
  )
} 