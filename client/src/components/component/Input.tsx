import { CiSearch } from "react-icons/ci"

type InputProps = {
  search: string;
  classNames?: string;
  inputClassNames?: string;
  excludeSearch?: boolean;
  placeholder?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>
}
export const Input = ({ search, setSearch, classNames, excludeSearch = false, placeholder = 'search', inputClassNames='' }: InputProps) => {

  return (
    <div className={`self-center w-[80%] flex bg-white items-center gap-1.5 h-10 pl-1 rounded-md ${classNames}`}>
      {!excludeSearch ? <CiSearch className="size-6 text-black font-bold" /> : null}
      <input type="text" 
        value={search}
        className={`${inputClassNames} focus:ring-0 focus:border-0 focus:outline-0 text-black w-full h-full rounded-md`}
        placeholder={placeholder}
        onChange={event => setSearch(event.target.value)}
      />
    </div>
  )
} 