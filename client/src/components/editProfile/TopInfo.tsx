import React, { ChangeEvent, useState } from 'react'
import GuardianImages from '../component/GuardianImages'
import { TextInput } from './TextInput'

type TopInfoProps = {
  user: UpdateUserRequest;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setUser: React.Dispatch<React.SetStateAction<Partial<UpdateUserRequest>>>;
}

export default function TopInfo({ user, handleChange, setFile, setUser }: TopInfoProps) {
  const [reveal, setReveal] = useState<boolean>(false);

  const { profilePicture, firstName, title, bio } = user;

  return (
    <div className="flex gap-x-3 maxmobile:flex-col gap-y-4 text-sm w-full">
    <div 
    onMouseEnter={() => setReveal(true)}
    onMouseLeave={() => setReveal(false)}
    className="relative maxmobile:self-center">
      <GuardianImages
        imageUri={profilePicture ?? ''}
        alt={firstName} textSize="text-6xl"
        classNames="maxmobile:self-center flex-none size-40 rounded-full" imageClassNames="rounded-full"
      />
      <input type="file" id='change-profile-image'
        onChange={e => setFile((e.target.files as FileList)[0])}
        accept='image/*'
        hidden 
      />
      <label
      htmlFor="change-profile-image"
      className={`${reveal ? 'block' : 'hidden'} absolute top-16 cursor-pointer hover:scale-[1.05] active:scale-[1] transition-transform left-[17%] bg-[#333333] p-2 w-fit rounded-md text-white`}
      >
        Change Avatar
      </label>
    </div>

    <div className="flex flex-col gap-y-2 w-full">
      <TextInput
      value={title!} name="title" placeholder="Title"
      max={40} handleChange={handleChange}
      classNames=""
      />

      <div className="relative w-full lg:w-[80%]">
        <textarea 
          value={bio as string}
          placeholder="bio"
          maxLength={450}
          className="px-2 py-1 border border-[#b3b1b1] w-full pb-3 resize-none text-black rounded-[3px] focus:outline-none focus:ring-0 h-20"
          onChange={event => setUser(prev => ({ ...prev, bio: event.target.value }))}
        />
        <span className={`absolute z-10 text-xs right-0.5 rounded-br-[3px] bottom-1.5 px-3 bg-[#707070] text-black font-sans font-medium ${bio?.length ? '' : 'hidden'}`}>{bio?.length}</span>
      </div>

    </div>
  </div>
  )
}