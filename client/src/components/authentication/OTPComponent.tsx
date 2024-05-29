import React, { useEffect, useRef, ChangeEvent } from 'react';
import { ActionButton } from '../ActionButton';
import { useGuardianContext } from '../../hooks/useGuardianContext';

type OTPProps = {
  otp: OTPValues,
  setOtp: React.Dispatch<React.SetStateAction<OTPValues>>;
  isLoading: boolean,
  isError: boolean,
  canSubmit: boolean,
  handleSubmit: () => void
}

export default function OTPComponent({ 
  canSubmit, otp, setOtp, isError, isLoading, handleSubmit
}: OTPProps) {
  const { theme } = useGuardianContext() as GuardianContextType;
  const [ref1, ref2, ref3, ref4, ref5, ref6] = [useRef<HTMLInputElement>(), useRef<HTMLInputElement>(), useRef<HTMLInputElement>(), useRef<HTMLInputElement>(), useRef<HTMLInputElement>(), useRef<HTMLInputElement>()]
  const {entry1, entry2, entry3, entry4, entry5, entry6} = otp

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setOtp(prev => ({...prev, [name]: value}))
  }

  useEffect(() => {
    if(ref1?.current && entry1?.length == 0) ref1?.current.focus()
    else if(ref2?.current && entry2?.length == 0) ref2?.current.focus()
    else if(ref3?.current && entry3?.length == 0) ref3?.current.focus()
    else if(ref4?.current && entry4?.length == 0) ref4?.current.focus()
    else if(ref5?.current && entry5?.length == 0) ref5?.current.focus()
    else if(ref6?.current && entry6?.length == 0) ref6?.current.focus()
  }, [ref1, ref2, ref3, ref4, ref5, ref6, entry1, entry2, entry3, entry4, entry5, entry6])
  
  useEffect(() => {
    type ElementType = React.MutableRefObject<HTMLInputElement>
    const refObjects: Record<string, React.MutableRefObject<HTMLInputElement>> = {
      'entry1': ref1 as ElementType, 'entry2': ref2 as ElementType,
      'entry3': ref3 as ElementType, 'entry4': ref4 as ElementType,
      'entry5': ref5 as ElementType, 'entry6': ref6 as ElementType
    };
    Object.values(refObjects).map(element => {
      element.current.addEventListener('keyup', (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          const keys = Object.keys(refObjects)
          refObjects[keys[keys.indexOf(element.current?.id as string) - 1 || 0]].current.focus()
        }
      })
    })
  }, [entry1, entry2, entry3, entry4, entry5, entry6, ref1, ref2, ref3, ref4, ref5, ref6])

  return (
    <article className={`w-full flex flex-col gap-8 shadow-lg ${theme === 'light' ? 'text-black' : 'text-white'} rounded-md p-4`}>
      <div className={`relative self-center flex items-center flex-wrap gap-2 mx-auto transition-all`}>
        <OTPInput 
          refs={ref1 as React.MutableRefObject<HTMLInputElement>} 
          name='entry1' otps={entry1 as string} handleChange={handleChange} 
        />
        <OTPInput 
          refs={ref2 as React.MutableRefObject<HTMLInputElement>} 
          name='entry2' otps={entry2 as string} handleChange={handleChange} 
        />
        <OTPInput 
          refs={ref3 as React.MutableRefObject<HTMLInputElement>} 
          name='entry3' otps={entry3 as string} handleChange={handleChange} 
        />
        <OTPInput 
          refs={ref4 as React.MutableRefObject<HTMLInputElement>} 
          name='entry4' otps={entry4 as string} handleChange={handleChange} 
        />
        <OTPInput 
          refs={ref5 as React.MutableRefObject<HTMLInputElement>} 
          name='entry5' otps={entry5 as string} handleChange={handleChange} 
        />
        <OTPInput 
          refs={ref6 as React.MutableRefObject<HTMLInputElement>} 
          name='entry6' otps={entry6 as string} handleChange={handleChange} 
        />
      </div>

      <ActionButton
        checker={canSubmit && !isLoading} onClick={handleSubmit}
        text='Submit' disabled={!canSubmit && !isLoading}
        loading={isLoading} isError={isError}
        extraClassNames='rounded-md'
      />
    </article>
  )
}

type OTPInputType = {
  refs: React.MutableRefObject<HTMLInputElement>,
  otps: string,
  name: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}
const OTPInput = ({ refs, name, otps, handleChange }: OTPInputType) => {
  return (
    <input 
      type="numeric" ref={refs} id={name} name={name} maxLength={1}
      autoComplete='off' value={otps} onChange={handleChange}
      className='font-sans bg-inherit border border-[#379c12] font-bold text-center text-2xl focus:outline-none rounded-md max-w-[42px] h-11 p-1'
    />
  )
}