import { ChangeEvent, useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { PasswordInputs } from "../components/authentication/PasswordInputs";
import { Link, useNavigate } from "react-router-dom";
import guardianAsyncWrapper from "../app/guardianAsyncWrapper";
import { toast } from "react-toastify";

export default function NewPassword() {
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [match, setMatch] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<NewPasswordCredentials>({} as NewPasswordCredentials);
  const navigate = useNavigate();

  const { loading, isError } = appState;
  const { password, confirmPassword } = newPassword;

  const handleUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [event.target.name, event.target.value]
    setNewPassword(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (password && password === confirmPassword) {
      setMatch(true)
    }
    else setMatch(false)
  }, [password, confirmPassword])

  const canSubmit = [...Object.values(newPassword)].every(Boolean);

  const handleNewPassword = async(event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    guardianAsyncWrapper(async () => {

      toast.success('Password Reset successful')
      navigate('/signin')
    }, setAppState);
  }

  return (
    <main className="w-full flex flex-col md:flex-row items-center h-full">
      <form onSubmit={handleNewPassword} className="mt-10 flex-none md:w-[55%] w-full h-full flex flex-col gap-y-6 p-8 pt-14 items-center">
        
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
          text='Reset' disabled={!canSubmit || loading}
          loading={loading} isError={isError}
        />

        <div className="self-end flex gap-x-1 items-center">
          <span>Back to</span>
          <Link to='/signin' className='cursor-pointer text-[#14F400]'>Sign In</Link>
        </div>
        
      </form>

      <section className="hidden md:flex flex-col items-center gap-y-20 w-full h-full px-4 pt-20 shadow-md rounded-l-md">
        <h2 className='text-4xl font-bold text-center'>
          MY ALX GUARDIAN
        </h2>
        <p className="text-xl text-center">Make your ALX journey easier, connect with your colleagues</p>
      </section>
    </main>
  )
}