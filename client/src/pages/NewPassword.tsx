import { ChangeEvent, useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { PasswordInputs } from "../components/authentication/PasswordInputs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { toast } from "react-toastify";
import AppStand from "../components/AppStand";
import { authenticationAPI } from "../app/api-calls/auth.api";
import { sanitizeEntries } from "../utility/helpers";

export default function NewPassword() {
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [match, setMatch] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);
  const [search] = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<NewPasswordCredentials>({} as NewPasswordCredentials);
  const navigate = useNavigate();

  const { loading, isError } = appState;
  const { password, confirmPassword } = newPassword;

  const handleUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [event.target.name, event.target.value]
    setNewPassword(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    setEmail(atob(search.get('token') as string));
  }, [search])

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
      setAppState(prev => ({ ...prev, loading: true }));
      const credentails = sanitizeEntries({ email, newPassword: password });
      await authenticationAPI.password_reset(credentails);
      toast.success('Password Reset successful! Please login')
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
          text='Submit' disabled={!canSubmit || loading}
          loading={loading} isError={isError}
        />

        <div className="self-end flex gap-x-1 items-center">
          <span>Back to</span>
          <Link to='/signin' className='cursor-pointer text-[#14F400]'>Sign In</Link>
        </div>
        
      </form>

      <AppStand />
    
    </main>
  )
}