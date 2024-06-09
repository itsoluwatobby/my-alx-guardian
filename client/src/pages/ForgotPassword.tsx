import { ChangeEvent, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { FormInputs } from "../components/FormInputs";
import { Link, useNavigate } from "react-router-dom";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { toast } from "react-toastify";
import AppStand from "../components/AppStand";
import { authenticationAPI } from "../app/api-calls/auth.api";

export default function ForgotPassword() {
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const { loading, isError } = appState;

  const handleUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async(event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      await authenticationAPI.forgot_Password({ email });
      toast.info('Password reset OTP sent to your email');
      navigate(`/account_verification?token=${btoa(email)}`);
    }, setAppState);
  }

  const canSubmit = Boolean(email);
  return (
    <main className="page w-full flex flex-col md:flex-row items-center h-full">
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

        <div className="flex flex-col gap-1 mobile:gap-0.5 items-center py-1 mobile:text-sm w-full">
          <div className="flex items-center gap-x-1 self-end">
            <span>Return to</span>
            <Link to='/signin' className='cursor-pointer text-[#14F400]'>Sign In</Link>
          </div>
        </div>
      </form>
    
     <AppStand />

    </main>
  )
}