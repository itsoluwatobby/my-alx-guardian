import { ChangeEvent, useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { validation_regex } from "../utility/validation";
import { PasswordInputs } from "../components/authentication/PasswordInputs";
import { FormInputs } from "../components/FormInputs";
import { Link, useNavigate } from "react-router-dom";
import ThirdPartyLogin from "../components/authentication/Thirdparty";
import guardianAsyncWrapper from "../app/guardianAsyncWrapper";
import { toast } from "react-toastify";

const initValidation = { validEmail: false, match: false }
export default function Signup() {
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [validation, setValidation] = useState<typeof initValidation>(initValidation)
  const [reveal, setReveal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<UserInfoType>({} as UserInfoType);
  const navigate = useNavigate();

  const { loading, isError } = appState;
  const { validEmail, match } = validation;
  const { name, email, password, confirmPassword } = newUser;

  const handleUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [event.target.name, event.target.value]
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (email) {
      setValidation(prev => ({ ...prev, validEmail: validation_regex.email.test(email) }))
    }
  }, [email])

  useEffect(() => {
    if (password && password === confirmPassword) {
      setValidation(prev => ({ ...prev, match: true }))
    }
    else setValidation(prev => ({ ...prev, match: false }))
  }, [password, confirmPassword])

  const canSubmit = [...Object.values(newUser)].every(Boolean);

  const handleSignup = async(event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    guardianAsyncWrapper(async () => {

      toast.success('Signup successful')
      navigate('/signin')
    }, setAppState);
  }

  return (
    <main className="w-full flex flex-col md:flex-row items-center h-full">
      <form onSubmit={handleSignup} className="flex-none md:w-[55%] w-full h-full flex flex-col gap-y-6 p-8 pt-14 items-center">

        <FormInputs
          name="name" value={name} handleUserInfo={handleUserInfo} type='text' autoComplete={'off'} placeholder='John Doe'
        />
        <FormInputs
          name="email" value={email} handleUserInfo={handleUserInfo} type='email' validEmail={validEmail} autoComplete='off'
          placeholder='jodndoe@gmail.com'
        />
        <PasswordInputs
          label='password' name="password" value={password}
          handleUserInfo={handleUserInfo} match={match}
          reveal={reveal} setReveal={setReveal}
        />
        <PasswordInputs
          label="Confirm password" name='confirmPassword'
          match={match} value={confirmPassword}
          handleUserInfo={handleUserInfo} reveal={reveal}
          setReveal={setReveal}
        />

        <ActionButton
          checker={canSubmit && !loading}
          text='Signup' disabled={!canSubmit || loading}
          loading={loading} isError={isError}
        />

        <div className="flex flex-col gap-1 mobile:gap-0.5 items-center py-1 mobile:text-sm">
          <div className="flex items-center">
            <span>Already have an Account?&nbsp;</span>
            <Link to='/signin' className='cursor-pointer text-[#14F400]'>Sign In</Link>
          </div>
          <span>or continue with</span>

          <ThirdPartyLogin
            // showModal={showModal}
            // setLoading={setAppState}
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