

export default function AppStand() {
  return (
    <section className="hidden md:flex flex-col items-center gap-y-20 w-full h-full px-4 pt-20 shadow-md rounded-l-md">
      <h2 className='text-4xl font-bold text-center'>
        MY ALX GUARDIAN
      </h2>

      {/* <GuardianImages 
        imageUri='/study.png'
        classNames=''
      /> */}
      <p className="text-xl text-center">Make your ALX journey easier, connect with your colleagues</p>

      {/* <button 
      onClick={() => navigate('/signin')}
      className="rounded-lg p-4 px-8 cursor-pointer hover:opacity-95 active:opacity-100 bg-blue-600 transition-opacity text-white">
        Get Started
      </button> */}
    </section>
  )
}