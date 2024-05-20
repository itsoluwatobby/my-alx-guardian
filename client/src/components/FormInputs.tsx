import { ChangeEvent } from 'react'
import { BsCheck } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

type FormInputProps = {
  value: string,
  name: string,
  placeholder: string,
  type: string,
  validEmail?: boolean,
  autoComplete: 'off' | 'on'
  handleUserInfo: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInputs = ({ 
  handleUserInfo, validEmail, value, name, type, placeholder, autoComplete='off'
}: FormInputProps) => {
  const { pathname } = useLocation();

  return (
    <div className="relative self-center flex items-center w-full mobile:text-base">
      {pathname === '/signup' && name === 'email' && value && (validEmail ? <BsCheck className='text-green-600 text-2xl absolute right-2 top-2'/> : <FaTimes className='ml-1 text-red-500 absolute right-2 top-3' />)}
      <input 
      type={type} id={name} name={name} value={value} 
      placeholder={placeholder}
      required autoComplete={autoComplete} onChange={handleUserInfo} 
      className="rounded-[3px] font-sans focus:ring-0 focus:outline-0 border-0 shadow-sm h-10 text-black p-2 w-full"
      />
    </div>
  )
}