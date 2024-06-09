import React from 'react'
import { TextInput } from './TextInput'

type LocationProps = {
  location: {
    address: string;
    country: string;
  };
  setUser: React.Dispatch<React.SetStateAction<Partial<UpdateUserRequest>>>;
}

export default function Location({ location, setUser }: LocationProps) {
  return (
    <p className="flex items-center gap-x-3 lg:w-[80%]">
      <TextInput 
        value={location?.address as string} name="address" placeholder="Address"
        max={30} handleChange={(event) => setUser(prev => ({
          ...prev, location: {
            ...prev.location!,
            address: event.target.value,
          }
        }))}
        classNames=""
      />
      <TextInput
        value={location?.country as string} name="country" placeholder="Country"
        max={20} handleChange={(event) => setUser(prev => ({
          ...prev, location: {
            ...prev.location!,
            country: event.target.value,
          }
        }))}
        classNames=""
      />
    </p>
  )
}