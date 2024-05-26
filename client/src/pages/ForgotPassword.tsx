import { ChangeEvent, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { FormInputs } from "../components/FormInputs";
import { Link } from "react-router-dom";
import guardianAsyncWrapper from "../app/guardianAsyncWrapper";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [email, setEmail] = useState<string>('');

  const { loading, isError } = appState;

  const handleUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async(event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    guardianAsyncWrapper(async () => {

      toast.info('Password reset link sent to your email')
      // navigate(pathname, { replace: true })
    }, setAppState);
  }

  const canSubmit = Boolean(email);
  return (
    <main className="w-full flex flex-col md:flex-row items-center h-full">
      <form onSubmit={handleSubmit} className="mt-16 flex-none md:w-[55%] w-full h-full flex flex-col gap-y-6 p-8 pt-14 items-center">
  
        <FormInputs
          name="email" value={email} handleUserInfo={handleUserInfo}
          type='email' autoComplete='on'
          placeholder='jodndoe@gmail.com'
        />

        <ActionButton
          checker={canSubmit && !loading}
          text='Submit' disabled={!canSubmit || loading}
          loading={loading} isError={isError}
        />

        <div className="flex flex-col gap-1 mobile:gap-0.5 items-center py-1 mobile:text-sm">
          <div className="flex items-center gap-x-1">
            <span>Return to</span>
            <Link to='/signin' className='cursor-pointer text-[#14F400]'>Sign In</Link>
          </div>
        </div>
      </form>

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
    </main>
  )
}