
type InputProps = {
  input: string;
  classNames?: string;
  inputClassNames?: string;
  placeholder?: string;
  max?: number;
  min?: number;
  setInput: React.Dispatch<React.SetStateAction<string>>
}
export const TextArea = ({ input, setInput, classNames, placeholder = 'search', inputClassNames='', max, min }: InputProps) => {

  return (
    <div className={`self-center w-[80%] flex bg-white items-center gap-1.5 h-10 pl-1 rounded-md ${classNames}`}>
      <textarea 
        value={input}
        className={`${inputClassNames} resize-none focus:ring-0 focus:border-0 focus:outline-0 text-black w-full h-full rounded-md`}
        placeholder={placeholder}
        maxLength={max}
        minLength={min}
        onChange={event => setInput(event.target.value)}
      />
    </div>
  )
} 