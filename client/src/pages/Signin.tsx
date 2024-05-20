import { ChangeEvent, useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { PasswordInputs } from "../components/authentication/PasswordInputs";
import { FormInputs } from "../components/FormInputs";
import { Link } from "react-router-dom";
import useLocalStorage from '../utility/localStorage';
import ThirdPartyLogin from "../components/authentication/Thirdparty";

export default function Signin() {
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [reveal, setReveal] = useState<boolean>(false);
  const [persistLogin, setPersistLogin] = useState<boolean>(useLocalStorage.getStorage('guardianUser') as boolean ?? false);
  const [user, setUser] = useState<UserCredentialsType>({} as UserCredentialsType);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [showModal, setShowModal] = useState<ClientModalType>({
  //   selection: 'null', modal: false
  // });

  const { loading, isError } = appState;
  const { email, password } = user;

  const handleUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [event.target.name, event.target.value]
    setUser(prev => ({ ...prev, [name]: value }))
  };

  useEffect(() => {
    useLocalStorage.setStorage('guardianUser', persistLogin);
  }, [persistLogin])

  const canSubmit = [...Object.values(user)].every(Boolean);
  return (
    <main className="w-full flex flex-col md:flex-row items-center h-full">
      <form className="flex-none md:w-[55%] w-full h-full flex flex-col gap-y-6 p-8 pt-14 items-center">
  
        <FormInputs
          name="email" value={email} handleUserInfo={handleUserInfo}
          type='email' autoComplete='on'
          placeholder='jodndoe@gmail.com'
        />
        <PasswordInputs
          label='password' name="password" value={password}
          handleUserInfo={handleUserInfo}
          reveal={reveal} setReveal={setReveal}
        />

        <div className="flex items-center w-full justify-between text-[12px] mobile:text-[15px]">
          <div className="flex items-center gap-1.5">
            <input type="checkbox" checked={persistLogin}
              onChange={event => setPersistLogin(event.target.checked)}
              className='w-4 mobile:w-4.5 h-4 mobile:h-4.5 cursor-pointer'
            />
            <span>Remember me</span>
          </div>
          <Link to={'/forgotPassword'} className='text-gray-200 hover:underline underline-offset-2 hover:opacity-90 transition-all'>Forgot Password?</Link>
        </div>

        <ActionButton
          checker={canSubmit && !loading}
          text='Login' disabled={!canSubmit || loading}
          loading={loading} isError={isError}
        />

        <div className="flex flex-col gap-1 mobile:gap-0.5 items-center py-1 mobile:text-sm">
          <div className="flex items-center">
            <span>Don't have an Account?&nbsp;</span>
            <Link to='/signin' className='cursor-pointer text-[#14F400]'>Sign In</Link>
          </div>
          <span>or continue with</span>

          <ThirdPartyLogin
            // showModal={showModal}
            setLoading={setAppState}
          // setShowModal={setShowModal} 
          />
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