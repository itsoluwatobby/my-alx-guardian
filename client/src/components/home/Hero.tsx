// import GuardianImages from '../component/Images'
import { useNavigate } from "react-router-dom"
// import { useEffect, useState } from 'react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="page flex flex-col items-center gap-y-24 h-screen">
      <h2 className='text-3d text-5xl font-bold text-center'>
        MY ALX GUARDIAN
      </h2>

      {/* <GuardianImages 
        imageUri='/study.png'
        classNames=''
      /> */}
      <p className="text-lg text-center">Make your ALX journey easier, connect with your colleagues</p>

      <button 
      onClick={() => navigate('/signin')}
      className="rounded-lg p-3 px-7 text-sm cursor-pointer hover:opacity-95 active:opacity-100 bg-blue-600 transition-opacity text-white">
        Get Started
      </button>
    </div>
  )
}