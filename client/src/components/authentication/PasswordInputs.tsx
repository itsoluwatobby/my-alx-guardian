import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs'
import { ChangeEvent, useState, useEffect } from 'react'
import PasswordChecker from './PasswordChecker'
import { useLocation } from 'react-router-dom'
import { validation_regex } from '../../utility/validation'

type PasswordInputProps = {
  value: string,
  name: string,
  label?: string,
  conflict?: boolean;
  match?: boolean;
  reveal: boolean;
  textCheck?: string;
  handleUserInfo: (event: ChangeEvent<HTMLInputElement>) => void;
  setReveal: React.Dispatch<React.SetStateAction<boolean>>;
}

const initValidState = {
  correctPasswordFormat: true
}
export const PasswordInputs = ({ reveal, textCheck, setReveal, handleUserInfo, match, conflict, value, name, label }: PasswordInputProps) => {
  const [valid, setValid]= useState<typeof initValidState>(initValidState)
  const { pathname } = useLocation()
  const Paths = ['/signup', '/newPassword']
  const { correctPasswordFormat } = valid

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if(Paths.includes(pathname) && name === 'password' && validation_regex['passwd'].test(value)){
      timerId = setTimeout(() => setValid(prev => ({...prev, correctPasswordFormat: false})), 3000)
    }
    else setValid(prev => ({...prev, correctPasswordFormat: true}))
    return () => clearTimeout(timerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, name, pathname])

  return (
    <div className="relative flex flex-col w-full">
      <div className='flex items-center mobile:text-base'>
        {
          (label === 'New Password' && conflict && value ) ? <span className='animate-pulse text-red-300 text-[15px]'>Not the same as previous</span> : null
        }
      </div>
      <div className={`relative w-full rounded-md h-9 mobile:h-10 ${Paths.includes(pathname) && name === 'password' && value && (validation_regex['passwd'].test(value) ? 'border-2 border-green-600' : 'border-2 border-red-500 animate-pulse')} ${name === 'confirmPassword' && value && (match ? 'border-2 border-green-600' : 'border-2 border-red-500 animate-pulse')}`}>
        <input type={reveal ? 'text' : 'password'} id={name} name={name} 
        value={value} min={7} autoComplete='off'
        required onChange={handleUserInfo}
        placeholder='*****************'
        className="font-sans w-full rounded-[3px] focus:outline-0 border-0 shadow-sm h-full placeholder:text-gray-700 text-black py-1 px-2"
        />
        <div 
          onClick={() => setReveal(prev => prev = prev ? false : true)}
          className={`absolute right-1 top-2 cursor-pointer w-fit rounded-full text-black text-2xl`}>
          {
            reveal ?
            <BsEyeSlashFill className='text-xl' />
            : <BsEyeFill className='text-xl' />
          }
        </div>
      </div>
      {(Paths.includes(pathname) && name === 'password' && value?.length && correctPasswordFormat) ? <PasswordChecker password={value} /> : null}
      {(Paths.includes(pathname) && name === 'confirmPassword' && value?.length && !match) ? <div className='bg-opacity-70 text-red-500 bg-gray-950 text-[11px] px-2'>{textCheck}</div> : null}
    </div>
  )
}
