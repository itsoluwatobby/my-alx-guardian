// import GuardianImages from '../component/Images'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import localStore from "../../utility/localStorage";
// import { useEffect, useState } from 'react';

export default function Hero() {
  const navigate = useNavigate();
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    setLoggedInUserId(localStore.getStorage('my-id') ?? '');
  }, [])
  return (
    <div className="page flex flex-col items-center gap-y24 justify-between min-h-[75vh]">
      <h2 className='text-3d text-5xl font-bold text-center'>
        MY ALX GUARDIAN
      </h2>

      {/* <GuardianImages 
        imageUri='/study.png'
        classNames=''
      /> */}
      <p className="text-lg text-center">Make your ALX journey easier, connect with your colleagues</p>

      <button 
      onClick={() => navigate(loggedInUserId ? '/dashboard' : '/signin')}
      className="rounded-lg p-3 px-12 maxmobile:px-8 cursor-pointer hover:opacity-95 active:opacity-100 bg-blue-600 transition-opacity text-white text-base">
        {loggedInUserId ? 'Continue' : 'Get Started'}
      </button>
    </div>
  )
}