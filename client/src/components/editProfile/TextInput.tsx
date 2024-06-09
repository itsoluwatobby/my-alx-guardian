import { ChangeEvent } from "react";

type TextInputType = {
  name: string;
  value: string;
  placeholder: string;
  classNames?: string;
  max: number;
  type?: 'text' | 'url';
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({ value, max, handleChange, placeholder, name, classNames = '', type = 'text' }: TextInputType) => {

  return (
    <input type={type}
    value={value}
    name={name}
    maxLength={max}
    placeholder={placeholder}
    className={`focus:border-0 focus:ring-0 focus:outline-0 placeholder:text-[#585858] text-black rounded-[3px] border border-[#b3b1b1] p-2 py-1.5 w-full lg:w-[80%] shadow-md ${classNames}`}
    onChange={handleChange}
    />
  )
}